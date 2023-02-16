<?php

namespace App\Console\Commands;

use App\Jobs\ProcessUpateCurrency;
use Illuminate\Console\Command;

class UpdateCurrency extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'currency:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Currency';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        ProcessUpateCurrency::dispatch();
        return 0;
    }
}
