<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsRequest;
use App\Http\Resources\NewsSectionResource;

class NewsController extends Controller
{
    public function search(NewsRequest $request, string $provider, string $keyword)
    {
        //Dynamic Class Name
        $providerClass = "App\\Services\\" . ucfirst($provider) . "NewsService";
        if (class_exists($providerClass)) {
            $newsProviderService = resolve($providerClass);
            $data = $newsProviderService->search($keyword);
            $newsSections = new NewsSectionResource(collect($data['results']));
            return response()->json($newsSections);
        } else {
            return response()->json(['error' => 'Invalid news provider'], 400);
        }
    }
}
