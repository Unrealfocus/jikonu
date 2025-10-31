<?php

namespace App\Services;

use App\Models\Order;
use App\Models\EscrowTransaction;
use Illuminate\Support\Facades\Log;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class EscrowService
{
    public function __construct()
    {
        // Initialize Stripe
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Initiate payment and create escrow hold
     */
    public function initiatePayment(Order $order, string $paymentMethod)
    {
        try {
            if ($paymentMethod === 'stripe') {
                return $this->createStripePaymentIntent($order);
            } elseif ($paymentMethod === 'paystack') {
                return $this->createPaystackPayment($order);
            }

            throw new \Exception('Invalid payment method');
        } catch (\Exception $e) {
            Log::error('Payment initiation failed: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Create Stripe payment intent
     */
    private function createStripePaymentIntent(Order $order)
    {
        $paymentIntent = PaymentIntent::create([
            'amount' => $order->total * 100, // Convert to cents
            'currency' => 'usd',
            'metadata' => [
                'order_id' => $order->id,
            ],
            'description' => 'AbaTrade Order #' . $order->tracking_no,
        ]);

        // Create escrow transaction
        EscrowTransaction::create([
            'order_id' => $order->id,
            'amount' => $order->total,
            'payment_method' => 'stripe',
            'payment_status' => 'pending',
            'payment_intent_id' => $paymentIntent->id,
            'status' => 'escrow_hold',
        ]);

        return [
            'client_secret' => $paymentIntent->client_secret,
            'payment_intent_id' => $paymentIntent->id,
        ];
    }

    /**
     * Create Paystack payment
     */
    private function createPaystackPayment(Order $order)
    {
        $url = "https://api.paystack.co/transaction/initialize";

        $fields = [
            'email' => $order->buyer->email,
            'amount' => $order->total * 100, // Convert to kobo
            'metadata' => json_encode(['order_id' => $order->id]),
            'callback_url' => config('app.frontend_url') . '/payment/callback',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . config('services.paystack.secret_key'),
            "Content-Type: application/json",
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        $result = json_decode($response, true);

        if ($result['status']) {
            // Create escrow transaction
            EscrowTransaction::create([
                'order_id' => $order->id,
                'amount' => $order->total,
                'payment_method' => 'paystack',
                'payment_status' => 'pending',
                'payment_intent_id' => $result['data']['reference'],
                'status' => 'escrow_hold',
            ]);

            return [
                'authorization_url' => $result['data']['authorization_url'],
                'access_code' => $result['data']['access_code'],
                'reference' => $result['data']['reference'],
            ];
        }

        throw new \Exception('Paystack payment initialization failed');
    }

    /**
     * Handle successful Stripe payment
     */
    public function handleStripePaymentSuccess($paymentIntent)
    {
        $transaction = EscrowTransaction::where('payment_intent_id', $paymentIntent->id)->first();

        if ($transaction) {
            $transaction->update([
                'payment_status' => 'succeeded',
            ]);

            $transaction->order->update([
                'status' => 'payment_confirmed',
            ]);

            Log::info('Stripe payment succeeded for order: ' . $transaction->order_id);
        }
    }

    /**
     * Handle failed Stripe payment
     */
    public function handleStripePaymentFailed($paymentIntent)
    {
        $transaction = EscrowTransaction::where('payment_intent_id', $paymentIntent->id)->first();

        if ($transaction) {
            $transaction->update([
                'payment_status' => 'failed',
            ]);

            $transaction->order->update([
                'status' => 'cancelled',
            ]);

            Log::warning('Stripe payment failed for order: ' . $transaction->order_id);
        }
    }

    /**
     * Handle successful Paystack payment
     */
    public function handlePaystackPaymentSuccess($data)
    {
        $transaction = EscrowTransaction::where('payment_intent_id', $data->reference)->first();

        if ($transaction) {
            $transaction->update([
                'payment_status' => 'succeeded',
            ]);

            $transaction->order->update([
                'status' => 'payment_confirmed',
            ]);

            Log::info('Paystack payment succeeded for order: ' . $transaction->order_id);
        }
    }

    /**
     * Handle failed Paystack payment
     */
    public function handlePaystackPaymentFailed($data)
    {
        $transaction = EscrowTransaction::where('payment_intent_id', $data->reference)->first();

        if ($transaction) {
            $transaction->update([
                'payment_status' => 'failed',
            ]);

            $transaction->order->update([
                'status' => 'cancelled',
            ]);

            Log::warning('Paystack payment failed for order: ' . $transaction->order_id);
        }
    }

    /**
     * Release payment to seller
     */
    public function releasePayment(Order $order)
    {
        $transaction = $order->escrow;

        if ($transaction && $transaction->status === 'escrow_hold') {
            $transaction->update([
                'status' => 'released',
                'released_at' => now(),
            ]);

            // Here you would typically transfer funds to the seller's account
            // This depends on your payment processor's API

            Log::info('Escrow released for order: ' . $order->id);

            return true;
        }

        return false;
    }

    /**
     * Refund payment to buyer
     */
    public function refundPayment(Order $order)
    {
        $transaction = $order->escrow;

        if ($transaction && $transaction->payment_status === 'succeeded') {
            try {
                if ($transaction->payment_method === 'stripe') {
                    $refund = \Stripe\Refund::create([
                        'payment_intent' => $transaction->payment_intent_id,
                    ]);

                    $transaction->update([
                        'status' => 'refunded',
                        'refunded_at' => now(),
                    ]);

                    $order->update(['status' => 'cancelled']);

                    Log::info('Stripe refund processed for order: ' . $order->id);
                }

                // Implement Paystack refund similarly

                return true;
            } catch (\Exception $e) {
                Log::error('Refund failed: ' . $e->getMessage());
                throw $e;
            }
        }

        return false;
    }

    /**
     * Partial refund
     */
    public function partialRefund(Order $order, float $amount)
    {
        $transaction = $order->escrow;

        if ($transaction && $transaction->payment_status === 'succeeded') {
            try {
                if ($transaction->payment_method === 'stripe') {
                    $refund = \Stripe\Refund::create([
                        'payment_intent' => $transaction->payment_intent_id,
                        'amount' => $amount * 100, // Convert to cents
                    ]);

                    $transaction->update([
                        'status' => 'partial_refund',
                    ]);

                    Log::info('Partial refund processed for order: ' . $order->id);
                }

                return true;
            } catch (\Exception $e) {
                Log::error('Partial refund failed: ' . $e->getMessage());
                throw $e;
            }
        }

        return false;
    }
}
