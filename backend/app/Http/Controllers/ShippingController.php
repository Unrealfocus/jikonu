<?php

namespace App\Http\Controllers;

use App\Models\ShippingQuote;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    /**
     * Get shipping quote
     */
    public function getQuote(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric|min:0.1',
            'destination_zip' => 'required|string',
            'destination_country' => 'required|string',
            'service_level' => 'required|in:standard,express',
        ]);

        // Call AbaTrade Logistics API
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.logistics.api_key'),
            ])->post(config('services.logistics.api_url') . '/quotes', [
                'weight' => $validated['weight'],
                'origin' => 'Aba, Nigeria',
                'destination_zip' => $validated['destination_zip'],
                'destination_country' => $validated['destination_country'],
                'service_level' => $validated['service_level'],
            ]);

            if ($response->successful()) {
                $quoteData = $response->json();

                return response()->json([
                    'success' => true,
                    'data' => [
                        'price' => $quoteData['price'],
                        'estimated_days' => $quoteData['estimated_days'],
                        'service_level' => $validated['service_level'],
                    ],
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch shipping quote',
            ], 500);
        } catch (\Exception $e) {
            Log::error('Shipping quote error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching shipping quote',
            ], 500);
        }
    }

    /**
     * Track shipment
     */
    public function track($trackingNumber)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.logistics.api_key'),
            ])->get(config('services.logistics.api_url') . '/tracking/' . $trackingNumber);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'data' => $response->json(),
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Tracking information not available',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Tracking error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching tracking information',
            ], 500);
        }
    }

    /**
     * Get all shipments (logistics agent)
     */
    public function index(Request $request)
    {
        $shipments = ShippingQuote::with('order.product')
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $shipments,
        ]);
    }

    /**
     * Update tracking info (logistics agent)
     */
    public function updateTracking(Request $request, $id)
    {
        $shipment = ShippingQuote::findOrFail($id);

        $validated = $request->validate([
            'tracking_id' => 'required|string',
            'status' => 'required|in:pending,in_transit,customs,delivered',
            'current_location' => 'nullable|string',
            'estimated_delivery' => 'nullable|date',
        ]);

        $shipment->update($validated);

        // Notify buyer
        // event(new ShipmentUpdated($shipment));

        return response()->json([
            'success' => true,
            'message' => 'Tracking updated successfully',
            'data' => $shipment,
        ]);
    }

    /**
     * Sync with Logistics API (cron job)
     */
    public function syncWithLogisticsAPI()
    {
        try {
            $shipments = ShippingQuote::where('status', '!=', 'delivered')->get();

            foreach ($shipments as $shipment) {
                if ($shipment->tracking_id) {
                    $response = Http::withHeaders([
                        'Authorization' => 'Bearer ' . config('services.logistics.api_key'),
                    ])->get(config('services.logistics.api_url') . '/tracking/' . $shipment->tracking_id);

                    if ($response->successful()) {
                        $data = $response->json();
                        $shipment->update([
                            'status' => $data['status'] ?? $shipment->status,
                            'current_location' => $data['current_location'] ?? null,
                            'estimated_delivery' => $data['estimated_delivery'] ?? null,
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Sync completed successfully',
                'synced_count' => $shipments->count(),
            ]);
        } catch (\Exception $e) {
            Log::error('Logistics sync error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Sync failed',
            ], 500);
        }
    }

    /**
     * Logistics webhook handler
     */
    public function logisticsWebhook(Request $request)
    {
        $validated = $request->validate([
            'tracking_id' => 'required|string',
            'status' => 'required|string',
            'current_location' => 'nullable|string',
        ]);

        $shipment = ShippingQuote::where('tracking_id', $validated['tracking_id'])->first();

        if ($shipment) {
            $shipment->update([
                'status' => $validated['status'],
                'current_location' => $validated['current_location'] ?? null,
            ]);

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Shipment not found'], 404);
    }
}
