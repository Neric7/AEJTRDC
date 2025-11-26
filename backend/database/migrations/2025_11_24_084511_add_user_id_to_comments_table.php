<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ajouter la colonne user_id à la table comments
     */
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // Ajouter user_id après parent_id
            $table->foreignId('user_id')
                  ->nullable()
                  ->after('parent_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Index pour améliorer les performances
            $table->index('user_id');
        });
    }

    /**
     * Supprimer la colonne user_id
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};