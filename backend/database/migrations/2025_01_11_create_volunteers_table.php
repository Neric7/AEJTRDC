<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('volunteers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Congo');
            
            // Informations sur le bénévolat
            $table->string('interest_domain')->nullable(); // Domaine d'intérêt
            $table->text('skills')->nullable(); // Compétences
            $table->enum('availability', ['full_time', 'part_time', 'weekends', 'flexible'])->default('flexible');
            $table->text('message'); // Motivation
            
            // Fichiers
            $table->string('cv_path')->nullable();
            
            // Statut
            $table->enum('status', ['pending', 'accepted', 'rejected', 'in_progress'])->default('pending');
            $table->text('admin_notes')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('volunteers');
    }
};