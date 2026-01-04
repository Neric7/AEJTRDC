<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobOffer;
use Carbon\Carbon;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Coordinateur de Projet',
                'type' => 'CDI',
                'location' => 'Kinshasa',
                'department' => 'Programmes',
                'description' => 'Nous recherchons un coordinateur expérimenté pour superviser nos projets de santé communautaire dans la région de Kinshasa. Le candidat idéal aura une solide expérience en gestion de projet dans le secteur humanitaire.',
                'requirements' => [
                    'Diplôme universitaire en gestion de projet, santé publique ou équivalent',
                    '5 ans d\'expérience minimum dans le secteur humanitaire',
                    'Excellentes compétences en communication et en leadership',
                    'Maîtrise du français et de l\'anglais',
                    'Capacité à travailler sous pression',
                ],
                'responsibilities' => [
                    'Coordonner les activités du projet et superviser l\'équipe',
                    'Gérer le budget et les ressources du projet',
                    'Assurer le reporting régulier aux bailleurs de fonds',
                    'Maintenir les relations avec les partenaires locaux',
                    'Garantir la qualité et l\'impact des interventions',
                ],
                'deadline' => Carbon::now()->addMonths(2),
                'status' => 'published',
                'featured' => true,
                'published_at' => Carbon::now(),
                'views' => 45,
                'applications_count' => 12,
            ],
            [
                'title' => 'Assistant Communication',
                'type' => 'Stage',
                'location' => 'Kinshasa',
                'department' => 'Communication',
                'duration' => '6 mois',
                'description' => 'Stage en communication pour accompagner nos actions de plaidoyer et sensibilisation. Une excellente opportunité pour les étudiants en communication de développer leurs compétences dans le secteur humanitaire.',
                'requirements' => [
                    'Étudiant en communication, marketing ou journalisme',
                    'Maîtrise des réseaux sociaux et outils digitaux',
                    'Compétences en création de contenu (texte, photo, vidéo)',
                    'Excellente rédaction en français',
                    'Créativité et sens de l\'initiative',
                ],
                'responsibilities' => [
                    'Créer du contenu pour les réseaux sociaux',
                    'Rédiger des communiqués de presse et articles',
                    'Suivre les médias et faire de la veille informationnelle',
                    'Participer à l\'organisation d\'événements',
                    'Contribuer à la stratégie de communication digitale',
                ],
                'deadline' => Carbon::now()->addMonth(),
                'status' => 'published',
                'featured' => false,
                'published_at' => Carbon::now(),
                'views' => 78,
                'applications_count' => 23,
            ],
            [
                'title' => 'Logisticien',
                'type' => 'CDD',
                'location' => 'Goma',
                'department' => 'Logistique',
                'duration' => '12 mois',
                'description' => 'Gestion des approvisionnements et coordination logistique pour nos opérations sur le terrain dans la région de Goma. Le poste requiert une expérience en logistique humanitaire en zones difficiles.',
                'requirements' => [
                    'Diplôme en logistique ou gestion des opérations',
                    '3 ans d\'expérience minimum en logistique humanitaire',
                    'Connaissance des procédures d\'achat et de gestion des stocks',
                    'Capacité à travailler en zone difficile',
                    'Maîtrise des outils informatiques (Excel, logiciels de gestion)',
                ],
                'responsibilities' => [
                    'Gérer les approvisionnements et les achats locaux',
                    'Coordonner les transports et la distribution',
                    'Assurer la gestion des stocks et des inventaires',
                    'Superviser l\'entretien des véhicules et équipements',
                    'Garantir le respect des procédures logistiques',
                ],
                'deadline' => Carbon::now()->addMonths(1)->addWeeks(2),
                'status' => 'published',
                'featured' => true,
                'published_at' => Carbon::now(),
                'views' => 34,
                'applications_count' => 8,
            ],
            [
                'title' => 'Chargé de Suivi-Évaluation',
                'type' => 'CDI',
                'location' => 'Lubumbashi',
                'department' => 'Programmes',
                'description' => 'Nous recherchons un chargé de suivi-évaluation pour nos projets dans la région de Lubumbashi. Le candidat sera responsable du système de suivi et de l\'évaluation de l\'impact de nos interventions.',
                'requirements' => [
                    'Master en statistiques, développement ou sciences sociales',
                    '3 ans d\'expérience en suivi-évaluation dans le secteur humanitaire',
                    'Maîtrise des méthodologies quantitatives et qualitatives',
                    'Compétences en analyse de données (SPSS, R, Excel)',
                    'Expérience en rédaction de rapports d\'évaluation',
                ],
                'responsibilities' => [
                    'Développer et mettre en œuvre le système de S&E',
                    'Collecter et analyser les données de suivi',
                    'Conduire des évaluations d\'impact',
                    'Former les équipes aux outils de S&E',
                    'Produire des rapports d\'analyse et de recommandations',
                ],
                'deadline' => Carbon::now()->addMonths(2)->addWeeks(1),
                'status' => 'published',
                'featured' => false,
                'published_at' => Carbon::now(),
                'views' => 28,
                'applications_count' => 5,
            ],
            [
                'title' => 'Responsable Ressources Humaines',
                'type' => 'CDI',
                'location' => 'Kinshasa',
                'department' => 'Administration',
                'description' => 'Nous recherchons un Responsable RH pour gérer l\'ensemble des aspects liés aux ressources humaines de l\'organisation. Le candidat sera responsable du recrutement, de la formation et du développement des collaborateurs.',
                'requirements' => [
                    'Diplôme universitaire en gestion des ressources humaines',
                    '5 ans d\'expérience en gestion RH, idéalement dans le secteur ONG',
                    'Connaissance du droit du travail congolais',
                    'Excellentes compétences en communication et négociation',
                    'Maîtrise des logiciels RH',
                ],
                'responsibilities' => [
                    'Gérer le processus de recrutement',
                    'Développer et mettre en œuvre la politique RH',
                    'Organiser les formations et le développement des compétences',
                    'Gérer les relations sociales et le climat de travail',
                    'Assurer la conformité avec la législation du travail',
                ],
                'status' => 'draft',
                'featured' => false,
                'views' => 0,
                'applications_count' => 0,
            ],
        ];

        foreach ($jobs as $job) {
            JobOffer::create($job);
        }

        $this->command->info('✅ ' . count($jobs) . ' offres d\'emploi créées avec succès!');
    }
}