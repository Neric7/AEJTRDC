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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->text('objective'); // Objectif du projet
            $table->string('execution_zone'); // Zone d'exécution
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', ['planning', 'ongoing', 'completed', 'suspended'])->default('planning');
            
            // Résultats obtenus (tableau de résultats textuels)
            $table->json('results')->nullable();
            
            // Indicateurs (tableau d'objets avec label, value, unit)
            $table->json('indicators')->nullable();
            
            // Témoignages (tableau d'objets avec name, role, message, photo)
            $table->json('testimonials')->nullable();
            
            $table->string('image')->nullable(); // Image principale
            $table->json('images')->nullable(); // Images supplémentaires (galerie)
            
            $table->foreignId('domain_id')->nullable()->constrained('domains')->onDelete('set null');
            $table->json('partners')->nullable(); // Liste des partenaires
            $table->decimal('budget', 15, 2)->nullable();
            $table->integer('beneficiaries_count')->default(0);
            $table->boolean('featured')->default(false); // Projet mis en avant
            $table->integer('views')->default(0); // Nombre de vues
            $table->integer('order')->default(0); // Ordre d'affichage
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes pour optimiser les requêtes
            $table->index('status');
            $table->index('domain_id');
            $table->index('featured');
            $table->index('order');
            $table->index(['status', 'featured']);
            $table->index('start_date');
            $table->index('end_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};