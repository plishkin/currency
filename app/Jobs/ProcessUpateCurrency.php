<?php

namespace App\Jobs;

use App\Connetors\MonobankConnector;
use App\Events\CurrencyUpdated;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class ProcessUpateCurrency implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $currencies = MonobankConnector::getCurrencies();
        if ($currencies) {
            Cache::put('currency', json_encode($currencies));
            Cache::put('lastUpdated', $time = time());
            CurrencyUpdated::dispatch($currencies, $time);
        }
    }

}
