<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingQuote extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'weight',
        'destination',
        'price',
        'tracking_id',
        'status',
        'current_location',
        'estimated_delivery',
        'service_level',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'price' => 'decimal:2',
        'estimated_delivery' => 'datetime',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
