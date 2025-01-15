<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Events\CurrencyUpdatedBroadcastEvent;
use App\Services\MonobankCurrencyService;

class UpdateMonobankCurrencyJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(MonobankCurrencyService $monobankCurrencyService): void
    {
        $error = $monobankCurrencyService->updateMonobankUpdatedCurrencies();
        $currencies = $monobankCurrencyService->getCachedMonobankCurrenciesAsArray();
        $lastUpdated = $monobankCurrencyService->getCachedMonobankLastUpdated();
        CurrencyUpdatedBroadcastEvent::dispatch($currencies, $lastUpdated, $error);
    }
}
