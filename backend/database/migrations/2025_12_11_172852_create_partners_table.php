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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('logo')->nullable(); // Logo principal
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->enum('type', ['national', 'international', 'local', 'gouvernemental', 'prive', 'ong'])->default('ong');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active');
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0); // Pour l'ordre d'affichage
            $table->json('social_links')->nullable(); // Réseaux sociaux
            $table->date('partnership_start')->nullable();
            $table->date('partnership_end')->nullable();
            $table->text('partnership_details')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes pour optimiser les requêtes
            $table->index('status');
            $table->index('type');
            $table->index('featured');
            $table->index('order');
            $table->index(['status', 'featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};