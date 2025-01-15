<?php

namespace App\Connectors;

use GuzzleHttp\Client;
use App\Models\Weather;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\GuzzleException;
use App\Exceptions\CurrencyServerResponseException;

abstract class AbstractCurrencyConnector
{
    protected string $url = '';

    public function __construct(
        private readonly Client $client,
    )
    {
    }

    public function getClient(): Client
    {
        return $this->client;
    }

    /**
     * @throws GuzzleException
     */
    abstract public function getResponse(array $queryParams = []): ResponseInterface;

    /**
     * @throws GuzzleException
     * @throws CurrencyServerResponseException
     */
    abstract public function getCurrencies(): array;

}
