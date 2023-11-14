<?php

namespace App\Services;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Http;
use Throwable;

class NewsAPIService implements NewsProviderService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('news.news_api.api_key');
    }

    public function search($query)
    {
        try {
            $response = Http::get('https://newsapi.org/v2/everything', [
                'q'      => $query,
                'apiKey' => $this->apiKey
            ]);
            $response->throw();


            if ($response->json('status') !== 'ok') {
                throw new Exception('Invalid API Response');
            }
            return $this->transform($response->json('articles'));
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
        return $sections->groupBy('source.name')->map(function ($items) {
            return $items->map(function ($item) {
                $carbonDate = Carbon::parse($item['publishedAt']);
                $formattedDate = $carbonDate->format('d/m/Y');
                return [
                    'id' => $item['source']['id'],
                    'title' => $item['title'],
                    'url' => $item['url'],
                    'publicationDate' => $formattedDate,
                    'sectionName' => $item['source']['name'],
                    'source' => 'News API'

                ];
            });
        })->values()->toArray();
    }
}
