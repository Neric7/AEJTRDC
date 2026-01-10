<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamMember extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'full_name',
        'category',
        'position',
        'role',
        'email',
        'phone',
        'bio',
        'photo',
        'display_order',
        'is_active',
        'social_links',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'social_links' => 'array',
        'display_order' => 'integer',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc')
                     ->orderBy('created_at', 'asc');
    }

    // Accessors
    public function getPhotoUrlAttribute()
    {
        if (!$this->photo) {
            return null;
        }
        
        if (filter_var($this->photo, FILTER_VALIDATE_URL)) {
            return $this->photo;
        }
        
        return url('storage/' . $this->photo);
    }
}