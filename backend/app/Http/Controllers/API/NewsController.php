<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class NewsController extends Controller
{
    // Liste toutes les actualités avec pagination
    public function index(Request $request)
    {
        $pageSize = (int) $request->input('pageSize', 10);
        $limit = (int) $request->input('limit', 0);
        $category = $request->input('category');
        $search = $request->input('search');
        $featured = $request->input('featured');
        $sort = $request->input('sort', 'published_at');
        $order = $request->input('order', 'desc');

        $allowedSortColumns = ['published_at', 'created_at', 'views'];
        if (!in_array($sort, $allowedSortColumns, true)) {
            $sort = 'published_at';
        }

        // Si un paramètre limit est fourni, on l'utilise comme taille de page
        if ($limit > 0) {
            $pageSize = $limit;
        }

        $query = News::query()
            ->where('status', 'published');

        // Filtrer par catégorie si la colonne existe
        $hasCategoryColumn = Schema::hasColumn('news', 'category');
        if ($category && $hasCategoryColumn) {
            $query->where('category', $category);
        }

        // Filtrer par recherche
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filtrer les articles mis en avant
        if (!is_null($featured)) {
            $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN));
        }

        $news = $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc')
                     ->paginate($pageSize);

        return response()->json($news);
    }

    // Obtenir une actualité par ID ou slug
    public function show($identifier)
    {
        $newsQuery = News::with([
            'comments' => function ($query) {
                $query->where('status', 'approved')
                      ->orderBy('created_at', 'desc');
            },
            'comments.replies' => function ($query) {
                $query->where('status', 'approved')
                      ->orderBy('created_at', 'asc');
            }
        ]);

        $news = ctype_digit((string) $identifier)
            ? $newsQuery->where('id', $identifier)->first()
            : $newsQuery->where('slug', $identifier)->first();

        if (!$news) {
            return response()->json([
                'message' => 'Actualité introuvable.'
            ], 404);
        }

        // Incrémenter le compteur de vues
        $news->increment('views');

        return response()->json([
            'id' => $news->id,
            'title' => $news->title,
            'slug' => $news->slug,
            'excerpt' => $news->excerpt,
            'content' => $news->content,
            'image' => $news->image,
            'category' => $news->category,
            'tags' => $news->tags,
            'author' => $news->author,
            'published_at' => optional($news->published_at)->format('Y-m-d H:i:s'),
            'status' => $news->status,
            'featured' => (bool) $news->featured,
            'views' => $news->views,
            'created_at' => optional($news->created_at)->format('Y-m-d H:i:s'),
            'comments' => $news->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'name' => $comment->author_name,
                    'email' => $comment->author_email,
                    'message' => $comment->content,
                    'status' => $comment->status,
                    'created_at' => optional($comment->created_at)->format('Y-m-d H:i:s'),
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'name' => $reply->author_name,
                            'email' => $reply->author_email,
                            'message' => $reply->content,
                            'status' => $reply->status,
                            'created_at' => optional($reply->created_at)->format('Y-m-d H:i:s'),
                        ];
                    }),
                ];
            }),
        ]);
    }

    // Obtenir les actualités par tag
    public function getByTag($tag)
    {
        $news = News::whereJsonContains('tags', $tag)
                   ->orderBy('published_at', 'desc')
                   ->paginate(9);

        return response()->json($news);
    }

    // Obtenir les catégories disponibles
    public function categories()
    {
        $categories = News::distinct()
                         ->pluck('category')
                         ->filter();

        return response()->json([
            'categories' => $categories
        ]);
    }

    // Obtenir les tags disponibles
    public function tags()
    {
        $allTags = News::whereNotNull('tags')
                      ->get()
                      ->pluck('tags')
                      ->flatten()
                      ->unique()
                      ->values();

        return response()->json([
            'tags' => $allTags
        ]);
    }
}