<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('escrow_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->enum('payment_method', ['stripe', 'paystack']);
            $table->enum('payment_status', [
                'pending',
                'processing',
                'succeeded',
                'failed',
                'cancelled'
            ])->default('pending');
            $table->string('payment_intent_id')->nullable();
            $table->enum('status', [
                'escrow_hold',
                'ready_to_ship',
                'released',
                'refunded',
                'partial_refund'
            ])->default('escrow_hold');
            $table->timestamp('released_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
            $table->index('payment_intent_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('escrow_transactions');
    }
};
