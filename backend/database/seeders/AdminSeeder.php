<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrateur',
            'email' => 'admin@soscongo.org',
            'password' => Hash::make('1090'), // Changez ce mot de passe !
            'role' => 'admin',
        ]);

        $this->command->info('✅ Admin créé avec succès !');
        $this->command->info('📧 Email: admin@soscongo.org');
        $this->command->info('🔑 Password: password');
    }
}