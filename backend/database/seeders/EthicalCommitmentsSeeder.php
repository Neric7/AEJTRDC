<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EthicalCommitment;
use Carbon\Carbon;

class EthicalCommitmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $commitments = [
            [
                'title' => 'Respect de la dignité humaine',
                'category' => 'principes_humanitaires',
                'description' => 'Nous nous engageons à garantir le respect de la dignité de chaque personne dans toutes nos interventions, sans discrimination aucune. Chaque individu a le droit d\'être traité avec respect et considération.',
                'reference_documents' => 'Charte Humanitaire, Déclaration Universelle des Droits de l\'Homme',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2024-12-31'),
                'is_active' => true,
                'priority' => 'critical',
                'order' => 1,
                'tags' => ['dignité', 'droits humains', 'respect']
            ],
            [
                'title' => 'Principe d\'Impartialité',
                'category' => 'principes_humanitaires',
                'description' => 'Nous ne faisons aucune discrimination fondée sur la nationalité, la race, la religion, la condition sociale ou les opinions politiques. Nous nous attachons uniquement à secourir les personnes en fonction de leurs besoins.',
                'reference_documents' => 'Principes Fondamentaux du Mouvement Croix-Rouge',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2025-06-30'),
                'is_active' => true,
                'priority' => 'critical',
                'order' => 2,
                'tags' => ['impartialité', 'non-discrimination', 'égalité']
            ],
            [
                'title' => 'Neutralité dans les conflits',
                'category' => 'principes_humanitaires',
                'description' => 'Nous nous abstenons de prendre parti dans les hostilités ou de nous engager dans des controverses d\'ordre politique, racial, religieux ou idéologique.',
                'reference_documents' => 'Code de conduite CRF, Principes humanitaires',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2025-12-31'),
                'is_active' => true,
                'priority' => 'critical',
                'order' => 3,
                'tags' => ['neutralité', 'indépendance', 'impartialité']
            ],
            [
                'title' => 'Protection des enfants',
                'category' => 'safeguarding',
                'description' => 'Politique de tolérance zéro envers tout abus, négligence ou exploitation d\'enfants. Nous mettons en place des mécanismes de protection robustes dans tous nos programmes.',
                'reference_documents' => 'Child Safeguarding Policy, Normes CPMS',
                'implementation_date' => Carbon::parse('2024-01-15'),
                'review_date' => Carbon::parse('2024-07-15'),
                'is_active' => true,
                'priority' => 'critical',
                'order' => 4,
                'tags' => ['enfants', 'protection', 'safeguarding', 'abus']
            ],
            [
                'title' => 'Prévention de l\'exploitation et des abus sexuels (PSEA)',
                'category' => 'safeguarding',
                'description' => 'Engagement ferme contre toute forme d\'exploitation et d\'abus sexuels par notre personnel ou nos partenaires. Formation obligatoire de tout le personnel.',
                'reference_documents' => 'PSEA Policy, Code de conduite du personnel',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2024-06-30'),
                'is_active' => true,
                'priority' => 'critical',
                'order' => 5,
                'tags' => ['PSEA', 'exploitation', 'abus', 'protection']
            ],
            [
                'title' => 'Code de conduite du personnel',
                'category' => 'code_conduite',
                'description' => 'Tous les membres du personnel, bénévoles et partenaires doivent respecter notre code de conduite qui définit les comportements attendus et interdits.',
                'reference_documents' => 'Code de conduite organisationnel, Charte éthique',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2025-12-31'),
                'is_active' => true,
                'priority' => 'high',
                'order' => 6,
                'tags' => ['conduite', 'éthique', 'comportement', 'personnel']
            ],
            [
                'title' => 'Lutte contre la corruption',
                'category' => 'code_conduite',
                'description' => 'Tolérance zéro pour toute forme de corruption, fraude ou détournement de fonds. Mécanismes de signalement confidentiels en place.',
                'reference_documents' => 'Politique anti-corruption, Procédures de signalement',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2024-12-31'),
                'is_active' => true,
                'priority' => 'high',
                'order' => 7,
                'tags' => ['corruption', 'fraude', 'transparence', 'intégrité']
            ],
            [
                'title' => 'Normes Sphere',
                'category' => 'normes_qualite',
                'description' => 'Nous nous engageons à respecter les normes minimales Sphere dans toutes nos interventions humanitaires pour garantir la qualité et la redevabilité.',
                'reference_documents' => 'Manuel Sphere, Standards humanitaires',
                'implementation_date' => Carbon::parse('2024-02-01'),
                'review_date' => Carbon::parse('2025-02-01'),
                'is_active' => true,
                'priority' => 'high',
                'order' => 8,
                'tags' => ['sphere', 'qualité', 'standards', 'redevabilité']
            ],
            [
                'title' => 'Participation communautaire',
                'category' => 'protection',
                'description' => 'Les communautés bénéficiaires sont au cœur de nos interventions et participent activement aux décisions qui les concernent.',
                'reference_documents' => 'Guide de participation communautaire, Approche CBDRM',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2025-06-30'),
                'is_active' => true,
                'priority' => 'medium',
                'order' => 9,
                'tags' => ['participation', 'communauté', 'inclusion', 'empowerment']
            ],
            [
                'title' => 'Protection de l\'environnement',
                'category' => 'environnement',
                'description' => 'Nos interventions intègrent systématiquement la protection de l\'environnement et la promotion de pratiques durables.',
                'reference_documents' => 'Politique environnementale, Green Response',
                'implementation_date' => Carbon::parse('2024-03-01'),
                'review_date' => Carbon::parse('2025-03-01'),
                'is_active' => true,
                'priority' => 'medium',
                'order' => 10,
                'tags' => ['environnement', 'durabilité', 'écologie', 'climat']
            ],
            [
                'title' => 'Gestion des plaintes et feedback',
                'category' => 'protection',
                'description' => 'Mécanisme transparent et accessible permettant aux bénéficiaires de formuler des plaintes ou du feedback sur nos interventions.',
                'reference_documents' => 'Procédure de gestion des plaintes, CHS Standard 5',
                'implementation_date' => Carbon::parse('2024-01-15'),
                'review_date' => Carbon::parse('2024-07-15'),
                'is_active' => true,
                'priority' => 'high',
                'order' => 11,
                'tags' => ['plaintes', 'feedback', 'redevabilité', 'transparence']
            ],
            [
                'title' => 'Do No Harm (Ne pas nuire)',
                'category' => 'principes_humanitaires',
                'description' => 'Toutes nos interventions sont analysées pour minimiser les risques de préjudice aux populations et maximiser les impacts positifs.',
                'reference_documents' => 'Principes Do No Harm, Analyse de conflit',
                'implementation_date' => Carbon::parse('2024-01-01'),
                'review_date' => Carbon::parse('2025-12-31'),
                'is_active' => true,
                'priority' => 'high',
                'order' => 12,
                'tags' => ['do no harm', 'protection', 'analyse', 'risques']
            ]
        ];

        foreach ($commitments as $commitment) {
            EthicalCommitment::create($commitment);
        }

        $this->command->info('✅ ' . count($commitments) . ' engagements éthiques créés avec succès!');
    }
}