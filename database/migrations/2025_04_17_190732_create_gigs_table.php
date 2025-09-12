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
        Schema::create('gigs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gig_poster_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('gig_category_id')->constrained('gig_categories')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->integer('payment')->nullable();
            $table->string('payment_frequency')->nullable();
            $table->string('duration')->nullable();
            $table->integer('slots');
            $table->foreignId('status_id')->constrained('statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gigs');
    }
};
