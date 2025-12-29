<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class WebhookController extends Controller
{
    public function handleClickPesaPaymentStatus(Request $request)
    {
        // Log raw payload for debugging
        $rawPayload = $request->all();
        Log::info('ClickPesa webhook received', [
            'payload' => $rawPayload,
            'headers' => $request->headers->all(),
        ]);

        // Comprehensive validation for all relevant fields
        try {
            $payload = $request->validate([
                'event' => 'sometimes|required|string|in:PAYMENT RECEIVED,PAYMENT FAILED',
                'eventType' => 'sometimes|string|in:PAYMENT RECEIVED,PAYMENT FAILED',
                'data' => 'required|array',
                'data.orderReference' => 'required|string',
                'data.status' => 'required|string|in:SUCCESS,FAILED',
                'data.clientId' => 'sometimes|string',
                'data.message' => 'sometimes|string', // Failure message
                'data.channel' => 'sometimes|string', // e.g., TIGO-PESA
                'data.paymentId' => 'sometimes|string', // Success case
                'data.id' => 'sometimes|string', // Failure case
                'data.collectedAmount' => 'sometimes|numeric', // Success case
                'data.collectedCurrency' => 'sometimes|string', // Success case
                'data.createdAt' => 'sometimes|string', // ISO timestamp
                'data.updatedAt' => 'sometimes|string', // ISO timestamp
                'data.customer' => 'sometimes|array', // Customer details
                'data.customer.customerName' => 'sometimes|string',
                'data.customer.customerPhoneNumber' => 'sometimes|string',
            ], [
                'data.orderReference.required' => 'Missing orderReference in webhook data.',
                'data.status.required' => 'Missing status in webhook data.',
            ]);
            Log::info('Validation passed successfully', [
                'data_keys' => array_keys($payload['data']),
                'customer_keys' => isset($payload['data']['customer']) ? array_keys($payload['data']['customer']) : 'NO CUSTOMER',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('ClickPesa webhook validation partial failure', [
                'errors' => $e->errors(),
                'payload' => $rawPayload,
            ]);
            $payload = $rawPayload; // Fallback to raw payload
        }

        $data = $payload['data'] ?? [];
        $event = $payload['event'] ?? $payload['eventType'] ?? null;
        $status = $data['status'] ?? null;

        // Log extracted data for debugging
        Log::info('Extracted webhook data', [
            'event' => $event,
            'status' => $status,
            'orderReference' => $data['orderReference'] ?? 'MISSING',
            'message' => $data['message'] ?? 'NO MESSAGE',
            'channel' => $data['channel'] ?? 'NO CHANNEL',
            'customer' => $data['customer'] ?? 'NO CUSTOMER',
            'data_keys' => is_array($data) ? array_keys($data) : 'NOT AN ARRAY',
        ]);

        // Early exit if missing core data
        if (empty($data['orderReference']) || empty($status)) {
            Log::error('ClickPesa webhook missing core data', ['payload' => $rawPayload]);
            return response()->json(['status' => 'received'], 200);
        }

        // Verify clientId if present
        if (isset($data['clientId']) && $data['clientId'] !== config('services.clickpesa.client_id')) {
            Log::warning('ClickPesa webhook invalid clientId', ['clientId' => $data['clientId']]);
            return response()->json(['status' => 'received'], 200);
        }

        // Find transaction by orderReference
        $transaction = Transaction::where('reference', $data['orderReference'])->first();
        if (!$transaction) {
            Log::error('ClickPesa webhook transaction not found', ['orderReference' => $data['orderReference']]);
            return response()->json(['status' => 'received'], 200);
        }

        // Skip if already processed (prevent duplicates)
        if (in_array($transaction->status, ['SUCCESS', 'FAILED'])) {
            Log::info('ClickPesa webhook duplicate for already processed transaction', [
                'orderReference' => $data['orderReference'],
                'current_status' => $transaction->status,
            ]);
            return response()->json(['status' => 'received'], 200);
        }

        try {
            DB::beginTransaction();

            if ($status === 'SUCCESS') {
                Log::info('Processing SUCCESS webhook', [
                    'orderReference' => $data['orderReference'],
                    'collectedAmount' => $data['collectedAmount'] ?? 'NOT PRESENT',
                ]);
                $transaction->update([
                    'status' => 'SUCCESS',
                    'transaction_id' => $data['paymentId'] ?? $data['id'] ?? $transaction->transaction_id,
                    'channel' => $data['channel'] ?? $transaction->channel,
                    'failure_reason' => null,
                    'collected_amount' => isset($data['collectedAmount']) ? (float) $data['collectedAmount'] : null,
                    'collected_currency' => $data['collectedCurrency'] ?? 'TZS',
                    'customer_details' => json_encode($data['customer'] ?? []),
                    'created_at' => isset($data['createdAt']) ? date('Y-m-d H:i:s', strtotime($data['createdAt'])) : $transaction->created_at,
                    'updated_at' => isset($data['updatedAt']) ? date('Y-m-d H:i:s', strtotime($data['updatedAt'])) : $transaction->updated_at,
                ]);

                // Increment user's mchongo_points
                $user = User::find($transaction->user_id);
                if ($user && $transaction->points_purchased > 0) {
                    $user->increment('mchongo_points', $transaction->points_purchased);
                    Log::info('User mchongo_points updated on success', [
                        'user_id' => $user->id,
                        'points_added' => $transaction->points_purchased,
                        'new_total' => $user->mchongo_points,
                    ]);
                } else {
                    Log::warning('No points to add or user not found', [
                        'user_id' => $transaction->user_id ?? null,
                        'points_purchased' => $transaction->points_purchased ?? 0,
                    ]);
                }
            } elseif ($status === 'FAILED') {
                Log::info('Processing FAILED webhook', [
                    'orderReference' => $data['orderReference'],
                    'message' => $data['message'] ?? 'NO MESSAGE',
                    'customer' => $data['customer'] ?? 'NO CUSTOMER',
                ]);
                $transaction->update([
                    'status' => 'FAILED', // Match frontend polling
                    'transaction_id' => $data['id'] ?? $data['paymentId'] ?? $transaction->transaction_id,
                    'channel' => $data['channel'] ?? $transaction->channel,
                    'failure_reason' => $data['message'] ?? 'Unknown error',
                    'customer_details' => json_encode($data['customer'] ?? []),
                    'created_at' => isset($data['createdAt']) ? date('Y-m-d H:i:s', strtotime($data['createdAt'])) : $transaction->created_at,
                    'updated_at' => isset($data['updatedAt']) ? date('Y-m-d H:i:s', strtotime($data['updatedAt'])) : $transaction->updated_at,
                ]);
                Log::info('Transaction marked as failed', [
                    'orderReference' => $data['orderReference'],
                    'failure_reason' => $transaction->fresh()->failure_reason,
                    'channel' => $transaction->fresh()->channel,
                    'customer_details' => $transaction->fresh()->customer_details,
                ]);
            } else {
                Log::warning('ClickPesa webhook unknown status', [
                    'status' => $status,
                    'orderReference' => $data['orderReference'],
                ]);
            }

            DB::commit();
            Log::info('ClickPesa webhook processed successfully', [
                'orderReference' => $data['orderReference'],
                'status' => $status,
                'event' => $event,
                'channel' => $data['channel'] ?? null,
                'message' => $data['message'] ?? null,
                'customer' => $data['customer'] ?? null,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('ClickPesa webhook processing failed', [
                'orderReference' => $data['orderReference'],
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'data' => $data,
            ]);
        }

        // Always return 200 to acknowledge receipt
        return response()->json(['status' => 'received'], 200);
    }
}
