<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CurrencyController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index']);
Route::prefix('currency')->controller(CurrencyController::class)->group(function () {
    Route::get('/api', 'apiAction');
    Route::get('/cached', 'cachedAction');
});
