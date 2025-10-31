<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\EscrowService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    protected $escrowService;

    public function __construct(EscrowService $escrowService)
    {
        $this->escrowService = $escrowService;
    }

    /**
     * Create new order
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_zip' => 'required|string',
            'shipping_country' => 'required|string',
            'payment_method' => 'required|in:stripe,paystack',
            'request_inspection' => 'boolean',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Check stock
        if ($product->stock_qty < $validated['quantity']) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock',
            ], 400);
        }

        // Calculate total
        $subtotal = $product->price * $validated['quantity'];
        $inspectionFee = $request->boolean('request_inspection') ? 25.00 : 0;
        $total = $subtotal + $inspectionFee;

        $order = Order::create([
            'buyer_id' => auth()->id(),
            'seller_id' => $product->seller_id,
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'price' => $product->price,
            'subtotal' => $subtotal,
            'inspection_fee' => $inspectionFee,
            'total' => $total,
            'status' => 'pending_payment',
            'shipping_address' => $validated['shipping_address'],
            'shipping_city' => $validated['shipping_city'],
            'shipping_zip' => $validated['shipping_zip'],
            'shipping_country' => $validated['shipping_country'],
            'tracking_no' => 'ABT-' . strtoupper(Str::random(10)),
            'request_inspection' => $request->boolean('request_inspection'),
        ]);

        // Initiate payment via Escrow Service
        $paymentIntent = $this->escrowService->initiatePayment(
            $order,
            $validated['payment_method']
        );

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => [
                'order' => $order,
                'payment_intent' => $paymentIntent,
            ],
        ], 201);
    }

    /**
     * Get buyer's orders
     */
    public function myOrders(Request $request)
    {
        $orders = Order::where('buyer_id', auth()->id())
            ->with(['product', 'seller:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Get single order details
     */
    public function show($id)
    {
        $order = Order::where('buyer_id', auth()->id())
            ->orWhere('seller_id', auth()->id())
            ->with(['product', 'buyer:id,name', 'seller:id,name', 'inspection', 'escrow'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Get seller's orders
     */
    public function sellerOrders(Request $request)
    {
        $orders = Order::where('seller_id', auth()->id())
            ->with(['product', 'buyer:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Update order status (seller)
     */
    public function updateStatus(Request $request, $id)
    {
        $order = Order::where('seller_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:processing,ready_to_ship,shipped,delivered',
        ]);

        $order->update(['status' => $validated['status']]);

        // Trigger notifications
        // event(new OrderStatusUpdated($order));

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully',
            'data' => $order,
        ]);
    }

    /**
     * Confirm delivery (buyer)
     */
    public function confirmDelivery($id)
    {
        $order = Order::where('buyer_id', auth()->id())->findOrFail($id);

        if ($order->status !== 'shipped') {
            return response()->json([
                'success' => false,
                'message' => 'Order is not in shipped status',
            ], 400);
        }

        $order->update([
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);

        // Release escrow
        $this->escrowService->releasePayment($order);

        return response()->json([
            'success' => true,
            'message' => 'Delivery confirmed. Payment released to seller.',
            'data' => $order,
        ]);
    }

    /**
     * Request inspection
     */
    public function requestInspection($id)
    {
        $order = Order::where('buyer_id', auth()->id())->findOrFail($id);

        if ($order->request_inspection) {
            return response()->json([
                'success' => false,
                'message' => 'Inspection already requested',
            ], 400);
        }

        $order->update(['request_inspection' => true]);

        // Assign inspector
        // event(new InspectionRequested($order));

        return response()->json([
            'success' => true,
            'message' => 'Inspection requested successfully',
        ]);
    }
}
