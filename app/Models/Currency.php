<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    // Disable table usage
    protected $table = null;

    // Disable timestamps if not needed
    public $timestamps = false;

    // Prevent interaction with the database
    public function getConnectionName(): null
    {
        return null;
    }

    protected $fillable = [
        "currencyCodeA",
        "currencyCodeB",
        "date",
        "rateBuy",
        "rateSell"
    ];

    protected $visible = [
        "currencyCodeA",
        "currencyCodeB",
        "date",
        "rateBuy",
        "rateSell"
    ];

    protected $casts = [
        'currencyCodeA' => 'integer',
        'currencyCodeB' => 'integer',
        'date' => 'integer',
        'rateBuy' => 'float',
        'rateSell' => 'float',
    ];

}
