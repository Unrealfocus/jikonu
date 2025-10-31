<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('inspection_fee', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->enum('status', [
                'pending_payment',
                'payment_confirmed',
                'processing',
                'awaiting_inspection',
                'ready_to_ship',
                'shipped',
                'delivered',
                'disputed',
                'resolved',
                'cancelled'
            ])->default('pending_payment');
            $table->text('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_zip');
            $table->string('shipping_country');
            $table->string('tracking_no')->unique();
            $table->boolean('request_inspection')->default(false);
            $table->timestamp('delivered_at')->nullable();
            $table->string('dispute_resolution')->nullable();
            $table->text('dispute_notes')->nullable();
            $table->timestamps();

            $table->index(['buyer_id', 'status']);
            $table->index(['seller_id', 'status']);
            $table->index('tracking_no');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
