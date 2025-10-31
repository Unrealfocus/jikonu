<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectionReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'inspector_id',
        'photos',
        'notes',
        'quality_score',
        'passed',
        'recommendations',
        'status',
        'completed_at',
    ];

    protected $casts = [
        'photos' => 'array',
        'quality_score' => 'integer',
        'passed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function inspector()
    {
        return $this->belongsTo(User::class, 'inspector_id');
    }
}
