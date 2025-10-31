<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\EscrowController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| AbaTrade API Routes
| Version: 4.0
|
*/

// Public routes
Route::prefix('v1')->group(function () {

    // Authentication
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    });

    // Public products (browsing)
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/category/{category}', [ProductController::class, 'byCategory']);
    Route::get('/products/seller/{sellerId}', [ProductController::class, 'bySeller']);
});

// Protected routes (requires authentication)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    // User Profile
    Route::get('/user', [UserController::class, 'profile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::post('/user/upload-photo', [UserController::class, 'uploadPhoto']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Buyer Routes
    Route::middleware('role:buyer')->group(function () {
        // Orders
        Route::post('/orders', [OrderController::class, 'create']);
        Route::get('/orders', [OrderController::class, 'myOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::post('/orders/{id}/confirm-delivery', [OrderController::class, 'confirmDelivery']);
        Route::post('/orders/{id}/request-inspection', [OrderController::class, 'requestInspection']);

        // Ratings & Reviews
        Route::post('/orders/{orderId}/review', [RatingController::class, 'create']);
        Route::get('/reviews/my-reviews', [RatingController::class, 'myReviews']);

        // Escrow
        Route::get('/escrow/transactions', [EscrowController::class, 'myTransactions']);
        Route::get('/escrow/{transactionId}', [EscrowController::class, 'show']);
    });

    // Seller Routes
    Route::middleware('role:seller')->group(function () {
        // Products
        Route::post('/products', [ProductController::class, 'create']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'delete']);
        Route::get('/seller/products', [ProductController::class, 'myProducts']);
        Route::patch('/products/{id}/stock', [ProductController::class, 'updateStock']);

        // Seller Orders
        Route::get('/seller/orders', [OrderController::class, 'sellerOrders']);
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);

        // Seller Escrow
        Route::get('/seller/escrow', [EscrowController::class, 'sellerEscrow']);
    });

    // Inspector Routes
    Route::middleware('role:inspector')->group(function () {
        Route::get('/inspections/assigned', [InspectionController::class, 'assignedInspections']);
        Route::get('/inspections/{id}', [InspectionController::class, 'show']);
        Route::post('/inspections/{id}/submit-report', [InspectionController::class, 'submitReport']);
        Route::post('/inspections/{id}/upload-photos', [InspectionController::class, 'uploadPhotos']);
    });

    // Logistics Agent Routes
    Route::middleware('role:logistics')->group(function () {
        Route::get('/shipments', [ShippingController::class, 'index']);
        Route::post('/shipments/{id}/update-tracking', [ShippingController::class, 'updateTracking']);
        Route::post('/shipments/sync', [ShippingController::class, 'syncWithLogisticsAPI']);
    });

    // Shipping (Shared)
    Route::get('/shipping/quote', [ShippingController::class, 'getQuote']);
    Route::get('/shipping/track/{trackingNumber}', [ShippingController::class, 'track']);

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Users Management
        Route::get('/users', [AdminController::class, 'listUsers']);
        Route::get('/users/{id}', [AdminController::class, 'getUserDetails']);
        Route::patch('/users/{id}/verify', [AdminController::class, 'verifyUser']);
        Route::patch('/users/{id}/suspend', [AdminController::class, 'suspendUser']);

        // Products Management
        Route::get('/products/pending-verification', [AdminController::class, 'pendingProducts']);
        Route::patch('/products/{id}/verify', [AdminController::class, 'verifyProduct']);

        // Orders Management
        Route::get('/orders', [AdminController::class, 'allOrders']);
        Route::get('/orders/disputes', [AdminController::class, 'disputes']);
        Route::post('/orders/{id}/resolve-dispute', [AdminController::class, 'resolveDispute']);

        // Escrow Management
        Route::get('/escrow/transactions', [AdminController::class, 'allEscrowTransactions']);
        Route::post('/escrow/{id}/release', [AdminController::class, 'releaseEscrow']);
        Route::post('/escrow/{id}/refund', [AdminController::class, 'refundEscrow']);

        // Inspections
        Route::get('/inspections', [AdminController::class, 'allInspections']);
        Route::post('/inspections/assign', [AdminController::class, 'assignInspector']);

        // Shipping & Logistics
        Route::get('/shipments/manifest', [AdminController::class, 'generateManifest']);
        Route::post('/shipments/consolidate', [AdminController::class, 'consolidateShipments']);

        // Analytics & KPIs
        Route::get('/analytics/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/analytics/kpis', [AdminController::class, 'kpis']);
    });
});

// Webhooks (no auth, verified via signature)
Route::prefix('webhooks')->group(function () {
    Route::post('/stripe', [EscrowController::class, 'stripeWebhook']);
    Route::post('/paystack', [EscrowController::class, 'paystackWebhook']);
    Route::post('/logistics', [ShippingController::class, 'logisticsWebhook']);
});
