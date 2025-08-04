<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AzamPayService
{
    protected $clientId;
    protected $clientSecret;
    protected $baseUrl;

    public function __construct()
    {
        $this->clientId = env('AZAMPAY_CLIENT_ID');
        $this->clientSecret = env('AZAMPAY_CLIENT_SECRET');
        $this->baseUrl = env('AZAMPAY_BASE_URL');
    }

    // Step 1: Get Access Token
    public function getAccessToken()
    {
        $authUrl = env('AZAMPAY_AUTH_URL');
        $response = Http::post("{$authUrl}/AppRegistration/GenerateToken", [
            'appName' => 'Small Gigs', // name used during registration
            'clientId' => $this->clientId,
            'clientSecret' => $this->clientSecret,
        ]);

        return $response->json()['data']['accessToken'] ?? null;
    }

    // Step 2: Initiate MNO payment (normal phone number)
    public function initiateMobileMoneyPayment($amount, $phone, $provider, $referenceId)
    {
        $token = $this->getAccessToken();
        if (!$token) {
            return ['error' => 'Failed to authenticate'];
        }

        $payload = [
            'accountNumber' => $phone,
            'amount' => $amount,
            'currency' => 'TZS',
            'externalId' => $referenceId,
            'provider' => $provider
        ];

        $response = Http::withHeaders([
            'Content-Type'=> 'application/json',
            'Authorization' => 'Bearer ' . $token,
            'X-API-KEY' => $this->clientId,
        ])
        ->post("{$this->baseUrl}/azampay/mno/checkout", $payload);

        // log response
        \Log::info('AzamPay Payment Response:', $response->json());

        return $response->json();
    }
}
