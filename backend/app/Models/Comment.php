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
        'author_name',
        'author_email',
        'content',
        'status',
        'ip_address',
        'parent_id',
    ];

    protected $casts = [
        'news_id' => 'integer',
        'parent_id' => 'integer',
    ];

    protected $hidden = [
        'author_email',
        'ip_address',
        'deleted_at',
    ];

    /**
     * Relation avec News
     */
    public function news()
    {
        return $this->belongsTo(News::class);
    }

    /**
     * Commentaire parent (pour les réponses)
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Réponses à ce commentaire
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')
                    ->where('status', 'approved')
                    ->orderBy('created_at', 'asc');
    }

    /**
     * Scope pour les commentaires approuvés
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope pour les commentaires principaux (pas de réponses)
     */
    public function scopeParentOnly($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Format de réponse pour l'API
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'news_id' => $this->news_id,
            'author_name' => $this->author_name,
            'content' => $this->content,
            'status' => $this->status,
            'parent_id' => $this->parent_id,
            'replies' => $this->replies,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}