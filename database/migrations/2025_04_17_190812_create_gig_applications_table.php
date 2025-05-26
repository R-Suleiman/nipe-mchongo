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
        Schema::create('gig_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gig_poster_id')->constrained('users');
            $table->foreignId('gig_seeker_id')->constrained('users');
            $table->foreignId('gig_id')->constrained('gigs');
            $table->foreignId('status_id')->constrained('statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gig_applications');
    }
};
