<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'product_id',
        'quantity',
        'price',
        'subtotal',
        'inspection_fee',
        'shipping_fee',
        'total',
        'status',
        'shipping_address',
        'shipping_city',
        'shipping_zip',
        'shipping_country',
        'tracking_no',
        'request_inspection',
        'delivered_at',
        'dispute_resolution',
        'dispute_notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'inspection_fee' => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'total' => 'decimal:2',
        'request_inspection' => 'boolean',
        'delivered_at' => 'datetime',
    ];

    // Relationships
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function inspection()
    {
        return $this->hasOne(InspectionReport::class);
    }

    public function escrow()
    {
        return $this->hasOne(EscrowTransaction::class);
    }

    public function shipping()
    {
        return $this->hasOne(ShippingQuote::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }
}
