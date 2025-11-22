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
        Schema::table('news', function (Blueprint $table) {
            // Ajouter le champ images si inexistant
            if (!Schema::hasColumn('news', 'images')) {
                $table->json('images')->nullable()->after('image');
            }
            
            // Ajouter le champ category si inexistant
            if (!Schema::hasColumn('news', 'category')) {
                $table->string('category')->default('general')->after('images');
            }

            // Rendre excerpt nullable si pas déjà le cas
            if (Schema::hasColumn('news', 'excerpt')) {
                $table->text('excerpt')->nullable()->change();
            }

            // Rendre author nullable si pas déjà le cas
            if (Schema::hasColumn('news', 'author')) {
                $table->string('author', 100)->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            if (Schema::hasColumn('news', 'images')) {
                $table->dropColumn('images');
            }
            
            if (Schema::hasColumn('news', 'category')) {
                $table->dropColumn('category');
            }
        });
    }
};