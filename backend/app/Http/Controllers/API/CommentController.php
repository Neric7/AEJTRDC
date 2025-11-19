<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\News;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Liste des commentaires d'un article
     */
    public function index($newsId)
    {
        $news = News::findOrFail($newsId);
        
        $comments = Comment::where('news_id', $newsId)
            ->approved()
            ->parentOnly()
            ->with('replies')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($comments);
    }
    
    /**
     * Créer un nouveau commentaire
     */
    public function store(Request $request, $newsId)
    {
        $news = News::findOrFail($newsId);
        
        $validated = $request->validate([
            'author_name' => 'required|string|max:100',
            'author_email' => 'required|email|max:150',
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);
        
        $validated['news_id'] = $newsId;
        $validated['ip_address'] = $request->ip();
        $validated['status'] = 'pending'; // Modération par défaut
        
        $comment = Comment::create($validated);
        
        return response()->json([
            'message' => 'Commentaire soumis avec succès. Il sera visible après modération.',
            'comment' => $comment
        ], 201);
    }
    
    /**
     * ADMIN - Approuver un commentaire
     */
    public function approve($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update(['status' => 'approved']);
        
        return response()->json([
            'message' => 'Commentaire approuvé',
            'comment' => $comment
        ]);
    }
    
    /**
     * ADMIN - Rejeter un commentaire
     */
    public function reject($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update(['status' => 'rejected']);
        
        return response()->json([
            'message' => 'Commentaire rejeté'
        ]);
    }
    
    /**
     * ADMIN - Supprimer un commentaire
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        
        return response()->json([
            'message' => 'Commentaire supprimé avec succès'
        ]);
    }
}