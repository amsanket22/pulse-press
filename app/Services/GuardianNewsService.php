<?php

namespace App\Services;

use Carbon\Carbon;
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
            return $this->transform($data['results']);
        } catch (Throwable $th) {
            return [
                'error' => 'API request failed',
                'message' => $th->getMessage(),
            ];
        }
    }

    public function transform(array $data)
    {
        $sections = collect($data);
        return $sections->groupBy('sectionName')->map(function ($items) {
            return $items->map(function ($item) {
                $carbonDate = Carbon::parse($item['webPublicationDate']);
                $formattedDate = $carbonDate->format('d/m/Y');
                return [
                    'id' => $item['id'],
                    'title' => $item['webTitle'],
                    'url' => $item['webUrl'],
                    'publicationDate' => $formattedDate,
                    'sectionName' => $item['sectionName'],
                    'source' => 'Guardian'
                ];
            });
        })->values()->toArray();
    }
}
