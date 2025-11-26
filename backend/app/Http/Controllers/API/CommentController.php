<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Obtenir tous les commentaires d'une actualité avec leurs réponses
     */
    public function index($newsId)
    {
        $news = News::findOrFail($newsId);

        // Charger les commentaires parents avec leurs réponses imbriquées
        $comments = Comment::with(['replies' => function ($query) {
                $query->where('status', 'approved')
                      ->with('user:id,name,email') // Charger l'utilisateur des réponses
                      ->orderBy('created_at', 'asc');
            }, 'user:id,name,email']) // Charger l'utilisateur des commentaires parents
            ->where('news_id', $news->id)
            ->whereNull('parent_id') // Seulement les commentaires parents
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($comment) => $this->formatComment($comment));

        return response()->json($comments);
    }

    /**
     * Créer un nouveau commentaire (nécessite authentification)
     */
    public function store(Request $request, $newsId)
    {
        // Vérifier que l'utilisateur est authentifié
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Vous devez être connecté pour commenter'
            ], 401);
        }

        $news = News::findOrFail($newsId);
        $user = Auth::user();

        $validated = $request->validate([
            'message' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        // Si c'est une réponse, vérifier que le parent appartient à la même news
        if (!empty($validated['parent_id'])) {
            $parentComment = Comment::findOrFail($validated['parent_id']);
            if ($parentComment->news_id !== $news->id) {
                return response()->json([
                    'message' => 'Le commentaire parent n\'appartient pas à cette actualité'
                ], 400);
            }
        }

        // Créer le commentaire avec l'utilisateur connecté
        $comment = Comment::create([
            'news_id' => $news->id,
            'user_id' => $user->id,
            'parent_id' => $validated['parent_id'] ?? null,
            'author_name' => $user->name,
            'author_email' => $user->email,
            'content' => $validated['message'],
            'status' => 'approved', // Auto-approuver (à modifier selon besoins)
            'ip_address' => $request->ip(),
        ]);

        // Recharger le commentaire avec l'utilisateur
        $comment->load('user:id,name,email');

        return response()->json($this->formatComment($comment), 201);
    }

    /**
     * Modifier un commentaire (uniquement l'auteur ou admin)
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();

        // Vérifier que l'utilisateur peut modifier ce commentaire
        if ($comment->user_id !== $user->id && !$user->is_admin) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à modifier ce commentaire'
            ], 403);
        }

        $validated = $request->validate([
            'message' => 'required|string|min:3|max:1000',
        ]);

        $comment->update([
            'content' => $validated['message'],
        ]);

        $comment->load('user:id,name,email');

        return response()->json([
            'message' => 'Commentaire modifié avec succès',
            'comment' => $this->formatComment($comment),
        ]);
    }

    /**
     * Supprimer un commentaire (uniquement l'auteur ou admin)
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $user = Auth::user();

        // Vérifier que l'utilisateur peut supprimer ce commentaire
        if ($comment->user_id !== $user->id && !$user->is_admin) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à supprimer ce commentaire'
            ], 403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Commentaire supprimé avec succès'
        ]);
    }

    /**
     * Formater un commentaire pour la réponse API
     */
    private function formatComment(Comment $comment)
    {
        // S'assurer que les relations sont chargées
        $comment->loadMissing(['replies' => function ($query) {
            $query->where('status', 'approved')
                  ->with('user:id,name,email')
                  ->orderBy('created_at', 'asc');
        }, 'user:id,name,email']);

        $data = [
            'id' => $comment->id,
            'name' => $comment->author_name,
            'email' => $comment->author_email,
            'message' => $comment->content,
            'status' => $comment->status,
            'created_at' => optional($comment->created_at)->format('Y-m-d H:i:s'),
            'user_id' => $comment->user_id,
        ];

        // Ajouter les informations utilisateur si disponible
        if ($comment->user) {
            $data['user'] = [
                'id' => $comment->user->id,
                'name' => $comment->user->name,
                'email' => $comment->user->email,
            ];
        }

        // Ajouter les réponses de manière récursive
        if ($comment->replies && $comment->replies->isNotEmpty()) {
            $data['replies'] = $comment->replies->map(function ($reply) {
                $replyData = [
                    'id' => $reply->id,
                    'name' => $reply->author_name,
                    'email' => $reply->author_email,
                    'message' => $reply->content,
                    'status' => $reply->status,
                    'created_at' => optional($reply->created_at)->format('Y-m-d H:i:s'),
                    'user_id' => $reply->user_id,
                ];

                if ($reply->user) {
                    $replyData['user'] = [
                        'id' => $reply->user->id,
                        'name' => $reply->user->name,
                        'email' => $reply->user->email,
                    ];
                }

                return $replyData;
            });
        } else {
            $data['replies'] = [];
        }

        return $data;
    }
}