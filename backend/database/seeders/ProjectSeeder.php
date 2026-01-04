<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Domain;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vérifier si la table domains existe
        $hasDomains = Schema::hasTable('domains');
        
        $educationDomainId = null;
        $protectionDomainId = null;
        $santeDomainId = null;
        
        if ($hasDomains) {
            // Récupérer ou créer des domaines avec VOTRE structure
            $educationDomain = Domain::firstOrCreate(
                ['slug' => 'education'],
                [
                    'titre' => 'Éducation',
                    'description_courte' => 'Programmes éducatifs et formation pour tous',
                    'contenu' => [
                        'Nous œuvrons pour garantir l\'accès à une éducation de qualité pour tous les enfants.',
                        'Nos programmes incluent l\'éducation formelle, non-formelle et l\'éducation accélérée.',
                    ],
                    'icon' => 'book',
                    'ordre' => 1,
                    'actif' => true
                ]
            );
            $educationDomainId = $educationDomain->id;

            $protectionDomain = Domain::firstOrCreate(
                ['slug' => 'protection-enfance'],
                [
                    'titre' => 'Protection de l\'enfance',
                    'description_courte' => 'Protection des droits et bien-être des enfants',
                    'contenu' => [
                        'Nous travaillons à protéger les enfants contre toutes formes de violence et d\'exploitation.',
                        'Nos interventions visent la réinsertion familiale et la prise en charge psychosociale.',
                    ],
                    'icon' => 'shield',
                    'ordre' => 2,
                    'actif' => true
                ]
            );
            $protectionDomainId = $protectionDomain->id;

            $santeDomain = Domain::firstOrCreate(
                ['slug' => 'sante-nutrition'],
                [
                    'titre' => 'Santé et Nutrition',
                    'description_courte' => 'Santé et nutrition pour le développement des enfants',
                    'contenu' => [
                        'Nous améliorons l\'état nutritionnel et sanitaire des enfants et des familles.',
                        'Nos programmes incluent cantines scolaires, déparasitage et éducation nutritionnelle.',
                    ],
                    'icon' => 'heart',
                    'ordre' => 3,
                    'actif' => true
                ]
            );
            $santeDomainId = $santeDomain->id;
            
            echo "✅ Domaines créés ou récupérés avec succès.\n";
        } else {
            echo "⚠️  Table 'domains' non trouvée. Les projets seront créés sans domaines.\n";
        }

        $projects = [
            [
                'title' => "Programme d'éducation accélérée dans le Nord-Kivu",
                'excerpt' => "Offrir une seconde chance de scolarisation aux enfants déscolarisés dans 15 écoles partenaires.",
                'objective' => "Permettre à 1500 enfants âgés de 9 à 14 ans ayant quitté l'école de rattraper leur retard scolaire et de réintégrer le système éducatif formel. Le programme vise également à former 60 enseignants aux méthodes d'éducation accélérée et à sensibiliser 500 familles sur l'importance de la scolarisation.",
                'execution_zone' => "Nord-Kivu (Goma, Rutshuru, Masisi)",
                'start_date' => '2024-01-15',
                'end_date' => '2026-06-30',
                'status' => 'ongoing',
                'results' => [
                    "1245 enfants réinscrits dans le programme depuis janvier 2024",
                    "58 enseignants formés à la pédagogie accélérée",
                    "420 familles sensibilisées sur les droits à l'éducation",
                    "Taux de rétention de 87% après 6 mois de programme",
                    "85% des enfants ayant terminé le cycle ont réintégré l'école classique"
                ],
                'indicators' => [
                    ['label' => 'Enfants bénéficiaires', 'value' => '1245 / 1500', 'unit' => 'enfants'],
                    ['label' => 'Enseignants formés', 'value' => '58 / 60', 'unit' => 'enseignants'],
                    ['label' => 'Taux de rétention', 'value' => '87', 'unit' => '%'],
                    ['label' => 'Taux de réussite', 'value' => '78', 'unit' => '%'],
                    ['label' => 'Budget utilisé', 'value' => '145000', 'unit' => 'USD']
                ],
                'testimonials' => [
                    [
                        'name' => 'Marie Kavira',
                        'role' => 'Mère d\'élève, Goma',
                        'message' => "Ma fille avait abandonné l'école depuis 3 ans. Grâce à ce programme, elle a pu reprendre ses études et elle vient de réussir son examen. Je suis très reconnaissante à l'AEJT-RDC.",
                        'photo' => 'testimonials/marie-kavira.jpg'
                    ],
                    [
                        'name' => 'Jean Mukendi',
                        'role' => 'Enseignant formé, Rutshuru',
                        'message' => "La formation que j'ai reçue a complètement changé ma façon d'enseigner. Je comprends mieux les besoins des enfants qui ont manqué plusieurs années d'école.",
                        'photo' => 'testimonials/jean-mukendi.jpg'
                    ]
                ],
                'image' => 'projects/education-nord-kivu.jpg',
                'images' => [
                    'projects/education-nord-kivu-1.jpg',
                    'projects/education-nord-kivu-2.jpg',
                    'projects/education-nord-kivu-3.jpg'
                ],
                'domain_id' => $educationDomainId,
                'partners' => ['UNICEF', 'Save the Children', 'Ministère de l\'EPST'],
                'budget' => 180000.00,
                'beneficiaries_count' => 1500,
                'featured' => true,
                'views' => 342,
            ],
            [
                'title' => "Protection des enfants vulnérables au Kasaï",
                'excerpt' => "Programme de prise en charge psychosociale et de réinsertion familiale pour les enfants en situation de rue.",
                'objective' => "Identifier, protéger et réinsérer 800 enfants en situation de rue dans trois villes du Kasaï. Le projet vise à offrir un accompagnement psychosocial, une médiation familiale, une formation professionnelle et un suivi post-réinsertion pour assurer une réintégration durable.",
                'execution_zone' => "Kasaï (Kananga, Tshikapa, Mbuji-Mayi)",
                'start_date' => '2024-03-01',
                'end_date' => '2025-12-31',
                'status' => 'ongoing',
                'results' => [
                    "567 enfants identifiés et enregistrés dans le programme",
                    "312 enfants réinsérés dans leurs familles avec succès",
                    "45 médiations familiales réalisées",
                    "89 enfants placés en formation professionnelle",
                    "Création de 12 comités de protection communautaire"
                ],
                'indicators' => [
                    ['label' => 'Enfants identifiés', 'value' => '567 / 800', 'unit' => 'enfants'],
                    ['label' => 'Réinsertions familiales', 'value' => '312', 'unit' => 'enfants'],
                    ['label' => 'Taux de réussite', 'value' => '91', 'unit' => '%'],
                    ['label' => 'Comités créés', 'value' => '12', 'unit' => 'comités'],
                    ['label' => 'Suivi à 6 mois', 'value' => '85', 'unit' => '%']
                ],
                'testimonials' => [
                    [
                        'name' => 'Pascal Tshombe',
                        'role' => 'Bénéficiaire, 16 ans, Kananga',
                        'message' => "J'ai vécu 4 ans dans la rue. Aujourd'hui, je suis retourné chez mes parents et j'apprends la menuiserie. Ma vie a complètement changé.",
                        'photo' => 'testimonials/pascal-tshombe.jpg'
                    ],
                    [
                        'name' => 'Maman Celestine',
                        'role' => 'Mère, Tshikapa',
                        'message' => "Mon fils est revenu à la maison grâce à l'équipe de l'AEJT. Nous avons eu des séances de médiation qui nous ont aidés à nous réconcilier.",
                        'photo' => 'testimonials/celestine-kasongo.jpg'
                    ]
                ],
                'image' => 'projects/protection-kasai.jpg',
                'images' => [
                    'projects/protection-kasai-1.jpg',
                    'projects/protection-kasai-2.jpg'
                ],
                'domain_id' => $protectionDomainId,
                'partners' => ['Plan International', 'Caritas Congo', 'Division Provinciale des Affaires Sociales'],
                'budget' => 220000.00,
                'beneficiaries_count' => 800,
                'featured' => true,
                'views' => 278,
            ],
            [
                'title' => "Santé et nutrition scolaire dans le Sud-Kivu",
                'excerpt' => "Amélioration de la santé et de la nutrition des élèves dans 30 écoles primaires.",
                'objective' => "Améliorer l'état nutritionnel et sanitaire de 10 000 élèves dans 30 écoles du Sud-Kivu par la mise en place de cantines scolaires, des séances de déparasitage, l'installation de points d'eau potable et la formation des enseignants aux bonnes pratiques d'hygiène.",
                'execution_zone' => "Sud-Kivu (Bukavu, Uvira, Walungu)",
                'start_date' => '2024-09-01',
                'end_date' => '2027-08-31',
                'status' => 'ongoing',
                'results' => [
                    "8 cantines scolaires opérationnelles servant 3200 repas/jour",
                    "7500 enfants déparasités lors de la première campagne",
                    "15 points d'eau potable installés",
                    "90 enseignants formés à l'éducation nutritionnelle",
                    "Réduction de 34% de l'absentéisme pour cause de maladie"
                ],
                'indicators' => [
                    ['label' => 'Repas servis/jour', 'value' => '3200', 'unit' => 'repas'],
                    ['label' => 'Enfants déparasités', 'value' => '7500 / 10000', 'unit' => 'enfants'],
                    ['label' => 'Points d\'eau installés', 'value' => '15 / 30', 'unit' => 'points'],
                    ['label' => 'Réduction absentéisme', 'value' => '34', 'unit' => '%'],
                    ['label' => 'Amélioration état nutritionnel', 'value' => '28', 'unit' => '%']
                ],
                'testimonials' => [
                    [
                        'name' => 'Directeur Mushagalusa',
                        'role' => 'Directeur d\'école, Bukavu',
                        'message' => "Depuis que nous avons la cantine scolaire, les résultats des élèves se sont nettement améliorés. Les enfants sont plus concentrés et plus assidus en classe.",
                        'photo' => 'testimonials/mushagalusa.jpg'
                    ]
                ],
                'image' => 'projects/sante-sud-kivu.jpg',
                'images' => [
                    'projects/sante-sud-kivu-1.jpg',
                    'projects/sante-sud-kivu-2.jpg',
                    'projects/sante-sud-kivu-3.jpg'
                ],
                'domain_id' => $santeDomainId,
                'partners' => ['UNICEF', 'PAM', 'Ministère de la Santé', 'OMS'],
                'budget' => 450000.00,
                'beneficiaries_count' => 10000,
                'featured' => true,
                'views' => 198,
            ],
            [
                'title' => "Formation professionnelle pour jeunes déscolarisés",
                'excerpt' => "Programme de formation aux métiers porteurs pour 300 jeunes de Kinshasa.",
                'objective' => "Former 300 jeunes déscolarisés de 16 à 25 ans aux métiers de la couture, menuiserie, plomberie, électricité et coiffure. Chaque bénéficiaire reçoit 6 mois de formation théorique et pratique, un kit de démarrage et un accompagnement à l'insertion professionnelle.",
                'execution_zone' => "Kinshasa (Communes de Masina, Ndjili, Kimbanseke)",
                'start_date' => '2024-02-01',
                'end_date' => '2024-08-31',
                'status' => 'completed',
                'results' => [
                    "310 jeunes formés (103% de l'objectif)",
                    "285 kits de démarrage distribués",
                    "187 jeunes en activité 3 mois après la formation",
                    "45 coopératives de jeunes créées",
                    "Taux d'insertion professionnelle de 78%"
                ],
                'indicators' => [
                    ['label' => 'Jeunes formés', 'value' => '310 / 300', 'unit' => 'jeunes'],
                    ['label' => 'Taux de réussite', 'value' => '92', 'unit' => '%'],
                    ['label' => 'Insertion à 3 mois', 'value' => '78', 'unit' => '%'],
                    ['label' => 'Coopératives créées', 'value' => '45', 'unit' => 'coopératives'],
                    ['label' => 'Satisfaction', 'value' => '94', 'unit' => '%']
                ],
                'testimonials' => [
                    [
                        'name' => 'Grace Mbuyi',
                        'role' => 'Bénéficiaire, couturière, 22 ans',
                        'message' => "Grâce à cette formation, j'ai ouvert mon propre atelier de couture. Je peux maintenant subvenir à mes besoins et aider ma famille. Je suis fière de moi.",
                        'photo' => 'testimonials/grace-mbuyi.jpg'
                    ],
                    [
                        'name' => 'Patrick Mukendi',
                        'role' => 'Bénéficiaire, menuisier, 24 ans',
                        'message' => "J'ai appris un métier que j'aime. Maintenant je fabrique des meubles et j'ai déjà plusieurs clients. Cette formation a changé ma vie.",
                        'photo' => 'testimonials/patrick-mukendi.jpg'
                    ]
                ],
                'image' => 'projects/formation-pro-kinshasa.jpg',
                'images' => [
                    'projects/formation-pro-kinshasa-1.jpg',
                    'projects/formation-pro-kinshasa-2.jpg'
                ],
                'domain_id' => $educationDomainId,
                'partners' => ['BIT', 'PNUD', 'Chambre des Métiers'],
                'budget' => 85000.00,
                'beneficiaries_count' => 310,
                'featured' => false,
                'views' => 145,
            ],
        ];

        foreach ($projects as $project) {
            Project::create([
                ...$project,
                'slug' => Str::slug($project['title']) . '-' . Str::random(6),
            ]);
        }
        
        echo "✅ " . count($projects) . " projets créés avec succès.\n";
    }
}