<?php

namespace App\Helpers;

class CurrencyCodeHelper
{
    private array $codes = [];

    public function loadCodes(): void
    {
        $this->codes = [];
        $iso4217 = config('iso4217');
        foreach ($iso4217 as $code) {
            if (!isset($code[3])) {
                continue;
            }
            $this->codes[$code[3]] = $code[2];
        }
    }

    public function getName(int $code): string
    {
        return $this->codes[$code] ?? '';
    }
}
