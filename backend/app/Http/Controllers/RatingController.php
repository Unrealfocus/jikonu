<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Order;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Create review
     */
    public function create(Request $request, $orderId)
    {
        $order = Order::where('buyer_id', auth()->id())->findOrFail($orderId);

        // Check if order is delivered
        if ($order->status !== 'delivered') {
            return response()->json([
                'success' => false,
                'message' => 'Can only review delivered orders',
            ], 400);
        }

        // Check if already reviewed
        if (Rating::where('order_id', $orderId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Order already reviewed',
            ], 400);
        }

        $validated = $request->validate([
            'score' => 'required|integer|min:1|max:5',
            'review_text' => 'required|string|max:1000',
            'product_quality' => 'required|integer|min:1|max:5',
            'seller_communication' => 'required|integer|min:1|max:5',
            'shipping_speed' => 'required|integer|min:1|max:5',
        ]);

        $rating = Rating::create([
            'order_id' => $orderId,
            'buyer_id' => auth()->id(),
            'seller_id' => $order->seller_id,
            'product_id' => $order->product_id,
            'score' => $validated['score'],
            'review_text' => $validated['review_text'],
            'product_quality' => $validated['product_quality'],
            'seller_communication' => $validated['seller_communication'],
            'shipping_speed' => $validated['shipping_speed'],
        ]);

        // Update product average rating
        // event(new RatingCreated($rating));

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully',
            'data' => $rating,
        ], 201);
    }

    /**
     * Get buyer's reviews
     */
    public function myReviews(Request $request)
    {
        $reviews = Rating::where('buyer_id', auth()->id())
            ->with(['product', 'order'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ]);
    }
}
