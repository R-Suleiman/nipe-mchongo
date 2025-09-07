<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ClickPesaService
{
    protected $baseUrl;
    protected $clientId;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.clickpesa.base_url');
        $this->clientId = config('services.clickpesa.client_id');
        $this->apiKey = config('services.clickpesa.api_key');
    }

    // Step 1: Get Access Token
    public function getAccessToken()
    {
        return Cache::remember('clickpesa_access_token', 3500, function () {
            Log::info('Fetching new ClickPesa access token', [
                'client_id' => $this->clientId,
                'base_url' => $this->baseUrl,
            ]);

            $response = Http::withHeaders([
                'client-id' => $this->clientId,
                'api-key' => $this->apiKey,
            ])->post("{$this->baseUrl}/third-parties/generate-token");

            if ($response->failed()) {
                Log::error('ClickPesa token request failed', [
                    'status' => $response->status(),
                    'response' => $response->json() ?? 'No response body',
                ]);
                throw new \Exception('Failed to retrieve ClickPesa access token: ' . ($response->json()['error'] ?? 'Unknown error'));
            }

            $responseData = $response->json();
            if (!isset($responseData['token'])) {
                Log::error('ClickPesa token response missing token field', ['response' => $responseData]);
                throw new \Exception('Invalid token response from ClickPesa');
            }

            $token = $responseData['token'];
            $token = str_replace('Bearer ', '', $token);
            Log::info('ClickPesa access token retrieved', ['token' => substr($token, 0, 10) . '...']); // Log partial token for security
            return $token;
        });
    }

    // Step 2: Preview USSD push req, check if payment method is available
    public function previewUssdPush(array $data)
    {
        try {
            $token = $this->getAccessToken();

            Log::info('ClickPesa preview USSD push request', [
                'url' => "{$this->baseUrl}/third-parties/payments/preview-ussd-push-request",
                'data' => $data,
                'token' => substr($token, 0, 10) . '...' // Partial token for security
            ]);

            $response = Http::withToken($token)
                ->post("{$this->baseUrl}/third-parties/payments/preview-ussd-push-request", [
                    'amount' => (string) $data['amount'],
                    'currency' => $data['currency'],
                    'orderReference' => $data['orderReference'],
                    'phoneNumber' => $data['phoneNumber'],
                    'fetchSenderDetails' => $data['fetchSenderDetails'] ?? false,
                    // 'checksum' => $data['checksum'] ?? '', // Uncomment if required (check docs)
                ]);

            if ($response->failed()) {
                $errorData = $response->json() ?? ['message' => 'Unknown error', 'status' => $response->status()];
                Log::error('ClickPesa preview USSD push failed:', $errorData);
                return [
                    'error' => true,
                    'message' => $errorData['message'] ?? 'Preview request failed',
                    'status' => $response->status(),
                ];
            }

            $responseData = $response->json();
            Log::info('ClickPesa preview USSD push response:', $responseData);

            // Ensure response has expected structure
            if (!is_array($responseData) || !isset($responseData['activeMethods'])) {
                Log::error('ClickPesa preview response missing activeMethods:', $responseData);
                return [
                    'error' => true,
                    'message' => 'Invalid response format from ClickPesa',
                    'status' => 500,
                ];
            }

            return $responseData; // Returns activeMethods and sender details
        } catch (\Exception $e) {
            Log::error('ClickPesa preview error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Server error: ' . $e->getMessage(),
                'status' => 500,
            ];
        }
    }

    public function initiateUssdPush(array $data)
    {
        try {
            $token = $this->getAccessToken();

            Log::info('ClickPesa initiate USSD push request', [
                'url' => "{$this->baseUrl}/third-parties/payments/initiate-ussd-push-request",
                'data' => $data,
                'token' => substr($token, 0, 10) . '...',
            ]);

            $response = Http::withToken($token)
                ->post("{$this->baseUrl}/third-parties/payments/initiate-ussd-push-request", [
                    'amount' => (string) $data['amount'],
                    'currency' => $data['currency'],
                    'orderReference' => $data['orderReference'],
                    'phoneNumber' => $data['phoneNumber'],
                    // 'checksum' => $data['checksum'] ?? '', // Uncomment if required
                ]);

            if ($response->failed()) {
                $errorData = $response->json() ?? ['message' => 'Unknown error', 'status' => $response->status()];
                Log::error('ClickPesa initiate USSD push failed', [
                    'status' => $response->status(),
                    'response' => $errorData,
                ]);
                return [
                    'error' => true,
                    'message' => $errorData['message'] ?? 'Payment initiation failed',
                    'status' => $response->status(),
                ];
            }

            $responseData = $response->json();
            Log::info('ClickPesa initiate USSD push response', ['response' => $responseData]);

            if (!is_array($responseData) || !isset($responseData['id']) || !isset($responseData['status'])) {
                Log::error('ClickPesa initiate response invalid format', ['response' => $responseData]);
                return [
                    'error' => true,
                    'message' => 'Invalid response format from ClickPesa',
                    'status' => 500,
                ];
            }

            return $responseData;
        } catch (\Exception $e) {
            Log::error('ClickPesa initiate error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Server error: ' . $e->getMessage(),
                'status' => 500,
            ];
        }
    }
}
