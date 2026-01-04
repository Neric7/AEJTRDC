<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class JobOffer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'type',
        'location',
        'department',
        'description',
        'requirements',
        'responsibilities',
        'duration',
        'deadline',
        'status',
        'featured',
        'views',
        'applications_count',
        'published_at',
    ];

    protected $casts = [
        'requirements' => 'array',
        'responsibilities' => 'array',
        'deadline' => 'date',
        'published_at' => 'datetime',
        'featured' => 'boolean',
        'views' => 'integer',
        'applications_count' => 'integer',
    ];

    /**
     * Boot method pour générer automatiquement le slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($job) {
            if (empty($job->slug)) {
                $job->slug = Str::slug($job->title);
            }
        });

        static::updating(function ($job) {
            if ($job->isDirty('title') && empty($job->slug)) {
                $job->slug = Str::slug($job->title);
            }
        });
    }

    /**
     * Scope pour les offres publiées
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    /**
     * Scope pour les offres en vedette
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Scope pour les offres ouvertes (non expirées)
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'published')
                     ->where(function($q) {
                         $q->whereNull('deadline')
                           ->orWhere('deadline', '>=', now());
                     });
    }

    /**
     * Scope pour filtrer par type
     */
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope pour rechercher
     */
    public function scopeSearch($query, $keyword)
    {
        return $query->where(function($q) use ($keyword) {
            $q->where('title', 'like', "%{$keyword}%")
              ->orWhere('description', 'like', "%{$keyword}%")
              ->orWhere('department', 'like', "%{$keyword}%")
              ->orWhere('location', 'like', "%{$keyword}%");
        });
    }

    /**
     * Incrémenter le compteur de vues
     */
    public function incrementViews()
    {
        $this->increment('views');
    }

    /**
     * Incrémenter le compteur de candidatures
     */
    public function incrementApplications()
    {
        $this->increment('applications_count');
    }

    /**
     * Vérifier si l'offre est expirée
     */
    public function isExpired(): bool
    {
        if (!$this->deadline) {
            return false;
        }
        return $this->deadline->isPast();
    }

    /**
     * Vérifier si l'offre est ouverte aux candidatures
     */
    public function isOpen(): bool
    {
        return $this->status === 'published' && !$this->isExpired();
    }
}