<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GigCategory extends Model
{
    protected $fillable = ['name', 'description'];

    public function gigs() {
        return $this->hasMany(Gig::class);
    }

    public function notifications() {
        return $this->hasMany(NotificationPreference::class);
    }
}
