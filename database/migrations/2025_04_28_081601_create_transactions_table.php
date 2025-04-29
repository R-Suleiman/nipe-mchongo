<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('transaction_id')->nullable();
            $table->integer('amount');
            $table->integer('points_purchased');
            $table->enum('type', ['posting', 'applying']);
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->string('payment_provider')->default('AzamPay');
            $table->string('reference')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
