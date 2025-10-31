<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shipping_quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->decimal('weight', 8, 2);
            $table->string('destination');
            $table->decimal('price', 10, 2);
            $table->string('tracking_id')->nullable()->unique();
            $table->enum('status', [
                'pending',
                'ready_to_ship',
                'in_transit',
                'customs',
                'out_for_delivery',
                'delivered'
            ])->default('pending');
            $table->string('current_location')->nullable();
            $table->timestamp('estimated_delivery')->nullable();
            $table->enum('service_level', ['standard', 'express'])->default('standard');
            $table->timestamps();

            $table->index('order_id');
            $table->index('tracking_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shipping_quotes');
    }
};
