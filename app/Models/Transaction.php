<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'transaction_id',
        'amount',
        'points_purchased',
        'type',
        'status',
        'payment_provider',
        'reference',
        'available_methods',
        'channel'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
