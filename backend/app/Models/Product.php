<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'title',
        'description',
        'price',
        'stock_qty',
        'category',
        'images',
        'weight',
        'dimensions',
        'verified',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock_qty' => 'integer',
        'weight' => 'decimal:2',
        'verified' => 'boolean',
        'images' => 'array',
    ];

    // Relationships
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    // Accessors
    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('score');
    }

    public function getTotalReviewsAttribute()
    {
        return $this->ratings()->count();
    }
}
