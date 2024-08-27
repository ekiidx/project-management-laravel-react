<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Proposal;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Erik',
            'email' => 'test@example.com',
            'password' => bcrypt('rootboy!'),
            'email_verified_at' => time(),
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'Kay',
            'email' => 'kay@example.com',
            'password' => bcrypt('rootboy!'),
            'email_verified_at' => time(),
            'role' => 'client'
        ]);

        User::factory()->create([
            'name' => 'Brian',
            'email' => 'brian@example.com',
            'password' => bcrypt('rootboy!'),
            'email_verified_at' => time(),
            'role' => 'client'
        ]);

        // Proposal::factory()->count(10)->create();
        // Invoice::factory()->count(10)->create();
        // Project::factory()->count(10)->hasTasks(4)->create();
    }
}
