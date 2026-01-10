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
        Schema::create('advocacy_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('theme', [
                'protection',
                'education',
                'health',
                'nutrition',
                'wash',
                'livelihoods',
                'climate',
                'governance'
            ]);
            $table->text('objective');
            $table->string('target_audience');
            $table->text('key_messages')->nullable();
            $table->text('activities')->nullable();
            $table->string('timeline')->nullable();
            $table->string('budget')->nullable();
            $table->string('partners')->nullable();
            $table->text('indicators')->nullable();
            $table->integer('progress')->default(0); // 0-100
            $table->enum('status', ['planning', 'ongoing', 'completed', 'on_hold'])->default('planning');
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
        Schema::dropIfExists('advocacy_campaigns');
    }
};