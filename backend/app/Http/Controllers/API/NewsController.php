<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log; // Ajout pour utiliser Log::error au lieu de \Log::error

class NewsController extends Controller
{
    /**
     * NOTE IMPORTANTE DE CORRECTION:
     * Le constructeur a été supprimé pour éviter les erreurs "Call to undefined method middleware()"
     * et "Cannot call constructor".
     * L'application des middlewares (comme auth:sanctum) doit désormais se faire
     * dans le fichier de routage 'backend/routes/api.php'.
     *
     * Les méthodes 'index', 'show', 'getByTag' ont été modifiées pour vérifier si
     * la requête a un utilisateur, en supposant qu'elles sont dans un groupe de routes
     * protégé par le middleware 'auth:sanctum'.
     */

    // Liste toutes les actualités avec pagination
    public function index(Request $request)
    {
        try {
            // L'authentification est gérée par le middleware dans routes/api.php
            // Cependant, nous vérifions toujours l'utilisateur pour l'inclure dans la réponse si nécessaire
            $user = $request->user();

            if (!$user) {
                // Cette réponse est un filet de sécurité, mais le middleware devrait intercepter avant.
                return response()->json([
                    'message' => 'Authentification requise pour accéder à cette ressource.',
                    'requires_auth' => true
                ], 401);
            }

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

            $query = News::query()->where('status', 'published');

            // Filtrer par catégorie si la colonne existe
            if ($category && Schema::hasColumn('news', 'category')) {
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

            // Ajouter des métadonnées utilisateur dans la réponse
            $response = $news->toArray();
            $response['user'] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in NewsController@index: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Erreur lors du chargement des actualités',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // Obtenir une actualité par ID ou slug
    public function show(Request $request, $identifier)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Authentification requise pour lire cette actualité.',
                    'requires_auth' => true
                ], 401);
            }

            // Le reste du code de 'show' est inchangé...
            $hasComments = Schema::hasTable('comments');

            $newsQuery = News::query();

            // Charger les commentaires seulement si la table existe
            if ($hasComments) {
                $newsQuery->with([
                    'comments' => function ($query) {
                        $query->where('status', 'approved')
                              ->whereNull('parent_id')
                              ->orderBy('created_at', 'desc');
                    },
                    'comments.replies' => function ($query) {
                        $query->where('status', 'approved')
                              ->orderBy('created_at', 'asc');
                    }
                ]);
            }

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

            $response = [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'excerpt' => $news->excerpt,
                'content' => $news->content,
                'image' => $news->image_url, // Utiliser l'accessor
                'category' => $news->category ?? 'general',
                'tags' => $news->tags ?? [],
                'author' => $news->author ?? 'Anonyme',
                'published_at' => optional($news->published_at)->format('Y-m-d H:i:s'),
                'status' => $news->status,
                'featured' => (bool) ($news->featured ?? false),
                'views' => $news->views,
                'created_at' => optional($news->created_at)->format('Y-m-d H:i:s'),
                'comments' => [],
                'viewer' => [
                    'id' => $user->id,
                    'name' => $user->name,
                ],
            ];

            // Ajouter les commentaires si disponibles
            if ($hasComments && $news->relationLoaded('comments')) {
                $response['comments'] = $news->comments->map(function ($comment) {
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
                });
            }

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in NewsController@show: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Erreur lors du chargement de l\'actualité',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // Obtenir les actualités par tag
    public function getByTag(Request $request, $tag)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Authentification requise pour charger les actualités par tag.',
                    'requires_auth' => true
                ], 401);
            }

            $news = News::where('status', 'published')
                         ->whereJsonContains('tags', $tag)
                         ->orderBy('published_at', 'desc')
                         ->paginate(9);

            return response()->json($news);
        } catch (\Exception $e) {
            Log::error('Error in NewsController@getByTag: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des actualités',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // Obtenir les catégories disponibles (devrait être PUBLIC)
    public function categories()
    {
        try {
            if (!Schema::hasColumn('news', 'category')) {
                return response()->json(['categories' => []]);
            }

            $categories = News::where('status', 'published')
                             ->distinct()
                             ->pluck('category')
                             ->filter();

            return response()->json(['categories' => $categories]);
        } catch (\Exception $e) {
            Log::error('Error in NewsController@categories: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des catégories',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    // Obtenir les tags disponibles (devrait être PUBLIC)
    public function tags()
    {
        try {
            $allTags = News::where('status', 'published')
                            ->whereNotNull('tags')
                            ->get()
                            ->pluck('tags')
                            ->flatten()
                            ->unique()
                            ->values();

            return response()->json(['tags' => $allTags]);
        } catch (\Exception $e) {
            Log::error('Error in NewsController@tags: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des tags',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}