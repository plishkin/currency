<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CurrencyUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param array $currency
     * @param int $lastUpdated
     */
    public function __construct(
        private array $currency,
        private int   $lastUpdated,
    )
    {
        //
    }

    public function broadcastOn(): Channel
    {
        return new Channel('currency');
    }

    public function broadcastWith(): array
    {
        return [
            'currencies' => $this->currency,
            'lastUpdated' => $this->lastUpdated,
        ];
    }
}
