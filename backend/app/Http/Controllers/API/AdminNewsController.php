<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AdminNewsController extends Controller
{
    /**
     * Liste toutes les actualités (admin)
     */
    public function index(Request $request)
    {
        try {
            $query = News::query();

            // Filtres
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            }

            $news = $query->orderBy('created_at', 'desc')
                         ->paginate(15);

            return response()->json($news);
        } catch (\Exception $e) {
            Log::error('AdminNewsController@index error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des actualités',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une actualité
     */
    public function show($id)
    {
        try {
            $news = News::findOrFail($id);
            return response()->json($news);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Actualité introuvable',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Créer une nouvelle actualité
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'nullable|string|max:500',
                'category' => 'nullable|string|max:100',
                'author' => 'nullable|string|max:100',
                'tags' => 'nullable|array',
                'status' => 'required|in:draft,published,archived',
                'featured' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            
            // Générer le slug
            $data['slug'] = Str::slug($data['title']);
            
            // Si publié, ajouter la date de publication
            if ($data['status'] === 'published' && !isset($data['published_at'])) {
                $data['published_at'] = now();
            }

            $news = News::create($data);

            return response()->json([
                'message' => 'Actualité créée avec succès',
                'data' => $news
            ], 201);
        } catch (\Exception $e) {
            Log::error('AdminNewsController@store error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une actualité
     */
    public function update(Request $request, $id)
    {
        try {
            $news = News::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'excerpt' => 'nullable|string|max:500',
                'category' => 'nullable|string|max:100',
                'author' => 'nullable|string|max:100',
                'tags' => 'nullable|array',
                'status' => 'sometimes|required|in:draft,published,archived',
                'featured' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            
            // Mettre à jour le slug si le titre change
            if (isset($data['title']) && $data['title'] !== $news->title) {
                $data['slug'] = Str::slug($data['title']);
            }

            // Si on passe à publié, ajouter la date
            if (isset($data['status']) && $data['status'] === 'published' && !$news->published_at) {
                $data['published_at'] = now();
            }

            $news->update($data);

            return response()->json([
                'message' => 'Actualité mise à jour avec succès',
                'data' => $news->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('AdminNewsController@update error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload une image pour une actualité
     * 🔥 FONCTION CRITIQUE POUR RÉSOUDRE LE PROBLÈME
     */
    public function uploadImage(Request $request, $id)
    {
        try {
            $news = News::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Supprimer l'ancienne image si elle existe
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }

            // Stocker la nouvelle image
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            
            // Stocker dans storage/app/public/news/
            $path = $file->storeAs('news', $filename, 'public');

            // Mettre à jour le modèle
            $news->update(['image' => $path]);

            Log::info("Image uploaded successfully", [
                'news_id' => $id,
                'path' => $path,
                'full_url' => $news->image_url
            ]);

            return response()->json([
                'message' => 'Image uploadée avec succès',
                'data' => [
                    'image' => $path,
                    'image_url' => $news->image_url,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('AdminNewsController@uploadImage error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return response()->json([
                'message' => 'Erreur lors de l\'upload de l\'image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une actualité
     */
    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);
            
            // Supprimer l'image associée
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            
            $news->delete();

            return response()->json([
                'message' => 'Actualité supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('AdminNewsController@destroy error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Publier une actualité
     */
    public function publish($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->update([
                'status' => 'published',
                'published_at' => now()
            ]);

            return response()->json([
                'message' => 'Actualité publiée avec succès',
                'data' => $news
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la publication',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dépublier une actualité
     */
    public function unpublish($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->update([
                'status' => 'draft',
                'published_at' => null
            ]);

            return response()->json([
                'message' => 'Actualité dépubliée avec succès',
                'data' => $news
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la dépublication',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
 * Upload plusieurs images pour la galerie
 */
public function uploadGallery(Request $request, $id)
{
    try {
        $news = News::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'images' => 'required|array|min:1|max:10',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $galleryPaths = [];

        foreach ($request->file('images') as $file) {
            $filename = time() . '_' . uniqid() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('news/gallery', $filename, 'public');
            $galleryPaths[] = $path;
        }

        // Récupérer les images existantes et fusionner
        $existingImages = $news->images ?? [];
        $allImages = array_merge($existingImages, $galleryPaths);

        $news->update(['images' => $allImages]);

        Log::info("Gallery uploaded successfully", [
            'news_id' => $id,
            'new_images' => count($galleryPaths),
            'total_images' => count($allImages)
        ]);

        return response()->json([
            'message' => count($galleryPaths) . ' image(s) ajoutée(s) à la galerie',
            'data' => [
                'images' => $allImages,
                'images_urls' => $news->images_urls,
            ]
        ]);
    } catch (\Exception $e) {
        Log::error('AdminNewsController@uploadGallery error: ' . $e->getMessage());
        return response()->json([
            'message' => 'Erreur lors de l\'upload de la galerie',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Supprimer une image de la galerie
 */
public function deleteGalleryImage(Request $request, $id)
{
    try {
        $news = News::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'image_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $imagePath = $request->input('image_path');
        $images = $news->images ?? [];
        
        // Retirer l'image du tableau
        $images = array_filter($images, function($path) use ($imagePath) {
            return $path !== $imagePath;
        });
        
        // Supprimer le fichier physique
        Storage::disk('public')->delete($imagePath);
        
        // Réindexer le tableau
        $images = array_values($images);
        
        $news->update(['images' => $images]);

        return response()->json([
            'message' => 'Image supprimée de la galerie',
            'data' => [
                'images' => $images,
                'images_urls' => $news->images_urls,
            ]
        ]);
    } catch (\Exception $e) {
        Log::error('AdminNewsController@deleteGalleryImage error: ' . $e->getMessage());
        return response()->json([
            'message' => 'Erreur lors de la suppression',
            'error' => $e->getMessage()
        ], 500);
    }
}
}