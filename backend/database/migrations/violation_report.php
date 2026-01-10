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
        Schema::create('violation_reports', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique(); // VR-2024-001
            $table->enum('category', [
                'safeguarding',
                'corruption',
                'discrimination',
                'harassment',
                'fraud',
                'misconduct',
                'other'
            ]);
            $table->string('title');
            $table->text('description');
            $table->enum('reporter_type', ['anonymous', 'staff', 'beneficiary', 'partner', 'other']);
            $table->string('reporter_info')->nullable();
            $table->string('location');
            $table->date('incident_date');
            $table->date('reported_date');
            $table->enum('status', ['pending', 'investigating', 'resolved', 'closed'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->string('assigned_to')->nullable();
            $table->text('actions_taken')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violation_reports');
    }
};