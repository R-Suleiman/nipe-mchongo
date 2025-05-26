<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Console\Descriptor\ApplicationDescription;

class GigApplication extends Model
{
    protected $table = 'gig_applications';
    protected $fillable = [
        'gig_poster_id',
        'gig_seeker_id',
        'gig_id',
        'application_status_id',
    ];

    public function poster()
    {
        return $this->belongsTo(User::class, 'gig_poster_id');
    }

    public function seeker()
    {
        return $this->belongsTo(User::class, 'gig_seeker_id');
    }

    public function job()
    {
        return $this->hasOne(Gig::class, 'id', 'gig_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
