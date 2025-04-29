<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationStatus extends Model
{
    protected $fillable = ['name', 'description'];

    public function gigs() {
        return $this->hasMany(Gig::class);
    }
}
