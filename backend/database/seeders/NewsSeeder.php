<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => "Nouvelle initiative pour la protection de l'enfance en RDC",
                'excerpt' => "L'AEJT-RDC lance un programme ambitieux de sensibilisation et de prise en charge des enfants vulnérables dans trois provinces.",
                'content' => "L'Association des Enfants et Jeunes Travailleurs de la RDC (AEJT-RDC) annonce le lancement d'une nouvelle initiative majeure pour renforcer la protection de l'enfance dans le pays. Ce programme, qui sera déployé dans les provinces du Nord-Kivu, du Sud-Kivu et du Kasaï, vise à sensibiliser les communautés locales sur les droits des enfants et à offrir un soutien direct aux enfants en situation de vulnérabilité.\n\nLe programme comprend trois volets principaux : la sensibilisation communautaire, l'accompagnement psychosocial et la réinsertion scolaire. Plus de 5000 enfants devraient bénéficier de ce programme au cours des 24 prochains mois.\n\nSelon Mme Jeanne Mukendi, Directrice des Programmes, 'Cette initiative répond à un besoin urgent identifié lors de nos consultations avec les communautés. Nous travaillerons en étroite collaboration avec les autorités locales, les chefs coutumiers et les organisations partenaires pour garantir un impact durable.'",
                'image' => '/storage/images/news/protection-enfance-2025.jpg',
                'author' => 'Rédaction AEJT-RDC',
                'tags' => ['Protection', 'Enfance', 'Droits'],
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'featured' => true,
                'views' => 234,
            ],
            [
                'title' => "Éducation accélérée : rattrapage scolaire pour 1500 enfants",
                'excerpt' => "Un programme d'éducation accélérée permet aux enfants ayant quitté l'école de rattraper leur retard scolaire.",
                'content' => "Dans le cadre de son engagement pour l'éducation pour tous, l'AEJT-RDC met en œuvre un programme d'éducation accélérée qui a déjà permis à plus de 1500 enfants de reprendre leur parcours scolaire.\n\nCe dispositif innovant offre un cursus condensé permettant aux enfants ayant abandonné l'école de rattraper plusieurs années en un temps réduit. Les cours sont adaptés à l'âge et au niveau des apprenants, avec un accent particulier sur les matières fondamentales.\n\nJean-Paul Kasongo, coordinateur du programme, explique : 'Nous travaillons avec des enseignants spécialement formés à la pédagogie accélérée. Les résultats sont encourageants : 85% des enfants ayant terminé le cycle réintègrent avec succès le système scolaire classique.'",
                'image' => '/storage/images/news/education-acceleree.jpg',
                'author' => 'Équipe Programmes',
                'tags' => ['Éducation', 'Réinsertion'],
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'featured' => false,
                'views' => 187,
            ],
            [
                'title' => "Formation professionnelle : 200 jeunes formés aux métiers porteurs",
                'excerpt' => "L'AEJT-RDC clôture une session de formation professionnelle ayant bénéficié à 200 jeunes dans plusieurs filières.",
                'content' => "L'AEJT-RDC a célébré la fin d'une session de formation professionnelle qui a permis à 200 jeunes d'acquérir des compétences dans des métiers porteurs tels que la couture, la menuiserie, la plomberie et l'électricité.\n\nCes formations, d'une durée de 6 mois, combinent apprentissage théorique et stages pratiques en entreprise. À l'issue du programme, chaque participant reçoit un kit de démarrage pour faciliter son insertion professionnelle.\n\nParmi les bénéficiaires, Marie Kalala, 22 ans, témoigne : 'Cette formation a changé ma vie. J'ai non seulement appris un métier, mais j'ai aussi gagné en confiance. Aujourd'hui, je peux subvenir à mes besoins et aider ma famille.'",
                'image' => '/storage/images/news/formation-pro.jpg',
                'author' => 'Service Communication',
                'tags' => ['Formation', 'Jeunesse', 'Employabilité'],
                'status' => 'published',
                'published_at' => now()->subDays(20),
                'featured' => true,
                'views' => 312,
            ],
            [
                'title' => "Campagne de sensibilisation contre le travail des enfants",
                'excerpt' => "Une vaste campagne de sensibilisation est lancée dans 15 communes de Kinshasa pour lutter contre le travail des enfants.",
                'content' => "L'AEJT-RDC, en partenariat avec plusieurs organisations locales, lance une campagne de sensibilisation d'envergure contre le travail des enfants dans la capitale congolaise.\n\nCette campagne, qui durera trois mois, utilisera divers canaux de communication : émissions radio, affiches, théâtre de rue et visites de porte-à-porte. L'objectif est de toucher au moins 50 000 familles.\n\nLes messages clés portent sur les droits de l'enfant, les dangers du travail précoce et les alternatives disponibles. Des comités de veille communautaires seront également mis en place pour identifier et orienter les enfants travailleurs vers les services appropriés.",
                'image' => '/storage/images/news/campagne-travail-enfants.jpg',
                'author' => 'Département Advocacy',
                'tags' => ['Sensibilisation', 'Travail des enfants', 'Advocacy'],
                'status' => 'published',
                'published_at' => now()->subDays(30),
                'featured' => false,
                'views' => 156,
            ],
            [
                'title' => "Nouveau partenariat avec l'UNICEF pour la santé scolaire",
                'excerpt' => "Un accord de partenariat avec l'UNICEF permettra d'améliorer la santé et la nutrition de 10 000 élèves.",
                'content' => "L'AEJT-RDC et l'UNICEF ont signé un accord de partenariat visant à améliorer la santé et la nutrition des enfants scolarisés dans les zones d'intervention de l'organisation.\n\nCe programme comprend la distribution de kits d'hygiène, l'installation de points d'eau potable dans les écoles, des séances de déparasitage et des cantines scolaires.\n\nDr. Emmanuel Mbuyi, coordonnateur du volet santé, précise : 'La malnutrition et les maladies parasitaires sont des obstacles majeurs à l'apprentissage. En améliorant l'état de santé des enfants, nous améliorons aussi leurs performances scolaires.'",
                'image' => '/storage/images/news/partenariat-unicef.jpg',
                'author' => 'Direction Partenariats',
                'tags' => ['Partenariat', 'Santé', 'Nutrition'],
                'status' => 'published',
                'published_at' => now()->subDays(45),
                'featured' => false,
                'views' => 203,
            ],
        ];

        foreach ($articles as $article) {
            News::create([
                ...$article,
                'slug' => Str::slug($article['title']) . '-' . Str::random(6),
            ]);
        }
    }
}