<?php

namespace App\Http\Controllers;

use App\Services\MonobankCurrencyService;

class AppController extends Controller
{
    public function index()
    {
        return view('app');
    }

    public function currency(MonobankCurrencyService $monobankCurrencyService): string
    {
        $currencies = $monobankCurrencyService->getCachedMonobankCurrenciesAsArray();
        $lastUpdated = $monobankCurrencyService->getCachedMonobankLastUpdated();

        return json_encode([
            'success' => (bool)$currencies,
            'currencies' => $currencies ?: [],
            'lastUpdated' => $lastUpdated,
        ]);
    }
}
