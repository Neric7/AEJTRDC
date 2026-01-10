<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EthicalCommitment extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ethical_commitments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'category',
        'description',
        'reference_documents',
        'implementation_date',
        'review_date',
        'is_active',
        'priority',
        'order',
        'tags'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tags' => 'array',
        'is_active' => 'boolean',
        'implementation_date' => 'date',
        'review_date' => 'date',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * Scope a query to only include active commitments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by category.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter by priority.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $priority
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope a query to order by display order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('created_at', 'desc');
    }

    /**
     * Get the categories list.
     *
     * @return array
     */
    public static function getCategories()
    {
        return [
            'principes_humanitaires' => 'Principes Humanitaires',
            'protection' => 'Protection',
            'safeguarding' => 'Safeguarding',
            'code_conduite' => 'Code de Conduite',
            'normes_qualite' => 'Normes de Qualité',
            'environnement' => 'Environnement'
        ];
    }

    /**
     * Get the priorities list.
     *
     * @return array
     */
    public static function getPriorities()
    {
        return [
            'low' => 'Basse',
            'medium' => 'Moyenne',
            'high' => 'Haute',
            'critical' => 'Critique'
        ];
    }

    /**
     * Get the category label.
     *
     * @return string
     */
    public function getCategoryLabelAttribute()
    {
        $categories = self::getCategories();
        return $categories[$this->category] ?? $this->category;
    }

    /**
     * Get the priority label.
     *
     * @return string
     */
    public function getPriorityLabelAttribute()
    {
        $priorities = self::getPriorities();
        return $priorities[$this->priority] ?? $this->priority;
    }

    /**
     * Check if the commitment is critical priority.
     *
     * @return bool
     */
    public function isCritical()
    {
        return $this->priority === 'critical';
    }

    /**
     * Check if review date is approaching (within 30 days).
     *
     * @return bool
     */
    public function isReviewDueAttribute()
    {
        if (!$this->review_date) {
            return false;
        }

        $daysUntilReview = now()->diffInDays($this->review_date, false);
        return $daysUntilReview >= 0 && $daysUntilReview <= 30;
    }
}