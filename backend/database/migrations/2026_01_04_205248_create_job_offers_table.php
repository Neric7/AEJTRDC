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
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->enum('type', ['CDI', 'CDD', 'Stage', 'Freelance'])->default('CDI');
            $table->string('location');
            $table->string('department');
            $table->text('description');
            $table->text('requirements')->nullable(); // JSON array
            $table->text('responsibilities')->nullable(); // JSON array
            $table->string('duration')->nullable(); // Pour CDD et Stages
            $table->date('deadline')->nullable(); // Date limite de candidature
            $table->enum('status', ['draft', 'published', 'closed', 'archived'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->integer('views')->default(0);
            $table->integer('applications_count')->default(0); // Nombre de candidatures
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};