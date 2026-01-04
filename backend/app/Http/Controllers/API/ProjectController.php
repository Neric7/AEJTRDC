<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Liste tous les projets avec pagination et filtres (FRONTEND)
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'Authentification requise pour accéder à cette ressource.',
                    'requires_auth' => true
                ], 401);
            }

            $pageSize = (int) $request->input('pageSize', 10);
            $limit = (int) $request->input('limit', 0);
            $status = $request->input('status');
            $domain = $request->input('domain');
            $search = $request->input('search');
            $featured = $request->input('featured');
            $sort = $request->input('sort', 'created_at');
            $order = $request->input('order', 'desc');

            $allowedSortColumns = ['created_at', 'start_date', 'title', 'views', 'beneficiaries_count'];
            if (!in_array($sort, $allowedSortColumns, true)) {
                $sort = 'created_at';
            }

            if ($limit > 0) {
                $pageSize = $limit;
            }

            $query = Project::query()->with('domain');

            // Filtrer par statut
            if ($status) {
                $query->where('status', $status);
            }

            // Filtrer par domaine
            if ($domain) {
                $query->where('domain_id', $domain);
            }

            // Filtrer par recherche
            if ($search) {
                $query->search($search);
            }

            // Filtrer les projets mis en avant
            if (!is_null($featured)) {
                $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN));
            }

            $projects = $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc')
                              ->paginate($pageSize);

            $response = $projects->toArray();
            $response['user'] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@index: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Erreur lors du chargement des projets',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir un projet par ID ou slug (FRONTEND)
     */
    public function show(Request $request, $identifier)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Authentification requise pour voir ce projet.',
                    'requires_auth' => true
                ], 401);
            }

            $project = ctype_digit((string) $identifier)
                ? Project::with('domain')->where('id', $identifier)->first()
                : Project::with('domain')->where('slug', $identifier)->first();

            if (!$project) {
                return response()->json([
                    'message' => 'Projet introuvable.'
                ], 404);
            }

            // Incrémenter le compteur de vues
            $project->increment('views');

            $response = [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'excerpt' => $project->excerpt,
                'objective' => $project->objective,
                'execution_zone' => $project->execution_zone,
                'start_date' => optional($project->start_date)->format('Y-m-d'),
                'end_date' => optional($project->end_date)->format('Y-m-d'),
                'status' => $project->status,
                'status_label' => $project->status_label,
                'duration' => $project->duration,
                'results' => $project->results ?? [],
                'indicators' => $project->indicators ?? [],
                'testimonials' => $project->testimonials ?? [],
                'image' => $project->image_url,
                'images' => $project->images_urls,
                'domain' => $project->domain ? [
                    'id' => $project->domain->id,
                    'titre' => $project->domain->titre,
                    'name' => $project->domain->titre,
                    'slug' => $project->domain->slug,
                    'icon' => $project->domain->icon ?? null,
                    'description_courte' => $project->domain->description_courte ?? null,
                ] : null,
                'partners' => $project->partners ?? [],
                'budget' => $project->budget,
                'beneficiaries_count' => $project->beneficiaries_count,
                'featured' => (bool) $project->featured,
                'views' => $project->views,
                'created_at' => optional($project->created_at)->format('Y-m-d H:i:s'),
                'viewer' => [
                    'id' => $user->id,
                    'name' => $user->name,
                ],
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@show: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Erreur lors du chargement du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les projets par domaine (FRONTEND)
     */
    public function getByDomain(Request $request, $domainId)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Authentification requise.',
                    'requires_auth' => true
                ], 401);
            }

            $projects = Project::with('domain')
                               ->where('domain_id', $domainId)
                               ->orderBy('created_at', 'desc')
                               ->paginate(9);

            return response()->json($projects);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@getByDomain: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des projets',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les statuts disponibles
     */
    public function statuses()
    {
        try {
            $statuses = [
                ['value' => 'planning', 'label' => 'En planification'],
                ['value' => 'ongoing', 'label' => 'En cours'],
                ['value' => 'completed', 'label' => 'Terminé'],
                ['value' => 'suspended', 'label' => 'Suspendu'],
            ];

            return response()->json(['statuses' => $statuses]);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@statuses: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des statuts',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les projets en vedette
     */
    public function featured(Request $request)
    {
        try {
            $limit = (int) $request->input('limit', 3);

            $projects = Project::with('domain')
                               ->featured()
                               ->orderBy('created_at', 'desc')
                               ->limit($limit)
                               ->get();

            return response()->json($projects);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@featured: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des projets en vedette',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // ============================================================
    // MÉTHODES ADMIN
    // ============================================================

    /**
     * Liste tous les projets (Admin) - avec pagination
     */
    public function adminIndex(Request $request)
    {
        try {
            $pageSize = (int) $request->input('pageSize', 10);
            $status = $request->input('status');
            $domain = $request->input('domain');
            $search = $request->input('search');
            $sort = $request->input('sort', 'created_at');
            $order = $request->input('order', 'desc');

            $allowedSortColumns = ['created_at', 'start_date', 'title', 'views', 'beneficiaries_count'];
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

            $projects = $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc')
                              ->paginate($pageSize);

            return response()->json($projects);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@adminIndex: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des projets',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir un projet par ID (Admin)
     */
    public function adminShow($id)
    {
        try {
            $project = Project::with('domain')->findOrFail($id);

            return response()->json($project);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@adminShow: ' . $e->getMessage());
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
            $slug = \Illuminate\Support\Str::slug($validated['title']);
            $originalSlug = $slug;
            $counter = 1;

            while (Project::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;

            $project = Project::create($validated);

            Log::info('Projet créé avec succès', ['project_id' => $project->id]);

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
            Log::error('Error in ProjectController@store: ' . $e->getMessage());
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
                $slug = \Illuminate\Support\Str::slug($validated['title']);
                $originalSlug = $slug;
                $counter = 1;

                while (Project::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $originalSlug . '-' . $counter;
                    $counter++;
                }

                $validated['slug'] = $slug;
            }

            $project->update($validated);

            Log::info('Projet mis à jour avec succès', ['project_id' => $project->id]);

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
            Log::error('Error in ProjectController@update: ' . $e->getMessage());
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
            
            // Supprimer les images associées si nécessaire
            if ($project->image) {
                $imagePath = str_replace('storage/', 'public/', parse_url($project->image, PHP_URL_PATH));
                if (Storage::exists($imagePath)) {
                    Storage::delete($imagePath);
                }
            }

            $project->delete();

            Log::info('Projet supprimé avec succès', ['project_id' => $id]);

            return response()->json([
                'message' => 'Projet supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@destroy: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression du projet',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Publier/Dépublier un projet (Admin)
     */
    public function publish($id)
    {
        try {
            $project = Project::findOrFail($id);
            
            // Toggle le statut entre 'ongoing' et 'suspended'
            if ($project->status === 'suspended') {
                $project->status = 'ongoing';
                $message = 'Projet publié avec succès';
            } else {
                $project->status = 'suspended';
                $message = 'Projet dépublié avec succès';
            }
            
            $project->save();

            return response()->json([
                'message' => $message,
                'data' => $project
            ]);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@publish: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la modification du statut',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Upload de l'image principale (Admin)
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
                    $oldImagePath = str_replace('storage/', 'public/', parse_url($project->image, PHP_URL_PATH));
                    if (Storage::exists($oldImagePath)) {
                        Storage::delete($oldImagePath);
                    }
                }

                // Stocker la nouvelle image
                $image = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('public/projects', $filename);

                // Mettre à jour le projet
                $project->image = 'projects/' . $filename;
                $project->save();

                Log::info('Image uploadée avec succès', ['project_id' => $project->id, 'filename' => $filename]);

                return response()->json([
                    'message' => 'Image uploadée avec succès',
                    'image_url' => $project->image_url,
                    'data' => $project
                ]);
            }

            return response()->json([
                'message' => 'Aucune image fournie'
            ], 400);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@uploadImage: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de l\'upload de l\'image',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Upload de plusieurs images (galerie) - Optionnel
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
                foreach ($request->file('images') as $image) {
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('public/projects', $filename);
                    $uploadedImages[] = 'projects/' . $filename;
                }

                // Ajouter les nouvelles images aux images existantes
                $existingImages = $project->images ?? [];
                $project->images = array_merge($existingImages, $uploadedImages);
                $project->save();

                return response()->json([
                    'message' => count($uploadedImages) . ' images uploadées avec succès',
                    'images' => $project->images_urls,
                    'data' => $project
                ]);
            }

            return response()->json([
                'message' => 'Aucune image fournie'
            ], 400);
        } catch (\Exception $e) {
            Log::error('Error in ProjectController@uploadImages: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de l\'upload des images',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}