<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subscriber_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('method');
            $table->string('status');
            $table->timestamp('payment_date');
            $table->string('subscription_plan');
            // Add other payment details as needed
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('subscriber_id')->references('id')->on('subscribers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};