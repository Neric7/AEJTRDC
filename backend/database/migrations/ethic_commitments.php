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
        Schema::create('ethical_commitments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('category', [
                'principes_humanitaires',
                'protection',
                'safeguarding',
                'code_conduite',
                'normes_qualite',
                'environnement'
            ]);
            $table->text('description');
            $table->string('reference_documents')->nullable();
            $table->date('implementation_date')->nullable();
            $table->date('review_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->integer('order')->default(0)->comment('Ordre d\'affichage');
            $table->json('tags')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Index pour améliorer les performances
            $table->index('category');
            $table->index('is_active');
            $table->index('priority');
            $table->index(['order', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ethical_commitments');
    }
};