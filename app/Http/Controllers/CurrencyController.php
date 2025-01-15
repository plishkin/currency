<?php

namespace App\Http\Controllers;

use App\Services\MonobankCurrencyService;

class CurrencyController extends Controller
{
    public function cachedAction(MonobankCurrencyService $monobankCurrencyService): string
    {
        $currencies = $monobankCurrencyService->getCachedMonobankCurrenciesAsArray();
        $lastUpdated = $monobankCurrencyService->getCachedMonobankLastUpdated();

        return json_encode([
            'success' => (bool)$currencies,
            'currencies' => $currencies ?: [],
            'lastUpdated' => $lastUpdated,
        ]);
    }

    public function apiAction(MonobankCurrencyService $monobankCurrencyService): string
    {
        $error = $monobankCurrencyService->updateMonobankUpdatedCurrencies();
        $currencies = $monobankCurrencyService->getCachedMonobankCurrenciesAsArray();
        $lastUpdated = $monobankCurrencyService->getCachedMonobankLastUpdated();

        return json_encode([
            'success' => (bool)$currencies,
            'currencies' => $currencies ?: [],
            'lastUpdated' => $lastUpdated,
            'error' => $error,
        ]);
    }
}
