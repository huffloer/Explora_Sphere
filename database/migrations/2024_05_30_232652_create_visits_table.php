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
        Schema::create('visits', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('url')->nullable()->change(); // Field for storing the URL
            $table->string('ip_address')->nullable()->change(); // Field for storing the IP address
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps(); // Fields for created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};