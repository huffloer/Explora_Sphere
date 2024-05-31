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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->string('author')->nullable();
            $table->timestamp('published_date')->nullable();
            $table->string('imgurl')->nullable()->default(NULL); // corrected default value
            $table->foreignId('sub_category_id')->nullable()->constrained('subcategories'); // removed onDelete('set null')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};