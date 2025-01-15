<?php

namespace App\Console\Commands;

use App\Events\CurrencyUpdatedBroadcastEvent;
use App\Jobs\UpdateMonobankCurrencyJob;
use App\Models\Currency;
use Illuminate\Console\Command;

class UpdateCurrencyCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-currency';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function handle(): void
    {
        UpdateMonobankCurrencyJob::dispatch();
    }
}
