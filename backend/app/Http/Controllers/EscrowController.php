<?php

namespace App\Http\Controllers;

use App\Models\EscrowTransaction;
use App\Services\EscrowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EscrowController extends Controller
{
    protected $escrowService;

    public function __construct(EscrowService $escrowService)
    {
        $this->escrowService = $escrowService;
    }

    /**
     * Get buyer's escrow transactions
     */
    public function myTransactions(Request $request)
    {
        $transactions = EscrowTransaction::whereHas('order', function ($query) {
            $query->where('buyer_id', auth()->id());
        })
        ->with('order.product')
        ->orderBy('created_at', 'desc')
        ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $transactions,
        ]);
    }

    /**
     * Get seller's escrow transactions
     */
    public function sellerEscrow(Request $request)
    {
        $transactions = EscrowTransaction::whereHas('order', function ($query) {
            $query->where('seller_id', auth()->id());
        })
        ->with('order.product')
        ->orderBy('created_at', 'desc')
        ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $transactions,
        ]);
    }

    /**
     * Get single escrow transaction
     */
    public function show($transactionId)
    {
        $transaction = EscrowTransaction::with('order.product')
            ->findOrFail($transactionId);

        // Verify access
        $order = $transaction->order;
        if ($order->buyer_id !== auth()->id() && $order->seller_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return response()->json([
            'success' => true,
            'data' => $transaction,
        ]);
    }

    /**
     * Stripe webhook handler
     */
    public function stripeWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );

            // Handle the event
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $this->escrowService->handleStripePaymentSuccess($event->data->object);
                    break;
                case 'payment_intent.payment_failed':
                    $this->escrowService->handleStripePaymentFailed($event->data->object);
                    break;
                default:
                    Log::info('Unhandled Stripe event: ' . $event->type);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Stripe webhook error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Paystack webhook handler
     */
    public function paystackWebhook(Request $request)
    {
        $input = $request->getContent();
        $signature = $request->header('X-Paystack-Signature');

        if (!$signature || ($signature !== hash_hmac('sha512', $input, config('services.paystack.secret_key')))) {
            abort(401, 'Invalid signature');
        }

        $event = json_decode($input);

        try {
            switch ($event->event) {
                case 'charge.success':
                    $this->escrowService->handlePaystackPaymentSuccess($event->data);
                    break;
                case 'charge.failed':
                    $this->escrowService->handlePaystackPaymentFailed($event->data);
                    break;
                default:
                    Log::info('Unhandled Paystack event: ' . $event->event);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Paystack webhook error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
