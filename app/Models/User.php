<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'email',
        'phone',
        'dob',
        'address',
        'gender',
        'password',
        'mchongo_points',
        'profile_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function gigs()
    {
        return $this->hasMany(Gig::class, 'gig_poster_id');
    }

    public function posterApplications() {
        return $this->hasMany(GigApplication::class, 'gig_poster_id');
    }

    public function seekerApplications()
    {
        return $this->hasMany(GigApplication::class, 'gig_seeker_id');
    }

    public function subscriptions()
    {
        return $this->hasMany(NotificationPreference::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
