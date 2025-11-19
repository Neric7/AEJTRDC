<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'published_at',
        'author',
        'tags',
        'status',
        'views',
        'featured',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'featured' => 'boolean',
        'views' => 'integer',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    /**
     * Scope pour les actualités publiées
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where('published_at', '<=', now());
    }

    /**
     * Scope pour les actualités en vedette
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Accessor pour l'URL complète de l'image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) return null;
        
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        
        return asset('storage/' . $this->image);
    }

    /**
     * Accessor pour l'URL de détail
     */
    public function getUrlAttribute()
    {
        return route('news.show', $this->slug);
    }

    /**
     * Format de réponse pour l'API
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'image' => $this->image_url,
            'published_at' => $this->published_at?->toISOString(),
            'author' => $this->author,
            'tags' => $this->tags ?? [],
            'status' => $this->status,
            'views' => $this->views ?? 0,
            'featured' => $this->featured ?? false,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
    /**
 * Relation avec les commentaires
 */
public function comments()
{
    return $this->hasMany(Comment::class)
                ->where('status', 'approved')
                ->whereNull('parent_id')
                ->orderBy('created_at', 'desc')
                ->with('replies');
}

/**
 * Tous les commentaires (incluant non-approuvés)
 */
public function allComments()
{
    return $this->hasMany(Comment::class);
}
}