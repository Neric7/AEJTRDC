<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminProjectController extends Controller
{
    /**
     * Liste tous les projets (Admin) - avec pagination et filtres
     */
    public function index(Request $request)
    {
        try {
            $pageSize = (int) $request->input('pageSize', 10);
            $status = $request->input('status');
            $domain = $request->input('domain');
            $search = $request->input('search');
            $featured = $request->input('featured');
            $sort = $request->input('sort', 'created_at');
            $order = $request->input('order', 'desc');

            $allowedSortColumns = ['created_at', 'start_date', 'title', 'views', 'beneficiaries_count', 'budget'];
            if (!in_array($sort, $allowedSortColumns, true)) {
                $sort = 'created_at';
            }

            $query = Project::query()->with('domain');

            // Filtres
            if ($status) {
                $query->where('status', $status);
            }

            if ($domain) {
                $query->where('domain_id', $domain);
            }

            if ($search) {
                $query->search($search);
            }

            if (!is_null($featured)) {
                $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN));
            }

            $projects = $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc')
                              ->paginate($pageSize);

            return response()->json($projects);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des projets',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir un projet par ID (Admin)
     */
    public function show($id)
    {
        try {
            $project = Project::with('domain')->findOrFail($id);

            return response()->json($project);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@show: ' . $e->getMessage());
            return response()->json([
                'message' => 'Projet introuvable',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 404);
        }
    }

    /**
     * Créer un nouveau projet (Admin)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'nullable|string',
                'objective' => 'required|string',
                'execution_zone' => 'required|string|max:255',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'status' => 'required|in:planning,ongoing,completed,suspended',
                'results' => 'nullable|array',
                'indicators' => 'nullable|array',
                'testimonials' => 'nullable|array',
                'domain_id' => 'nullable|exists:domains,id',
                'partners' => 'nullable|array',
                'budget' => 'nullable|numeric|min:0',
                'beneficiaries_count' => 'nullable|integer|min:0',
                'featured' => 'nullable|boolean',
            ]);

            // Générer un slug unique
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $counter = 1;

            while (Project::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;

            // Convertir featured en boolean
            if (isset($validated['featured'])) {
                $validated['featured'] = filter_var($validated['featured'], FILTER_VALIDATE_BOOLEAN);
            }

            $project = Project::create($validated);

            Log::info('Projet créé avec succès par admin', [
                'project_id' => $project->id,
                'admin_id' => $request->user()->id
            ]);

            return response()->json([
                'message' => 'Projet créé avec succès',
                'data' => $project->load('domain')
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@store: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la création du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Mettre à jour un projet (Admin)
     */
    public function update(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'excerpt' => 'nullable|string',
                'objective' => 'sometimes|required|string',
                'execution_zone' => 'sometimes|required|string|max:255',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'status' => 'sometimes|required|in:planning,ongoing,completed,suspended',
                'results' => 'nullable|array',
                'indicators' => 'nullable|array',
                'testimonials' => 'nullable|array',
                'domain_id' => 'nullable|exists:domains,id',
                'partners' => 'nullable|array',
                'budget' => 'nullable|numeric|min:0',
                'beneficiaries_count' => 'nullable|integer|min:0',
                'featured' => 'nullable|boolean',
            ]);

            // Si le titre change, régénérer le slug
            if (isset($validated['title']) && $validated['title'] !== $project->title) {
                $slug = Str::slug($validated['title']);
                $originalSlug = $slug;
                $counter = 1;

                while (Project::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $originalSlug . '-' . $counter;
                    $counter++;
                }

                $validated['slug'] = $slug;
            }

            // Convertir featured en boolean
            if (isset($validated['featured'])) {
                $validated['featured'] = filter_var($validated['featured'], FILTER_VALIDATE_BOOLEAN);
            }

            $project->update($validated);

            Log::info('Projet mis à jour avec succès par admin', [
                'project_id' => $project->id,
                'admin_id' => $request->user()->id
            ]);

            return response()->json([
                'message' => 'Projet mis à jour avec succès',
                'data' => $project->load('domain')
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@update: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Supprimer un projet (Admin)
     */
    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);
            
            // Supprimer l'image principale si elle existe
            if ($project->image) {
                $imagePath = storage_path('app/public/' . $project->image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                    Log::info('Image principale supprimée', ['path' => $imagePath]);
                }
            }

            // Supprimer les images de la galerie si elles existent
            if ($project->images && is_array($project->images)) {
                foreach ($project->images as $image) {
                    $imagePath = storage_path('app/public/' . $image);
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                        Log::info('Image de galerie supprimée', ['path' => $imagePath]);
                    }
                }
            }

            $project->delete();

            Log::info('Projet supprimé avec succès par admin', [
                'project_id' => $id,
                'admin_id' => request()->user()->id
            ]);

            return response()->json([
                'message' => 'Projet supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@destroy: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Publier un projet (change le statut vers 'ongoing')
     */
    public function publish($id)
    {
        try {
            $project = Project::findOrFail($id);
            
            // Si le projet est suspendu, le remettre en cours
            if ($project->status === 'suspended' || $project->status === 'planning') {
                $project->status = 'ongoing';
                $project->save();

                Log::info('Projet publié par admin', [
                    'project_id' => $project->id,
                    'admin_id' => request()->user()->id
                ]);

                return response()->json([
                    'message' => 'Projet publié avec succès',
                    'data' => $project->load('domain')
                ]);
            }

            return response()->json([
                'message' => 'Le projet est déjà publié',
                'data' => $project->load('domain')
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@publish: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la publication du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Dépublier un projet (change le statut vers 'suspended')
     */
    public function unpublish($id)
    {
        try {
            $project = Project::findOrFail($id);
            
            $project->status = 'suspended';
            $project->save();

            Log::info('Projet dépublié par admin', [
                'project_id' => $project->id,
                'admin_id' => request()->user()->id
            ]);

            return response()->json([
                'message' => 'Projet dépublié avec succès',
                'data' => $project->load('domain')
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@unpublish: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la dépublication du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Upload de l'image principale (Admin) - VERSION CORRIGÉE
     */
    public function uploadImage(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);

            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
            ]);

            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image si elle existe
                if ($project->image) {
                    $oldImagePath = storage_path('app/public/' . $project->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                        Log::info('Ancienne image supprimée', ['path' => $oldImagePath]);
                    }
                }

                $image = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                
                // Créer le dossier projects s'il n'existe pas
                $destinationPath = storage_path('app/public/projects');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }
                
                // Déplacer le fichier directement
                $image->move($destinationPath, $filename);
                
                // Sauvegarder UNIQUEMENT 'projects/filename.jpg' en base
                $project->image = 'projects/' . $filename;
                $project->save();

                Log::info('Image uploadée avec succès', [
                    'project_id' => $project->id,
                    'stored_path' => $project->image,
                    'physical_path' => $destinationPath . '/' . $filename,
                    'url' => $project->image_url,
                    'admin_id' => $request->user()->id
                ]);

                return response()->json([
                    'message' => 'Image uploadée avec succès',
                    'image_url' => $project->image_url,
                    'image_path' => $project->image,
                    'data' => $project->load('domain')
                ]);
            }

            return response()->json(['message' => 'Aucune image fournie'], 400);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@uploadImage: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Erreur lors de l\'upload de l\'image',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Upload de plusieurs images (galerie) - VERSION CORRIGÉE
     */
    public function uploadImages(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);

            $request->validate([
                'images' => 'required|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048'
            ]);

            $uploadedImages = [];

            if ($request->hasFile('images')) {
                // Créer le dossier projects s'il n'existe pas
                $destinationPath = storage_path('app/public/projects');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }
                
                foreach ($request->file('images') as $image) {
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    
                    // Déplacer le fichier directement
                    $image->move($destinationPath, $filename);
                    
                    // Ajouter UNIQUEMENT 'projects/filename.jpg'
                    $uploadedImages[] = 'projects/' . $filename;
                }

                // Ajouter les nouvelles images aux images existantes
                $existingImages = $project->images ?? [];
                $project->images = array_merge($existingImages, $uploadedImages);
                $project->save();

                Log::info('Images de galerie uploadées par admin', [
                    'project_id' => $project->id,
                    'count' => count($uploadedImages),
                    'admin_id' => $request->user()->id
                ]);

                return response()->json([
                    'message' => count($uploadedImages) . ' images uploadées avec succès',
                    'images' => $project->images_urls,
                    'data' => $project->load('domain')
                ]);
            }

            return response()->json([
                'message' => 'Aucune image fournie'
            ], 400);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@uploadImages: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de l\'upload des images',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Toggle le statut featured d'un projet
     */
    public function toggleFeatured($id)
    {
        try {
            $project = Project::findOrFail($id);
            
            $project->featured = !$project->featured;
            $project->save();

            $message = $project->featured 
                ? 'Projet mis en avant' 
                : 'Projet retiré de la mise en avant';

            Log::info('Statut featured du projet modifié par admin', [
                'project_id' => $project->id,
                'featured' => $project->featured,
                'admin_id' => request()->user()->id
            ]);

            return response()->json([
                'message' => $message,
                'data' => $project->load('domain')
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@toggleFeatured: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la modification du statut',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les statistiques des projets
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => Project::count(),
                'planning' => Project::where('status', 'planning')->count(),
                'ongoing' => Project::where('status', 'ongoing')->count(),
                'completed' => Project::where('status', 'completed')->count(),
                'suspended' => Project::where('status', 'suspended')->count(),
                'featured' => Project::where('featured', true)->count(),
                'total_beneficiaries' => Project::sum('beneficiaries_count'),
                'total_budget' => Project::sum('budget'),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            Log::error('Error in AdminProjectController@statistics: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des statistiques',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
 * Supprimer une image de la galerie
 */
public function deleteGalleryImage(Request $request, $id)
{
    try {
        $project = Project::findOrFail($id);
        
        $request->validate([
            'image_path' => 'required|string'
        ]);

        $imagePath = $request->input('image_path');
        $images = $project->images ?? [];

        // Trouver et supprimer l'image du tableau
        $images = array_values(array_filter($images, function($img) use ($imagePath) {
            return $img !== $imagePath;
        }));

        // Supprimer le fichier physique
        $fullPath = str_replace('storage/', 'public/', $imagePath);
        if (Storage::exists($fullPath)) {
            Storage::delete($fullPath);
        }

        // Mettre à jour le projet
        $project->images = $images;
        $project->save();

        return response()->json([
            'message' => 'Image supprimée avec succès',
            'data' => $project
        ]);
    } catch (\Exception $e) {
        Log::error('Error in ProjectController@deleteGalleryImage: ' . $e->getMessage());
        return response()->json([
            'message' => 'Erreur lors de la suppression de l\'image',
            'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
        ], 500);
    }
}
}