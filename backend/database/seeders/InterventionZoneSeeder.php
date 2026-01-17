<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InterventionZone;

class InterventionZoneSeeder extends Seeder
{
    public function run(): void
    {
        $zones = [
            [
                'name' => 'Bukavu',
                'type' => 'headquarters',
                'province' => 'Sud-Kivu',
                'year_established' => 2006,
                'address' => 'Ibanda/Panzi, AV. Jean Miruho',
                'phone' => '+243 995 948 132',
                'email' => 'aejtrdcongoa@gmail.com',
                'latitude' => -2.5085,
                'longitude' => 28.8473,
                'color' => '#DC2626',
                'description' => 'Siège national de l\'AEJT-RDC, centre de coordination de toutes les activités.',
                'projects' => ['Protection de l\'enfance', 'Éducation inclusive', 'AVEC', 'Santé communautaire'],
                'is_active' => true,
                'order' => 1
            ],
            [
                'name' => 'Kavumu',
                'type' => 'extension',
                'province' => 'Sud-Kivu',
                'year_established' => 2023,
                'address' => 'Groupement Bugore, Village Mushunguri, AV. Karanda',
                'phone' => null,
                'email' => null,
                'latitude' => -2.3167,
                'longitude' => 28.7333,
                'color' => '#2563EB',
                'description' => 'Extension récente axée sur l\'agriculture et l\'éducation.',
                'projects' => ['Agriculture durable', 'Alphabétisation', 'AVEC'],
                'is_active' => true,
                'order' => 2
            ],
            [
                'name' => 'Uvira',
                'type' => 'branch',
                'province' => 'Sud-Kivu',
                'year_established' => 2008,
                'address' => 'Commune Kavimvira, Quartier Kavimvira, AV. Mahi ya moto',
                'phone' => null,
                'email' => null,
                'latitude' => -3.3915,
                'longitude' => 29.1378,
                'color' => '#059669',
                'description' => 'Antenne provinciale frontalière, active dans l\'éducation et le sport.',
                'projects' => ['Éducation inclusive', 'Agriculture', 'Sport pour enfants', 'Stop Choléra'],
                'is_active' => true,
                'order' => 3
            ],
            [
                'name' => 'Goma',
                'type' => 'branch',
                'province' => 'Nord-Kivu',
                'year_established' => 2010,
                'address' => 'Quartier Katindo, AV. Masisi',
                'phone' => null,
                'email' => null,
                'latitude' => -1.6792,
                'longitude' => 29.2228,
                'color' => '#7C3AED',
                'description' => 'Antenne provinciale dans la capitale du Nord-Kivu.',
                'projects' => ['Protection', 'Éducation', 'Santé communautaire'],
                'is_active' => true,
                'order' => 4
            ],
            [
                'name' => 'Idjwi',
                'type' => 'extension',
                'province' => 'Sud-Kivu',
                'year_established' => 2012,
                'address' => 'Groupement Nyakalengwa, Village Mugote, Chefferie Ntambuka',
                'phone' => null,
                'email' => null,
                'latitude' => -2.1667,
                'longitude' => 29.0333,
                'color' => '#F59E0B',
                'description' => 'Zone insulaire axée sur l\'agriculture et l\'environnement.',
                'projects' => ['Agriculture', 'Environnement', 'AVEC'],
                'is_active' => true,
                'order' => 5
            ],
            [
                'name' => 'Kalemie',
                'type' => 'branch',
                'province' => 'Tanganyika',
                'year_established' => 2016,
                'address' => 'Commune Lukuga, Quartier Kahite, AV. Trico',
                'phone' => null,
                'email' => null,
                'latitude' => -5.9475,
                'longitude' => 29.1944,
                'color' => '#10B981',
                'description' => 'Antenne provinciale dans la province du Tanganyika.',
                'projects' => ['Protection', 'Éducation', 'Santé'],
                'is_active' => true,
                'order' => 6
            ],
            [
                'name' => 'Moba',
                'type' => 'extension',
                'province' => 'Tanganyika',
                'year_established' => 2018,
                'address' => 'Quartier Regeza, AV. Songola',
                'phone' => null,
                'email' => null,
                'latitude' => -7.0333,
                'longitude' => 29.7333,
                'color' => '#EC4899',
                'description' => 'Extension locale dans une zone rurale du Tanganyika.',
                'projects' => ['Agriculture', 'AVEC', 'Protection de l\'enfance'],
                'is_active' => true,
                'order' => 7
            ],
            [
                'name' => 'Kinshasa',
                'type' => 'branch',
                'province' => 'Kinshasa',
                'year_established' => 2020,
                'address' => 'Commune de Lemba, Quartier Molo, AV. Kadjeke',
                'phone' => null,
                'email' => null,
                'latitude' => -4.3276,
                'longitude' => 15.3136,
                'color' => '#8B5CF6',
                'description' => 'Représentation dans la capitale de la RDC.',
                'projects' => ['Plaidoyer', 'Protection', 'Éducation'],
                'is_active' => true,
                'order' => 8
            ]
        ];

        foreach ($zones as $zone) {
            InterventionZone::create($zone);
        }
    }
}