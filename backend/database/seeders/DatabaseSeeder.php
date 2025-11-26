<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            NewsSeeder::class,
            CommentSeeder::class,
            AdminSeeder::class,
            // TeamSeeder::class,
            // PartnerSeeder::class,
        ]);
        
        $this->command->info('Database seeded successfully!');
    }
}