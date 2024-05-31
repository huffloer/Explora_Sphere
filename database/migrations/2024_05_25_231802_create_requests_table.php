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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->enum('request_type', ['Ajout', 'Modification']);
            $table->string('document_title')->nullable();
            $table->string('document_author')->nullable();
            $table->text('description')->nullable()->default('');
            $table->enum('status', ['En attente', 'Aprouvée', 'Refusée'])->default('En attente');
            $table->foreignId('requester_id')->nullable()->constrained('subscribers')->cascadeOnDelete();
            $table->foreignId('document_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};