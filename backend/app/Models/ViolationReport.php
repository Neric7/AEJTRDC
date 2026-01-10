<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ViolationReport extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'violation_reports';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reference',
        'category',
        'title',
        'description',
        'reporter_type',
        'reporter_info',
        'location',
        'incident_date',
        'reported_date',
        'status',
        'priority',
        'assigned_to',
        'actions_taken',
        'notes'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'incident_date' => 'date',
        'reported_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Boot function from Laravel.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate reference when creating a new report
        static::creating(function ($report) {
            if (!$report->reference) {
                $report->reference = self::generateReference();
            }
        });
    }

    /**
     * Generate a unique reference for the violation report.
     * Format: VR-YYYY-NNN (e.g., VR-2024-001)
     *
     * @return string
     */
    public static function generateReference()
    {
        $year = date('Y');
        
        // Get the last report of the current year
        $lastReport = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();
        
        // Extract number from last reference or start at 1
        $number = $lastReport ? intval(substr($lastReport->reference, -3)) + 1 : 1;
        
        // Format: VR-2024-001
        return sprintf('VR-%d-%03d', $year, $number);
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
     * Scope a query to only include urgent reports.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUrgent($query)
    {
        return $query->where('priority', 'urgent');
    }

    /**
     * Scope a query to only include pending reports.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}