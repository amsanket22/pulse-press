<?php

namespace Tests\Unit;

use Tests\TestCase;

class NewsSearchTest extends TestCase
{
    /**
     * test endpoint if no keyword and query is passed
     */
    public function test_api_request_validation(): void
    {
        $endpoint = 'api/v1/search';
        $response = $this->get($endpoint);
        $response->assertStatus(404);
    }

    /**
     * test endpoint with invalid provider
     */
    public function test_api_request_validation_with_invalid_provider(): void
    {
        $endpoint = 'api/v1/search';
        $response = $this->get($endpoint . '/test-provider/hello', ['accept' => 'application/json']);
        $response->assertStatus(422);
    }

    /**
     * test endpoint with
     */
    public function test_successful_api_request(): void
    {
        $endpoint = 'api/v1/search';
        $response = $this->get($endpoint . '/guardian/hello', ['accept' => 'application/json']);
        $response->assertStatus(200);
    }
}
