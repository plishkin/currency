<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServicesCheckTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_the_application_is_alive()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
