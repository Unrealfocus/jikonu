<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * List all products (public)
     */
    public function index(Request $request)
    {
        $query = Product::where('verified', true)
            ->where('stock_qty', '>', 0);

        // Search
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $products = $query->with('seller:id,name,verified')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Get single product
     */
    public function show($id)
    {
        $product = Product::with(['seller:id,name,verified', 'ratings'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    /**
     * Get products by category
     */
    public function byCategory($category)
    {
        $products = Product::where('category', $category)
            ->where('verified', true)
            ->with('seller:id,name')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Get products by seller
     */
    public function bySeller($sellerId)
    {
        $products = Product::where('seller_id', $sellerId)
            ->where('verified', true)
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Create new product (seller only)
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_qty' => 'required|integer|min:0',
            'category' => 'required|string',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:5120',
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string',
        ]);

        // Upload images
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 's3');
                $imagePaths[] = Storage::disk('s3')->url($path);
            }
        }

        $product = Product::create([
            'seller_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock_qty' => $validated['stock_qty'],
            'category' => $validated['category'],
            'images' => json_encode($imagePaths),
            'weight' => $validated['weight'] ?? null,
            'dimensions' => $validated['dimensions'] ?? null,
            'verified' => false, // Requires admin approval
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully. Pending verification.',
            'data' => $product,
        ], 201);
    }

    /**
     * Update product
     */
    public function update(Request $request, $id)
    {
        $product = Product::where('seller_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock_qty' => 'sometimes|integer|min:0',
            'category' => 'sometimes|string',
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    /**
     * Delete product
     */
    public function delete($id)
    {
        $product = Product::where('seller_id', auth()->id())->findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }

    /**
     * Get seller's products
     */
    public function myProducts(Request $request)
    {
        $products = Product::where('seller_id', auth()->id())
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Update stock quantity
     */
    public function updateStock(Request $request, $id)
    {
        $product = Product::where('seller_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'stock_qty' => 'required|integer|min:0',
        ]);

        $product->update(['stock_qty' => $validated['stock_qty']]);

        return response()->json([
            'success' => true,
            'message' => 'Stock updated successfully',
            'data' => $product,
        ]);
    }
}
