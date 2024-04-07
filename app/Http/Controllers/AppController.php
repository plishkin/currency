<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
class AppController extends Controller
{
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
