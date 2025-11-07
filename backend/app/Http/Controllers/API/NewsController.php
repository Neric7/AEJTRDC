<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    /**
     * Liste paginée des actualités
     */
    public function index(Request $request)
    {
        $pageSize = min((int) $request->input('pageSize', 9), 50);
        $search = $request->input('search', '');
        
        $query = News::where('status', 'published')
            ->orderBy('published_at', 'desc');
        
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }
        
        $news = $query->paginate($pageSize);
        
        return response()->json([
            'data' => $news->items(),
            'pagination' => [
                'page' => $news->currentPage(),
                'pageSize' => $news->perPage(),
                'total' => $news->total(),
                'lastPage' => $news->lastPage(),
            ]
        ]);
    }
    
    /**
     * Détail d'une actualité par ID ou slug
     */
    public function show($idOrSlug)
    {
        $news = is_numeric($idOrSlug)
            ? News::where('id', $idOrSlug)->where('status', 'published')->firstOrFail()
            : News::where('slug', $idOrSlug)->where('status', 'published')->firstOrFail();
        
        // Incrémenter les vues
        $news->increment('views');
        
        return response()->json($news);
    }
    
    /**
     * Dernières actualités
     */
    public function latest(Request $request)
    {
        $limit = min((int) $request->input('limit', 3), 10);
        
        $news = News::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
        
        return response()->json($news);
    }
    
    /**
     * Actualités par catégorie/tag
     */
    public function byTag($tag, Request $request)
    {
        $pageSize = min((int) $request->input('pageSize', 9), 50);
        
        $news = News::where('status', 'published')
            ->whereJsonContains('tags', $tag)
            ->orderBy('published_at', 'desc')
            ->paginate($pageSize);
        
        return response()->json([
            'data' => $news->items(),
            'pagination' => [
                'page' => $news->currentPage(),
                'pageSize' => $news->perPage(),
                'total' => $news->total(),
            ]
        ]);
    }
    
    /**
     * Articles connexes
     */
    public function related($id)
    {
        $news = News::findOrFail($id);
        
        $related = News::where('status', 'published')
            ->where('id', '!=', $id)
            ->where(function($query) use ($news) {
                foreach ($news->tags ?? [] as $tag) {
                    $query->orWhereJsonContains('tags', $tag);
                }
            })
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();
        
        return response()->json($related);
    }
    
    /**
     * ADMIN - Créer une actualité
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author' => 'required|string|max:100',
            'tags' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);
        
        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        
        $news = News::create($validated);
        
        return response()->json($news, 201);
    }
    
    /**
     * ADMIN - Mettre à jour une actualité
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'excerpt' => 'sometimes|string|max:500',
            'content' => 'sometimes|string',
            'image' => 'nullable|string',
            'author' => 'sometimes|string|max:100',
            'tags' => 'nullable|array',
            'status' => 'sometimes|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);
        
        if (isset($validated['title']) && $validated['title'] !== $news->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        }
        
        $news->update($validated);
        
        return response()->json($news);
    }
    
    /**
     * ADMIN - Supprimer une actualité
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        
        return response()->json(['message' => 'Actualité supprimée avec succès']);
    }
}