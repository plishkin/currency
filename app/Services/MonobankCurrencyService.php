<?php

namespace App\Services;

use App\Models\Currency;
use App\Helpers\CurrencyCodeHelper;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Cache;
use App\Connectors\MonobankCurrencyConnector;
use App\Exceptions\CurrencyServerResponseException;

class MonobankCurrencyService
{


    public function __construct(
        private readonly MonobankCurrencyConnector $monobankCurrencyConnector,
    )
    {

    }

    public function updateMonobankUpdatedCurrencies(): string
    {
        $currencies = [];
        $error = '';
        try {
            $currencies = $this->monobankCurrencyConnector->getCurrencies();
        } catch (CurrencyServerResponseException $e) {
            $message = $e->getMessage();
            $error = $message;
            report($e);
        } catch (GuzzleException $e) {
            $message = $e->getMessage();
            if ($e instanceof RequestException) {
                $content = $e->getResponse()?->getBody()?->getContents();
                if ($content) {
                    $json = json_decode($content);
                    $message = $json->errText ?: $message;
                }
            }
            $error = $message;
            report($e);
        }

        if ($currencies) {
            $this->setCachedMonobankCurrencies($currencies);
            $this->setCachedMonobankLastUpdated(time());
        }

        return $error;
    }

    /**
     * Loads standard numeric array of Currencies (each one as assoc array) from cache
     * @return array
     */
    public function getCachedMonobankCurrencyItems(): array
    {
        return json_decode(Cache::get('monobank_currencies'), true);
    }

    /**
     * Saves standard numeric array of Currencies (each one as assoc array) into cache
     * @param Currency[] $currencies
     * @return bool
     */
    public function setCachedMonobankCurrencies(array $currencies): bool
    {
        return Cache::put('monobank_currencies', json_encode($currencies));
    }

    public function getCachedMonobankLastUpdated(): int
    {
        return (int)Cache::get('monobank_lastUpdated');
    }

    public function setCachedMonobankLastUpdated(int $lastUpdated): bool
    {
        return Cache::put('monobank_lastUpdated', $lastUpdated);
    }

    public function getCachedMonobankCurrenciesAsArray(): array
    {
        $helper = new CurrencyCodeHelper();
        $helper->loadCodes();

        $currencyItems = $this->getCachedMonobankCurrencyItems() ?: [];

        $array = [];
        foreach ($currencyItems as $item) {
            $from = $helper->getName($item['currencyCodeA']);
            $to = $helper->getName($item['currencyCodeB']);

            // Ignore empty item names
            if (!$from || !$to) continue;

            $array[] = [
                'from' => $from,
                'to' => $to,
                'buy' => $item['rateBuy'] ?? null,
                'sell' => $item['rateSell'] ?? null,
                'date' => $item['date'] ?? null,
            ];
        }
        return $array;
    }

}
