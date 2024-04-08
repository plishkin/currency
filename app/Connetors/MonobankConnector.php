<?php

namespace App\Connetors;

class MonobankConnector
{

    private static string $url = 'https://api.monobank.ua/bank/currency';

    public static function getCurrencies(): bool|array
    {
        $content = @file_get_contents(self::$url);
        if ($content) {
            $currencies = json_decode($content, true);
            if (is_array($currencies)) {
                return $currencies;
            }
        }
        return false;
    }

}
