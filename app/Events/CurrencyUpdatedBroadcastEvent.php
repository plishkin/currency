<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CurrencyUpdatedBroadcastEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param array $currencies
     * @param int $lastUpdated
     */
    public function __construct(
        private readonly array $currencies,
        private readonly int   $lastUpdated,
        private readonly ?string $error = null,
    )
    {
        //
    }

    public function broadcastOn(): Channel
    {
        return new Channel('currencies');
    }

    public function broadcastWith(): array
    {
        return [
            'success' => !$this->error,
            'currencies' => $this->currencies,
            'lastUpdated' => $this->lastUpdated,
            'error' => $this->error,
        ];
    }
}
