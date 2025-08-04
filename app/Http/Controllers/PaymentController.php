<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Services\AzamPayService;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    protected $azamPay;

    public function __construct(AzamPayService $azamPay)
    {
        $this->azamPay = $azamPay;
    }

    public function buyMchongoPoints(Request $request)
    {
        $attributes = $request->validate([
            'user_id' => 'required|exists:users,id',
            'phone' => 'required',
            'amount' => 'required|numeric',
            'type' => 'required|string',
            'quantity' => 'required|integer',
        ]);

        if (!in_array($attributes['type'], ['posting', 'applying'])) {
            return response()->json(['error' => 'Invalid points type.'], 422);
        }

        $reference = 'POINTS_' . uniqid();
        $provider = 'Tigo';

        // make transaction
        $response = $this->azamPay->initiateMobileMoneyPayment(
            $request->amount,
            $request->phone,
            $provider,
            $reference
        );

        // save transaction ref
        $transaction = Transaction::create([
            'user_id' => $attributes['user_id'],
            'amount' => $attributes['amount'],
            'points_purchased' => $attributes['quantity'],
            'type' => $attributes['type'],
            'status' => 'pending',
            'reference' => $reference,
        ]);

        return response()->json($response);
    }

    public function azampayCallback(Request $request)
    {
        \Log::info('AzamPay Callback:', $request->all());

        $reference = $request->reference ?? null;
        $transactionStatus = $request->transactionstatus ?? null;

        if (!$reference || !$transactionStatus) {
            return response()->json(['error' => 'Invalid callback'], 400);
        }

        $transaction = Transaction::where('reference', $reference)->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }

        if ($transactionStatus == 'success') {
            $transaction->update([
                'status' => 'success',
                'transaction_id' => $request->transactionId,
            ]);

            $user = $transaction->user;

            $user->increment('mchongo_points', $transaction->points_purchased);

        } else {
            $transaction->update(['status' => 'failed']);
        }

        return response()->json(['message' => 'Callback handled', 'transaction' => $transaction]);
    }

}
