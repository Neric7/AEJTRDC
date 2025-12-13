<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            [
                'name' => 'ONU FEMMES',
                'slug' => 'onu-femmes',
                'description' => 'Entité des Nations Unies pour l\'égalité des sexes et l\'autonomisation des femmes',
                'website' => 'https://www.unwomen.org',
                'type' => 'international',
                'status' => 'active',
                'featured' => true,
                'order' => 1,
                'logo' => 'partners/onu-femmes.png',
            ],
            [
                'name' => 'RFEGL',
                'slug' => 'rfegl',
                'description' => 'Réseau des Femmes pour la Gouvernance et le Leadership',
                'website' => null,
                'type' => 'national',
                'status' => 'active',
                'featured' => true,
                'order' => 2,
                'logo' => 'partners/rfegl.png',
            ],
            [
                'name' => 'UNHCR',
                'slug' => 'unhcr',
                'description' => 'Haut Commissariat des Nations Unies pour les réfugiés',
                'website' => 'https://www.unhcr.org',
                'type' => 'international',
                'status' => 'active',
                'featured' => true,
                'order' => 3,
                'logo' => 'partners/unhcr.png',
            ],
            [
                'name' => 'CARE',
                'slug' => 'care',
                'description' => 'Organisation humanitaire de lutte contre la pauvreté',
                'website' => 'https://www.care.org',
                'type' => 'international',
                'status' => 'active',
                'featured' => true,
                'order' => 4,
                'logo' => 'partners/care.png',
            ],
            [
                'name' => 'UNICEF',
                'slug' => 'unicef',
                'description' => 'Fonds des Nations Unies pour l\'enfance',
                'website' => 'https://www.unicef.org',
                'type' => 'international',
                'status' => 'active',
                'featured' => true,
                'order' => 5,
                'logo' => 'partners/unicef.png',
            ],
            [
                'name' => 'IFP',
                'slug' => 'ifp',
                'description' => 'Institut de Formation Professionnelle',
                'website' => null,
                'type' => 'local',
                'status' => 'active',
                'featured' => false,
                'order' => 6,
                'logo' => 'partners/ifp.png',
            ],
            [
                'name' => 'CONAFOHD',
                'slug' => 'conafohd',
                'description' => 'Conseil National des Femmes pour le Développement',
                'website' => null,
                'type' => 'national',
                'status' => 'active',
                'featured' => false,
                'order' => 7,
                'logo' => 'partners/conafohd.png',
            ],
            [
                'name' => 'MAEJT',
                'slug' => 'maejt',
                'description' => 'Mouvement Africain des Enfants et Jeunes Travailleurs',
                'website' => null,
                'type' => 'international',
                'status' => 'active',
                'featured' => false,
                'order' => 8,
                'logo' => 'partners/maejt.png',
            ],
        ];

        foreach ($partners as $partner) {
            Partner::updateOrCreate(
                ['slug' => $partner['slug']],
                $partner
            );
        }
    }
}