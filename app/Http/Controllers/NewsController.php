<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsRequest;
use App\Http\Resources\GuardianSectionResource;
use App\Http\Resources\NewsAPISectionResource;
use App\Http\Resources\NewsSectionResource;
use App\Services\GuardianNewsService;
use App\Services\NewsAPIService;

class NewsController extends Controller
{
    public function search(NewsRequest $request, string $keyword)
    {
        $guardianNews = resolve(GuardianNewsService::class)->search($keyword);

        $newsApiNews = resolve(NewsAPIService::class)->search($keyword);

        return response()->json(array_merge($guardianNews, $newsApiNews));
    }
}
