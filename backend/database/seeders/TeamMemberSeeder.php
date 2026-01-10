<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        // Conseil d'Administration
        $conseilMembers = [
            [
                'full_name' => 'Dr. KYOMBA AMIMU AKILI',
                'category' => 'conseil_administration',
                'position' => 'Président',
                'role' => null,
                'email' => 'kyombaakili140@gmail.com',
                'phone' => '+243971677460',
                'bio' => 'Président du conseil d\'administration de CEFOD',
                'display_order' => 1,
            ],
            [
                'full_name' => 'Carine MWANYANGE',
                'category' => 'conseil_administration',
                'position' => 'Vice-présidente',
                'role' => null,
                'email' => 'carine.mwanyange@cefod.org',
                'phone' => null,
                'bio' => 'Vice-présidente du conseil d\'administration',
                'display_order' => 2,
            ],
            [
                'full_name' => 'BICWAHEBWA MAKELELE JERK',
                'category' => 'conseil_administration',
                'position' => 'Membre',
                'role' => 'Chargé de l\'éducation',
                'email' => 'makejerck@gmail.com',
                'phone' => '+243970256146',
                'bio' => 'Chargé de l\'éducation au conseil d\'administration',
                'display_order' => 3,
            ],
            [
                'full_name' => 'AKONKWA ZIHINDULA JULIEN',
                'category' => 'conseil_administration',
                'position' => 'Membre',
                'role' => 'Chargé des coopératives',
                'email' => 'akonkwazihindulaju@gmail.com',
                'phone' => null,
                'bio' => 'Chargé des coopératives au conseil d\'administration',
                'display_order' => 4,
            ],
            [
                'full_name' => 'ISHARA MULWALA ANDRE',
                'category' => 'conseil_administration',
                'position' => 'Membre',
                'role' => null,
                'email' => 'isharaandrea@gmail.com',
                'phone' => null,
                'bio' => 'Membre du conseil d\'administration',
                'display_order' => 5,
            ],
        ];

        // Coordination
        $coordinationMembers = [
            [
                'full_name' => 'MATONA NURU Emmanuel',
                'category' => 'coordination',
                'position' => 'Coordonnateur',
                'role' => null,
                'email' => 'nurmatona@gmail.com',
                'phone' => '+243995948132',
                'bio' => 'Coordonnateur de CEFOD',
                'display_order' => 1,
            ],
            [
                'full_name' => 'MWIBELECA TUSAMBE CESAR',
                'category' => 'coordination',
                'position' => 'Directeur de programme et projet',
                'role' => null,
                'email' => 'cesar.tusambe@cefod.org',
                'phone' => null,
                'bio' => 'Directeur de programme et projet',
                'display_order' => 2,
            ],
            [
                'full_name' => 'ALIMASI SHABANI JACQUES',
                'category' => 'coordination',
                'position' => 'Directeur administratif et financier',
                'role' => null,
                'email' => 'jacques.alimasi@cefod.org',
                'phone' => null,
                'bio' => 'Directeur administratif et financier',
                'display_order' => 3,
            ],
            [
                'full_name' => 'USHINDI BUCHAGUZI John',
                'category' => 'coordination',
                'position' => 'Comptable',
                'role' => null,
                'email' => 'john.ushindi@cefod.org',
                'phone' => null,
                'bio' => 'Comptable de CEFOD',
                'display_order' => 4,
            ],
            [
                'full_name' => 'CHUMA CHIRHUZA PROSPERE',
                'category' => 'coordination',
                'position' => 'Logisticien et agro-pastoral',
                'role' => null,
                'email' => 'chumacirhuzaprospere89@gmail.com',
                'phone' => null,
                'bio' => 'Logisticien et responsable agro-pastoral',
                'display_order' => 5,
            ],
            [
                'full_name' => 'MUGOLI',
                'category' => 'coordination',
                'position' => 'Trésorière',
                'role' => null,
                'email' => 'mugoli@cefod.org',
                'phone' => null,
                'bio' => 'Trésorière de CEFOD',
                'display_order' => 6,
            ],
            [
                'full_name' => 'KASHESHA Alain',
                'category' => 'coordination',
                'position' => 'Chargé de protection',
                'role' => null,
                'email' => 'alain.kashesha@cefod.org',
                'phone' => null,
                'bio' => 'Chargé de protection',
                'display_order' => 7,
            ],
            [
                'full_name' => 'Dr. KYOMBA AMIMU AKILI',
                'category' => 'coordination',
                'position' => 'Chargé de la santé',
                'role' => null,
                'email' => 'kyombaakili140@gmail.com',
                'phone' => '+243971677460',
                'bio' => 'Chargé de la santé',
                'display_order' => 8,
            ],
        ];

        // Create all members
        foreach (array_merge($conseilMembers, $coordinationMembers) as $member) {
            TeamMember::create($member);
        }
    }
}