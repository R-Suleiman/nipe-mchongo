<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Services\ClickPesaService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    protected $clickPesa;

    public function __construct(ClickPesaService $clickPesa)
    {
        $this->clickPesa = $clickPesa;
    }

    // preview and validate the payment methods
    public function previewUssdPush(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string',
            'phoneNumber' => 'required|string|regex:/^255[0-9]{9}$/',
            'amount' => 'required|numeric|min:100',
            'quantity' => 'required'
        ]);

        // Call ClickPesaService to make the preview request
        $referenceNumber = 'POINTS' . now()->format('YmdHis') . Str::upper(Str::random(6));
        $response = $this->clickPesa->previewUssdPush([
            'amount' => $validated['amount'],
            'currency' => 'TZS',
            'orderReference' => $referenceNumber,
            'phoneNumber' => $validated['phoneNumber'],
            'fetchSenderDetails' => false
        ]);

        if (isset($response['error']) && $response['error']) {
            return response()->json([
                'error' => $response['message'],
            ], $response['status'] ?? 500);
        }

        // Filter available payment methods
        $availableMethods = array_filter($response['activeMethods'] ?? [], function ($method) {
            return isset($method['status']) && $method['status'] === 'AVAILABLE' && isset($method['fee']);
        });

        // Extract unavailable methods and their error messages
        $unavailableMethods = array_filter($response['activeMethods'] ?? [], function ($method) {
            return !isset($method['status']) || $method['status'] !== 'AVAILABLE';
        });

        // Prepare user-friendly error messages for unavailable methods
        $unavailableMessages = [];
        foreach ($unavailableMethods as $method) {
            if (isset($method['name']) && isset($method['message'])) {
                $unavailableMessages[$method['name']] = $method['message'];
            }
        }

        // Check if any available methods exist
        if (empty($availableMethods)) {
            $errorMessage = !empty($unavailableMessages)
                ? 'No available payment methods. ' . implode('; ', $unavailableMessages)
                : 'No available payment methods for this phone number or amount.';
            return response()->json([
                'error' => $errorMessage,
            ], 400);
        }

        // Optionally, store validated details in DB for the next step (initiate payment)
        try {
            Transaction::create([
                'user_id' => $validated['user_id'],
                'amount' => $validated['amount'],
                'points_purchased' => (int) $validated['quantity'], // default
                'type' => $validated['type'],
                'phone_number' => $validated['phoneNumber'],
                'status' => 'previewed',
                'reference' => $referenceNumber,
                'available_methods' => json_encode($availableMethods),
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to store transaction: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to store transaction details',
            ], 500);
        }

        return response()->json([
            'message' => 'Payment details validated successfully.',
            'availableMethods' => array_values($availableMethods),
            'unavailableMessages' => $unavailableMessages, // For frontend guidance
            'reference' => $referenceNumber,
        ], 200);
    }

    public function initiateUssdPayment(Request $request)
    {
        $validated = $request->validate([
            'reference' => 'required|string|exists:transactions,reference',
            'phoneNumber' => 'required|string|regex:/^255[0-9]{9}$/',
            'amount' => 'required|numeric|min:100|max:3000000',
        ]);

        $transaction = Transaction::where('reference', $validated['reference'])->first();

        $response = $this->clickPesa->initiateUssdPush([
            'amount' => $validated['amount'],
            'currency' => 'TZS',
            'orderReference' => $validated['reference'],
            'phoneNumber' => $validated['phoneNumber'],
            // 'checksum' => '', // Add if required
        ]);

        if (isset($response['error']) && $response['error']) {
            return response()->json([
                'error' => $response['message'],
            ], $response['status'] ?? 500);
        }

        try {
            $transaction->update([
                'status' => $response['status'],
                'channel' => $response['channel'],
                'transaction_id' => $response['id'] ?? null,
                'payment_method' => $response['channel'],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update transaction: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to update transaction details',
            ], 500);
        }

        return response()->json([
            'message' => 'Payment initiated. Check your phone for USSD prompt.',
            'transaction_id' => $response['id'] ?? null,
        ], 200);
    }

    public function checkTransactionStatus($reference)
    {
        $transaction = Transaction::where('reference', $reference)->first();

        return response()->json([
            'status' => $transaction->status,
            'failure_reason' => $transaction->failure_reason,
        ], 200);
    }
}
