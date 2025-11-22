<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminNewsController extends Controller
{
    /**
     * Liste toutes les actualités (admin)
     */
    public function index(Request $request)
    {
        $pageSize = (int) $request->input('pageSize', 10);
        $status = $request->input('status');
        $search = $request->input('search');

        $query = News::query()->orderBy('created_at', 'desc');

        // Filtrer par statut
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        // Recherche
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $news = $query->paginate($pageSize);

        return response()->json($news);
    }

    /**
     * Obtenir une actualité par ID
     */
    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    /**
     * Créer une nouvelle actualité
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'author' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'featured' => 'nullable|boolean',
        ]);

        // Générer un slug unique
        $validated['slug'] = $this->generateUniqueSlug($validated['title']);
        
        // Définir l'auteur par défaut
        $validated['author'] = $validated['author'] ?? auth()->user()->name;

        // Définir la date de publication si le statut est "published"
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $news = News::create($validated);

        return response()->json([
            'message' => 'Actualité créée avec succès',
            'data' => $news,
        ], 201);
    }

    /**
     * Mettre à jour une actualité
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'author' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'status' => 'sometimes|required|in:draft,published,archived',
            'featured' => 'nullable|boolean',
        ]);

        // Mettre à jour le slug si le titre change
        if (isset($validated['title']) && $validated['title'] !== $news->title) {
            $validated['slug'] = $this->generateUniqueSlug($validated['title'], $news->id);
        }

        // Définir la date de publication si le statut devient "published"
        if (isset($validated['status']) && $validated['status'] === 'published' && !$news->published_at) {
            $validated['published_at'] = now();
        }

        $news->update($validated);

        return response()->json([
            'message' => 'Actualité mise à jour avec succès',
            'data' => $news,
        ]);
    }

    /**
     * Supprimer une actualité
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        
        // Supprimer l'image si elle existe
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json([
            'message' => 'Actualité supprimée avec succès',
        ]);
    }

    /**
     * Publier une actualité
     */
    public function publish($id)
    {
        $news = News::findOrFail($id);
        
        $news->update([
            'status' => 'published',
            'published_at' => $news->published_at ?? now(),
        ]);

        return response()->json([
            'message' => 'Actualité publiée avec succès',
            'data' => $news,
        ]);
    }

    /**
     * Dépublier une actualité
     */
    public function unpublish($id)
    {
        $news = News::findOrFail($id);
        
        $news->update([
            'status' => 'draft',
        ]);

        return response()->json([
            'message' => 'Actualité dépubliée avec succès',
            'data' => $news,
        ]);
    }

    /**
     * Upload d'image
     */
    public function uploadImage(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Supprimer l'ancienne image
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        // Enregistrer la nouvelle image
        $path = $request->file('image')->store('news', 'public');

        $news->update(['image' => $path]);

        return response()->json([
            'message' => 'Image uploadée avec succès',
            'image' => $path,
            'url' => Storage::url($path),
        ]);
    }

    /**
     * Générer un slug unique
     */
    private function generateUniqueSlug($title, $ignoreId = null)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (true) {
            $query = News::where('slug', $slug);
            
            if ($ignoreId) {
                $query->where('id', '!=', $ignoreId);
            }
            
            if (!$query->exists()) {
                break;
            }
            
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
}