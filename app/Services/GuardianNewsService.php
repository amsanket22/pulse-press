<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Throwable;

class GuardianNewsService implements NewsProviderService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('news.guardian.api_key');
    }

    public function search($query)
    {
        try {
            $response = Http::get('https://content.guardianapis.com/search', [
                'q'      => $query,
                'api-key' => $this->apiKey,
                'page-size' => 20
            ]);
            $response->throw();

            $data = $response->json('response');
            if ($data && $data['status'] !== 'ok') {
                throw new Exception('Invalid API Response');
            }
            return $data;
        } catch (Throwable $th) {
            return [
                'error' => 'API request failed',
                'message' => $th->getMessage(),
            ];
        }
    }
}
