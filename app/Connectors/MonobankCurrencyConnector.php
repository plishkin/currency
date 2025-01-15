<?php

namespace App\Connectors;

use App\Models\Currency;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;
use App\Exceptions\CurrencyServerResponseException;

class MonobankCurrencyConnector extends AbstractCurrencyConnector
{

    protected string $url = 'https://api.monobank.ua/bank/currency';

    public function getResponse(array $queryParams = []): ResponseInterface
    {
        return $this->getClient()->get($this->url, [
            'query' => $queryParams
        ]);
    }

    /**
     * @return array
     * @throws CurrencyServerResponseException
     * @throws GuzzleException
     */
    public function getCurrenciesJson(): array
    {
        $response = $this->getResponse();
        $statusCode = $response->getStatusCode();
        $content = $response->getBody()->getContents();
        $json = json_decode($content);
        if ($statusCode !== 200) {
            throw new CurrencyServerResponseException(
                "Server \"{$this->url}\" failed with status code {$statusCode}",
                $statusCode
            );
        }
        return $json;
    }

    /**
     * @return Currency[]
     * @throws CurrencyServerResponseException
     * @throws GuzzleException
     */
    public function getCurrencies(): array
    {
        $json = $this->getCurrenciesJson();
        $currencies = [];
        foreach ($json as $currencyItem) {
            $currencies[] = $this->itemToCurrency($currencyItem);
        }
        return $currencies;
    }

    public function itemToCurrency(\stdClass $item): Currency
    {
        $currency = new Currency();
        $currency->fill((array)$item);
        return $currency;
    }
}
