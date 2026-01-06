<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Supprimer la contrainte unique sur l'email
        Schema::table('volunteers', function (Blueprint $table) {
            $table->dropUnique(['email']);
        });
    }

    public function down(): void
    {
        // Remettre la contrainte unique si on rollback
        Schema::table('volunteers', function (Blueprint $table) {
            $table->unique('email');
        });
    }
};