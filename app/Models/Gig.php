<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gig extends Model
{
    protected $fillable = [
        'gig_poster_id',
        'gig_category_id',
        'title',
        'description',
        'location',
        'payment',
        'payment_frequency',
        'duration',
        'slots',
        'status_id'
    ];

    public function category() {
        return $this->belongsTo(GigCategory::class);
    }

    public function poster() {
        return $this->belongsTo(User::class, 'gig_poster_id');
    }

    public function applications() {
        return $this->hasMany(GigApplication::class, 'gig_id');
    }

    public function status() {
        return $this->belongsTo(ApplicationStatus::class);
    }
}
