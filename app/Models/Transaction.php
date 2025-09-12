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
        'phone_number',
        'reference',
        'available_methods',
        'channel',
        'collected_amount',
        'customer_details',
        'failure_reason',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'collected_amount' => 'decimal:2',
        'available_methods' => 'array',  // If using JSON
        'customer_details' => 'array',  // If using JSON
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
