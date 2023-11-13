<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $carbonDate = Carbon::parse($this['webPublicationDate']);

        // Format the date as DD/MM/YYYY
        $formattedDate = $carbonDate->format('d/m/Y');
        return [
            'id' => $this['id'],
            'title' => $this['webTitle'],
            'url' => $this['webUrl'],
            'publicationDate' => $formattedDate,
            'sectionName' => $this['sectionName']
            // Add other properties as needed
        ];
    }
}
