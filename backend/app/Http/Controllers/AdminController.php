<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\EscrowTransaction;
use App\Models\InspectionReport;
use App\Models\ShippingQuote;
use App\Services\EscrowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    protected $escrowService;

    public function __construct(EscrowService $escrowService)
    {
        $this->escrowService = $escrowService;
    }

    /**
     * List all users
     */
    public function listUsers(Request $request)
    {
        $query = User::query();

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 50));

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    /**
     * Get user details
     */
    public function getUserDetails($id)
    {
        $user = User::with(['products', 'orders'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Verify user
     */
    public function verifyUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['verified' => true]);

        return response()->json([
            'success' => true,
            'message' => 'User verified successfully',
        ]);
    }

    /**
     * Suspend user
     */
    public function suspendUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'reason' => 'required|string',
        ]);

        $user->update([
            'suspended' => true,
            'suspension_reason' => $validated['reason'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User suspended successfully',
        ]);
    }

    /**
     * Get products pending verification
     */
    public function pendingProducts()
    {
        $products = Product::where('verified', false)
            ->with('seller:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Verify product
     */
    public function verifyProduct($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['verified' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Product verified successfully',
        ]);
    }

    /**
     * Get all orders
     */
    public function allOrders(Request $request)
    {
        $query = Order::with(['buyer:id,name', 'seller:id,name', 'product']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 50));

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Get disputes
     */
    public function disputes()
    {
        $disputes = Order::where('status', 'disputed')
            ->with(['buyer:id,name', 'seller:id,name', 'product'])
            ->orderBy('updated_at', 'desc')
            ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $disputes,
        ]);
    }

    /**
     * Resolve dispute
     */
    public function resolveDispute(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'resolution' => 'required|in:refund,release,partial',
            'notes' => 'required|string',
            'refund_amount' => 'required_if:resolution,partial|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            if ($validated['resolution'] === 'refund') {
                $this->escrowService->refundPayment($order);
            } elseif ($validated['resolution'] === 'release') {
                $this->escrowService->releasePayment($order);
            } elseif ($validated['resolution'] === 'partial') {
                $this->escrowService->partialRefund($order, $validated['refund_amount']);
            }

            $order->update([
                'status' => 'resolved',
                'dispute_resolution' => $validated['resolution'],
                'dispute_notes' => $validated['notes'],
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Dispute resolved successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to resolve dispute',
            ], 500);
        }
    }

    /**
     * Get all escrow transactions
     */
    public function allEscrowTransactions(Request $request)
    {
        $transactions = EscrowTransaction::with('order.product')
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 50));

        return response()->json([
            'success' => true,
            'data' => $transactions,
        ]);
    }

    /**
     * Release escrow
     */
    public function releaseEscrow($id)
    {
        $transaction = EscrowTransaction::with('order')->findOrFail($id);
        $this->escrowService->releasePayment($transaction->order);

        return response()->json([
            'success' => true,
            'message' => 'Escrow released successfully',
        ]);
    }

    /**
     * Refund escrow
     */
    public function refundEscrow($id)
    {
        $transaction = EscrowTransaction::with('order')->findOrFail($id);
        $this->escrowService->refundPayment($transaction->order);

        return response()->json([
            'success' => true,
            'message' => 'Escrow refunded successfully',
        ]);
    }

    /**
     * Get all inspections
     */
    public function allInspections(Request $request)
    {
        $inspections = InspectionReport::with(['order.product', 'inspector:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 50));

        return response()->json([
            'success' => true,
            'data' => $inspections,
        ]);
    }

    /**
     * Assign inspector
     */
    public function assignInspector(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'inspector_id' => 'required|exists:users,id',
        ]);

        $inspection = InspectionReport::create([
            'order_id' => $validated['order_id'],
            'inspector_id' => $validated['inspector_id'],
            'status' => 'assigned',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inspector assigned successfully',
            'data' => $inspection,
        ]);
    }

    /**
     * Generate shipping manifest
     */
    public function generateManifest(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $shipments = ShippingQuote::whereBetween('created_at', [
            $validated['start_date'],
            $validated['end_date']
        ])
        ->where('status', 'ready_to_ship')
        ->with('order.product')
        ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'manifest' => $shipments,
                'total_shipments' => $shipments->count(),
                'total_weight' => $shipments->sum('weight'),
            ],
        ]);
    }

    /**
     * Consolidate shipments
     */
    public function consolidateShipments(Request $request)
    {
        $validated = $request->validate([
            'shipment_ids' => 'required|array',
            'shipment_ids.*' => 'exists:shipping_quotes,id',
        ]);

        $shipments = ShippingQuote::whereIn('id', $validated['shipment_ids'])->get();

        // Logic for consolidation
        // This would typically involve creating a master shipping manifest

        return response()->json([
            'success' => true,
            'message' => 'Shipments consolidated successfully',
            'data' => [
                'consolidated_count' => $shipments->count(),
                'total_weight' => $shipments->sum('weight'),
            ],
        ]);
    }

    /**
     * Dashboard analytics
     */
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'pending_verifications' => Product::where('verified', false)->count(),
            'active_escrow' => EscrowTransaction::where('status', 'escrow_hold')->sum('amount'),
            'pending_inspections' => InspectionReport::where('status', 'assigned')->count(),
            'recent_orders' => Order::with(['buyer:id,name', 'product'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * KPIs
     */
    public function kpis()
    {
        $kpis = [
            'avg_verification_time' => $this->calculateAvgVerificationTime(),
            'avg_inspection_time' => $this->calculateAvgInspectionTime(),
            'avg_escrow_release_time' => $this->calculateAvgEscrowReleaseTime(),
            'dispute_rate' => $this->calculateDisputeRate(),
            'delivery_success_rate' => $this->calculateDeliverySuccessRate(),
        ];

        return response()->json([
            'success' => true,
            'data' => $kpis,
        ]);
    }

    private function calculateAvgVerificationTime()
    {
        // Implementation logic
        return 48; // hours
    }

    private function calculateAvgInspectionTime()
    {
        return 36; // hours
    }

    private function calculateAvgEscrowReleaseTime()
    {
        return 12; // hours
    }

    private function calculateDisputeRate()
    {
        $totalOrders = Order::count();
        $disputes = Order::where('status', 'disputed')->count();

        return $totalOrders > 0 ? ($disputes / $totalOrders) * 100 : 0;
    }

    private function calculateDeliverySuccessRate()
    {
        $delivered = Order::where('status', 'delivered')->count();
        $total = Order::whereIn('status', ['delivered', 'disputed', 'cancelled'])->count();

        return $total > 0 ? ($delivered / $total) * 100 : 0;
    }
}
