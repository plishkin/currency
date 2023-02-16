<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CurrencyUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var array */
    private $currency;

    /** @var int */
    private $lastUpdated;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($currency, $lastUpdated)
    {
        $this->currency = $currency;
        $this->lastUpdated = $lastUpdated;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel('currency');
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'currencies' => $this->currency,
            'lastUpdated' => $this->lastUpdated,
        ];
    }

}
