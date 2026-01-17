<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intervention_zones', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nom de la ville (Bukavu, Uvira, etc.)
            $table->enum('type', ['headquarters', 'branch', 'extension'])->default('extension'); 
            // headquarters = Siège, branch = Antenne provinciale, extension = Extension locale
            $table->string('province'); // Sud-Kivu, Nord-Kivu, etc.
            $table->year('year_established'); // Année d'installation
            $table->text('address'); // Adresse complète
            $table->string('phone')->nullable(); // Téléphone
            $table->string('email')->nullable(); // Email
            $table->decimal('latitude', 10, 7); // Latitude GPS
            $table->decimal('longitude', 10, 7); // Longitude GPS
            $table->string('color')->default('#2563EB'); // Couleur du marqueur
            $table->text('description')->nullable(); // Description optionnelle
            $table->json('projects')->nullable(); // Liste des projets actifs dans cette zone
            $table->boolean('is_active')->default(true); // Actif/Inactif
            $table->integer('order')->default(0); // Ordre d'affichage
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intervention_zones');
    }
};