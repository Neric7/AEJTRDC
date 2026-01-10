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
        Schema::create('humanitarian_alerts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('alert_type', [
                'natural_disaster',
                'conflict',
                'epidemic',
                'food_insecurity',
                'displacement',
                'infrastructure',
                'other'
            ]);
            $table->enum('severity', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->string('location');
            $table->string('affected_population')->nullable();
            $table->text('description');
            $table->text('needs_identified')->nullable();
            $table->text('response_actions')->nullable();
            $table->string('contact_person');
            $table->string('contact_phone');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('humanitarian_alerts');
    }
};