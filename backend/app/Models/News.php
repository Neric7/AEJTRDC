<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'content',
        'image',
        'images',
        'category',
        'published_at',
        'author',
        'tags',
        'status',
        'views',
        'featured',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'tags' => 'array',
        'images' => 'array',
        'featured' => 'boolean',
        'views' => 'integer',
    ];

    protected $appends = ['image_url', 'images_urls'];

    /**
     * Get the full URL of the main image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // Si c'est déjà une URL complète
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Si le chemin commence par 'news/', ajouter storage/
        if (strpos($this->image, 'news/') === 0) {
            return url('storage/' . $this->image);
        }

        // Sinon, utiliser le chemin tel quel
        return url('storage/' . $this->image);
    }

    /**
     * Get the full URLs of additional images
     */
    public function getImagesUrlsAttribute()
    {
        if (!$this->images || !is_array($this->images)) {
            return [];
        }

        return array_map(function($image) {
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }
            return asset('storage/' . $image);
        }, $this->images);
    }

    /**
     * Scope to get only published news
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    /**
     * Scope to get featured news
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Scope to search by keyword
     */
    public function scopeSearch($query, $keyword)
    {
        return $query->where(function($q) use ($keyword) {
            $q->where('title', 'like', "%{$keyword}%")
              ->orWhere('content', 'like', "%{$keyword}%")
              ->orWhere('excerpt', 'like', "%{$keyword}%");
        });
    }

    /**
     * Scope to filter by category
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Increment views count
     */
    public function incrementViews()
    {
        $this->increment('views');
    }

    /**
     * Relation avec les commentaires
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'news_id', 'id');
    }
}