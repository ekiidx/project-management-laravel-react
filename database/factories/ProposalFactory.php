<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_name' => fake()->name(),
            'user_id' => 2,
            'product_name' => fake()->name(),
            'stripe_payment_link' => 'https://stripe.com',
            'client_email' => fake()->email(),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
