<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return view('app');
    }

    public function currency()
    {
        $currencies = json_decode(Cache::get('currency'), true);

        return json_encode([
            'currencies' => $currencies ?: [],
            'iso4217' => config('iso4217'),
            'lastUpdated' => Cache::get('lastUpdated'),
        ]);
    }

}
