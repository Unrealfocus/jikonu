<?php

namespace App\Http\Controllers;

use App\Models\InspectionReport;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InspectionController extends Controller
{
    /**
     * Get assigned inspections
     */
    public function assignedInspections(Request $request)
    {
        $inspections = InspectionReport::where('inspector_id', auth()->id())
            ->with(['order.product', 'order.buyer', 'order.seller'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $inspections,
        ]);
    }

    /**
     * Get inspection details
     */
    public function show($id)
    {
        $inspection = InspectionReport::where('inspector_id', auth()->id())
            ->with(['order.product', 'order.buyer'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $inspection,
        ]);
    }

    /**
     * Submit inspection report
     */
    public function submitReport(Request $request, $id)
    {
        $inspection = InspectionReport::where('inspector_id', auth()->id())
            ->findOrFail($id);

        if ($inspection->status === 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Inspection already completed',
            ], 400);
        }

        $validated = $request->validate([
            'notes' => 'required|string',
            'quality_score' => 'required|integer|min:1|max:10',
            'passed' => 'required|boolean',
            'recommendations' => 'nullable|string',
        ]);

        $inspection->update([
            'notes' => $validated['notes'],
            'quality_score' => $validated['quality_score'],
            'passed' => $validated['passed'],
            'recommendations' => $validated['recommendations'] ?? null,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Update order status
        $order = $inspection->order;
        if ($validated['passed']) {
            $order->update(['status' => 'ready_to_ship']);

            // Update escrow status
            $order->escrow()->update(['status' => 'ready_to_ship']);
        }

        // Notify buyer
        // event(new InspectionCompleted($inspection));

        return response()->json([
            'success' => true,
            'message' => 'Inspection report submitted successfully',
            'data' => $inspection,
        ]);
    }

    /**
     * Upload inspection photos
     */
    public function uploadPhotos(Request $request, $id)
    {
        $inspection = InspectionReport::where('inspector_id', auth()->id())
            ->findOrFail($id);

        $request->validate([
            'photos' => 'required|array|min:1|max:10',
            'photos.*' => 'image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('inspections', 's3');
                $photoPaths[] = Storage::disk('s3')->url($path);
            }
        }

        $existingPhotos = json_decode($inspection->photos, true) ?? [];
        $allPhotos = array_merge($existingPhotos, $photoPaths);

        $inspection->update(['photos' => json_encode($allPhotos)]);

        return response()->json([
            'success' => true,
            'message' => 'Photos uploaded successfully',
            'data' => [
                'photos' => $allPhotos,
            ],
        ]);
    }
}
