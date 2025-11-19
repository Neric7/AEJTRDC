<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'category',
        'tags',
        'author',
        'published_at',
        'status',
        'views',
        'featured',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'featured' => 'boolean',
        'views' => 'integer',
        'tags' => 'array',
    ];

    // Relations
    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    // Accesseurs
    public function getTagsArrayAttribute()
    {
        return is_string($this->tags) ? json_decode($this->tags, true) : $this->tags;
    }
}