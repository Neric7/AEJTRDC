<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'objective',
        'execution_zone',
        'start_date',
        'end_date',
        'status',
        'results',
        'indicators',
        'testimonials',
        'image',
        'images',
        'domain_id',
        'partners',
        'budget',
        'beneficiaries_count',
        'featured',
        'views',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'results' => 'array',
        'indicators' => 'array',
        'testimonials' => 'array',
        'images' => 'array',
        'partners' => 'array',
        'budget' => 'decimal:2',
        'beneficiaries_count' => 'integer',
        'featured' => 'boolean',
        'views' => 'integer',
    ];

    protected $appends = ['image_url', 'images_urls', 'status_label', 'duration'];

    /**
     * Get the full URL of the main image - VERSION CORRIGÉE
     */
    public function getImageUrlAttribute()
    {
        return $this->image 
            ? asset('storage/' . $this->image)
            : null;
    }

    /**
     * Get URLs for gallery images
     */
    public function getImagesUrlsAttribute()
    {
        if (!$this->images || !is_array($this->images)) {
            return [];
        }

        return array_map(function($image) {
            return asset('storage/' . $image);
        }, $this->images);
    }

    /**
     * Get human-readable status label
     */
    public function getStatusLabelAttribute()
    {
        $labels = [
            'planning' => 'En planification',
            'ongoing' => 'En cours',
            'completed' => 'Terminé',
            'suspended' => 'Suspendu',
        ];

        return $labels[$this->status] ?? $this->status;
    }

    /**
     * Get project duration in months
     */
    public function getDurationAttribute()
    {
        if (!$this->start_date || !$this->end_date) {
            return null;
        }

        return $this->start_date->diffInMonths($this->end_date);
    }

    /**
     * Scope to get only active projects
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['planning', 'ongoing']);
    }

    /**
     * Scope to get completed projects
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope to get featured projects
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
              ->orWhere('excerpt', 'like', "%{$keyword}%")
              ->orWhere('objective', 'like', "%{$keyword}%")
              ->orWhere('execution_zone', 'like', "%{$keyword}%");
        });
    }

    /**
     * Scope to filter by domain
     */
    public function scopeByDomain($query, $domainId)
    {
        return $query->where('domain_id', $domainId);
    }

    /**
     * Scope to filter by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Increment views count
     */
    public function incrementViews()
    {
        $this->increment('views');
    }

    /**
     * Relation avec le domaine
     */
    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }
}