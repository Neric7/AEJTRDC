<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventionZone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'province',
        'year_established',
        'address',
        'phone',
        'email',
        'latitude',
        'longitude',
        'color',
        'description',
        'projects',
        'is_active',
        'order'
    ];

    protected $casts = [
        'projects' => 'array',
        'is_active' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7'
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeHeadquarters($query)
    {
        return $query->where('type', 'headquarters');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('year_established', 'asc');
    }

    // Accesseurs
    public function getTypeNameAttribute()
    {
        $types = [
            'headquarters' => 'Siège National',
            'branch' => 'Antenne Provinciale',
            'extension' => 'Extension Locale'
        ];
        return $types[$this->type] ?? 'Extension';
    }
}