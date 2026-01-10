<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdvocacyCampaign extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'advocacy_campaigns';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'theme',
        'objective',
        'target_audience',
        'key_messages',
        'activities',
        'timeline',
        'budget',
        'partners',
        'indicators',
        'progress',
        'status',
        'start_date',
        'end_date',
        'is_active'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'progress' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Scope a query to only include active campaigns.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include ongoing campaigns.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    /**
     * Scope a query to filter by theme.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $theme
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByTheme($query, $theme)
    {
        return $query->where('theme', $theme);
    }

    /**
     * Scope a query to filter by status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Check if the campaign is completed.
     *
     * @return bool
     */
    public function isCompleted()
    {
        return $this->status === 'completed' && $this->progress >= 100;
    }

    /**
     * Get the progress color based on percentage.
     *
     * @return string
     */
    public function getProgressColor()
    {
        if ($this->progress >= 75) return 'green';
        if ($this->progress >= 50) return 'yellow';
        if ($this->progress >= 25) return 'orange';
        return 'red';
    }
}