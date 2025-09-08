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
            $table->decimal('collected_amount', 10, 2)->nullable();
            $table->string('collected_currency')->nullable();
            $table->integer('points_purchased');
            $table->enum('type', ['posting', 'applying']);
            $table->enum('status', ['PROCESSING', 'SUCCESS', 'FAILED', 'PREVIEWED', 'SETTLED'])->default('pending');
            $table->string('reference')->nullable();
            $table->json('available_methods')->nullable();
            $table->string('channel')->nullable();
            $table->string('failure_reason')->nullable();
            $table->json('customer_details')->nullable();
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
