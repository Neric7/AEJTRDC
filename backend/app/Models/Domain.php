<?php
// app/Models/Domain.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Domain extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'slug',
        'image',
        'description_courte',
        'contenu',
        'icon',
        'ordre',
        'actif'
    ];

    protected $casts = [
        'contenu' => 'array',
        'actif' => 'boolean',
    ];

    // Auto-génération du slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($domain) {
            if (empty($domain->slug)) {
                $domain->slug = Str::slug($domain->titre);
            }
        });

        static::updating(function ($domain) {
            if ($domain->isDirty('titre') && empty($domain->slug)) {
                $domain->slug = Str::slug($domain->titre);
            }
        });
    }

    // Scope pour les domaines actifs
    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    // Scope pour l'ordre
    public function scopeOrdered($query)
    {
        return $query->orderBy('ordre', 'asc');
    }

    // Accessor pour l'URL complète de l'image
    public function getImageUrlAttribute()
    {
        if ($this->image && !str_starts_with($this->image, 'http')) {
            return asset('storage/' . $this->image);
        }
        return $this->image;
    }
}