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
            DomainSeeder::class,
            ProjectSeeder::class,
            JobSeeder::class,
            PartnerSeeder::class,
            // TeamSeeder::class,
        ]);
        
        $this->command->info('Database seeded successfully!');
    }
}