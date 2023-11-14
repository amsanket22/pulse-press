<?php

namespace App\Services;

interface NewsProviderService
{
    public function search(string $query);

    public function transform(array $data);
}
