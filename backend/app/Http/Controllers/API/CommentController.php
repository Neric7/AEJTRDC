<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\News;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Obtenir tous les commentaires d'une news
    public function index($newsId)
    {
        $news = News::findOrFail($newsId);

        $comments = Comment::with(['replies' => function ($query) {
                $query->where('status', 'approved')
                      ->orderBy('created_at', 'asc');
            }])
            ->where('news_id', $news->id)
            ->whereNull('parent_id')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($comment) => $this->formatComment($comment));

        return response()->json($comments);
    }

    // Créer un commentaire (nécessite authentification)
    public function store(Request $request, $newsId)
    {
        $news = News::findOrFail($newsId);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'message' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = Comment::create([
            'news_id' => $news->id,
            'parent_id' => $validated['parent_id'] ?? null,
            'author_name' => $validated['name'],
            'author_email' => $validated['email'],
            'content' => $validated['message'],
            'status' => 'approved',
            'ip_address' => $request->ip(),
        ]);

        return response()->json($this->formatComment($comment), 201);
    }

    // Modifier un commentaire (uniquement l'auteur)
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $validated = $request->validate([
            'message' => 'required|string|min:3|max:1000',
            'status' => 'nullable|in:pending,approved,rejected',
        ]);

        $comment->update([
            'content' => $validated['message'],
            'status' => $validated['status'] ?? $comment->status,
        ]);

        return response()->json([
            'message' => 'Commentaire modifié avec succès',
            'comment' => $this->formatComment($comment),
        ]);
    }

    // Supprimer un commentaire (uniquement l'auteur ou admin)
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        $comment->delete();

        return response()->json([
            'message' => 'Commentaire supprimé avec succès'
        ]);
    }

    private function formatComment(Comment $comment)
    {
        $comment->loadMissing(['replies' => function ($query) {
            $query->where('status', 'approved')
                  ->orderBy('created_at', 'asc');
        }]);

        return [
            'id' => $comment->id,
            'name' => $comment->author_name,
            'email' => $comment->author_email,
            'message' => $comment->content,
            'status' => $comment->status,
            'created_at' => optional($comment->created_at)->format('Y-m-d H:i:s'),
            'replies' => $comment->replies->map(fn ($reply) => [
                'id' => $reply->id,
                'name' => $reply->author_name,
                'email' => $reply->author_email,
                'message' => $reply->content,
                'status' => $reply->status,
                'created_at' => optional($reply->created_at)->format('Y-m-d H:i:s'),
            ]),
        ];
    }
}