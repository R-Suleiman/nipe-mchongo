<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table = 'statuses';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'description'];

    public function gigs()
    {
        return $this->hasMany(Gig::class);
    }
}
