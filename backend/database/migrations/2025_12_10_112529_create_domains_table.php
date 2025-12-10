<?php
// database/migrations/2025_01_03_create_domains_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->text('description_courte');
            $table->json('contenu'); // Array de paragraphes
            $table->string('icon')->nullable(); // Nom de l'icône
            $table->integer('ordre')->default(0); // Pour l'ordre d'affichage
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};