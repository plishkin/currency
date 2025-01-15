<?php

namespace Tests\Feature;

use App\Connectors\MonobankCurrencyConnector;
use App\Exceptions\WeatherServerResponseException;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Tests\TestCase;

class MonobankConnectorTest extends TestCase
{

    public function test_monobank_returns_a_successful_response()
    {
        /** @var MonobankCurrencyConnector $connector */
        $connector = $this->app->make(MonobankCurrencyConnector::class);

        $response = null;
        try {
            $response = $connector->getResponse();
        } catch (GuzzleException $e) {
            if ($e instanceof RequestException) {
                $contents = $e->getResponse()?->getBody()?->getContents();
                if ($contents) {
                    $errorJson = json_decode($contents);
                    if ($errorJson->message) {
                        $this->fail($errorJson->message);
                    }
                }
            }
            $this->fail($e->getMessage());
        }
        $this->assertEquals(200, $response?->getStatusCode());
    }

}
