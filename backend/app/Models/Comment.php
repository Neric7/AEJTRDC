<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'news_id',
        'parent_id',
        'author_name',
        'author_email',
        'content',
        'status',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relation avec l'actualité
     */
    public function news()
    {
        return $this->belongsTo(News::class, 'news_id', 'id');
    }

    /**
     * Relation avec le parent (pour les réponses)
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }

    /**
     * Relation avec les réponses
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id', 'id');
    }

    /**
     * Relation avec l'utilisateur (optionnel)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope pour les commentaires approuvés
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope pour les commentaires en attente
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}