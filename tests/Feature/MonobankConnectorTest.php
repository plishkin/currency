<?php

namespace Tests\Feature;

use App\Connectors\MonobankCurrencyConnector;
use Tests\TestCase;

class MonobankConnectorTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_monobank_returns_a_successful_response()
    {
        $currencies = MonobankCurrencyConnector::getCurrencies();

        $this->assertIsArray($currencies);
        $this->assertNotEmpty($currencies);
        $currency = reset($currencies);
        $this->assertArrayHasKey('rateBuy', $currency);

        $currency = reset($currencies);
        $this->assertIsArray($currency);
        $this->assertArrayHasKey('currencyCodeA', $currency);
        $this->assertIsInt($currency['currencyCodeA']);
        $this->assertArrayHasKey('currencyCodeB', $currency);
        $this->assertIsInt($currency['currencyCodeB']);
        $this->assertArrayHasKey('date', $currency);
        $this->assertIsInt($currency['date']);
        $this->assertArrayHasKey('rateBuy', $currency);
        $this->assertIsNumeric($currency['rateBuy']);
        $this->assertArrayHasKey('rateSell', $currency);
        $this->assertIsNumeric($currency['rateSell']);
    }

    public function test_monobank_currency_returns_a_successful_response()
    {
        $response = $this->get('/currency');
        $response->assertStatus(200);
        $json = $response->json();

        $this->assertArrayHasKey('iso4217', $json);
        $iso4217 = $json['iso4217'];
        $this->assertIsArray($iso4217);
        $item = reset($iso4217);
        $this->assertIsArray($item);
        $this->assertCount(5, $item);

        $this->assertArrayHasKey('lastUpdated', $json);

        $this->assertArrayHasKey('currencies', $json);
        $currencies = $json['currencies'];
        $this->assertIsArray($currencies);
    }

}
