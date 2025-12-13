<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'logo',
        'website',
        'email',
        'phone',
        'address',
        'type',
        'status',
        'featured',
        'order',
        'social_links',
        'partnership_start',
        'partnership_end',
        'partnership_details',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'order' => 'integer',
        'social_links' => 'array',
        'partnership_start' => 'date',
        'partnership_end' => 'date',
    ];

    protected $appends = ['logo_url'];

    /**
     * Get the full URL of the logo
     */
    public function getLogoUrlAttribute()
    {
        if (!$this->logo) {
            return null;
        }

        // Si c'est déjà une URL complète
        if (filter_var($this->logo, FILTER_VALIDATE_URL)) {
            return $this->logo;
        }

        // Si le chemin commence par 'partners/', ajouter storage/
        if (strpos($this->logo, 'partners/') === 0) {
            return url('storage/' . $this->logo);
        }

        // Sinon, utiliser le chemin tel quel
        return url('storage/' . $this->logo);
    }

    /**
     * Scope to get only active partners
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to get featured partners
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Scope to filter by type
     */
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to search by keyword
     */
    public function scopeSearch($query, $keyword)
    {
        return $query->where(function($q) use ($keyword) {
            $q->where('name', 'like', "%{$keyword}%")
              ->orWhere('description', 'like', "%{$keyword}%")
              ->orWhere('partnership_details', 'like', "%{$keyword}%");
        });
    }

    /**
     * Scope to order by custom order field
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')
                     ->orderBy('name', 'asc');
    }
}