<?php
// database/seeders/DomainSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DomainSeeder extends Seeder
{
    public function run(): void
    {
        $domains = [
            [
                'titre' => 'Éducation des enfants marginalisés',
                'slug' => 'education-enfants-marginalises',
                'image' => 'domains/68fa9ecaf1d0c0.29467065.jpg',
                'description_courte' => 'Accès à l\'éducation pour les enfants en situation de rue, orphelins, déplacés et familles vulnérables touchées par les conflits et la pauvreté.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC œuvre pour garantir l\'accès à l\'éducation aux enfants marginalisés, notamment ceux vivant dans la rue, les orphelins, les personnes déplacées internes et les enfants issus de familles vulnérables touchées par les conflits et la pauvreté. Le programme apporte un soutien concret à la scolarité par la distribution de fournitures scolaires, le parrainage scolaire et des séances de soutien pour combler les lacunes.',
                    'Parallèlement, un accompagnement psychosocial est proposé pour favoriser le développement émotionnel et social des enfants et les aider à surmonter les traumatismes liés à leur situation. Ces interventions visent à promouvoir la continuité de leur scolarité, leur inclusion sociale et leur épanouissement personnel, contribuant ainsi à rompre le cycle de la vulnérabilité et à leur offrir un avenir meilleur.'
                ]),
                'icon' => 'FaGraduationCap',
                'ordre' => 1,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Éducation inclusive pour les enfants vivant avec un handicap',
                'slug' => 'education-inclusive-handicap',
                'image' => 'domains/68fa9e8c319630.69281871.jpg',
                'description_courte' => 'Promotion de l\'éducation inclusive pour les enfants en situation de handicap, lutte contre la discrimination et intégration scolaire et communautaire.',
                'contenu' => json_encode([
                    'AEJT – RDC s\'engage à promouvoir une éducation inclusive pour les enfants vivant avec un handicap, en veillant à leur accès équitable aux services éducatifs et à leur intégration dans le système scolaire ordinaire. Le programme sensibilise les communautés, les écoles et les familles à l\'importance de l\'inclusion et lutte contre la stigmatisation et la discrimination.',
                    'Des infrastructures adaptées sont mises en place, ainsi que des outils pédagogiques spécialisés pour répondre aux besoins spécifiques de chaque enfant. Les enseignants bénéficient de formations pour adopter des méthodes d\'enseignement inclusives. L\'objectif est de garantir que chaque enfant, quel que soit son handicap, puisse bénéficier d\'une éducation de qualité et participer pleinement à la vie scolaire et sociale.'
                ]),
                'icon' => 'FaShieldAlt',
                'ordre' => 2,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Lutte contre le mariage précoce des enfants',
                'slug' => 'lutte-mariage-precoce',
                'image' => 'domains/68fa9dfa8a2832.75914076.jpg',
                'description_courte' => 'Prévention et réduction des mariages précoces qui privent les filles de leur éducation et de leurs perspectives d\'avenir.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC œuvre pour prévenir et réduire les mariages précoces, qui privent les filles de leur enfance, de leur éducation et de leurs perspectives d\'avenir. Le programme sensibilise les communautés, les familles et les leaders locaux aux dangers du mariage précoce, notamment les risques pour la santé, les complications liées aux grossesses précoces et les impacts psychologiques et sociaux.',
                    'Des alternatives éducatives et économiques sont proposées aux filles à risque, telles que des programmes de scolarisation, de formation professionnelle et d\'autonomisation. L\'AEJT – RDC travaille également à renforcer les cadres légaux et à encourager l\'application des lois protégeant les droits des enfants, tout en collaborant avec les autorités locales et les organisations communautaires pour créer un environnement protecteur où les filles peuvent grandir en toute sécurité.'
                ]),
                'icon' => 'FaHeart',
                'ordre' => 3,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Protection des enfants dans les mines artisanales',
                'slug' => 'protection-enfants-mines',
                'image' => 'domains/68fa9d2bd69995.07585915.jpg',
                'description_courte' => 'Mettre fin à l\'implication des enfants dans les activités minières artisanales dangereuses.',
                'contenu' => json_encode([
                    'AEJT – RDC s\'engage activement à mettre fin à l\'implication d\'enfants dans les activités minières artisanales, une pratique qui expose les enfants à des conditions de travail dangereuses, compromet leur santé et les prive de leur droit à l\'éducation. Le programme intervient en sensibilisant les communautés minières aux risques graves associés au travail des enfants, notamment les accidents, l\'exposition à des substances toxiques et les impacts psychologiques.',
                    'Des alternatives économiques sont proposées aux familles pour réduire leur dépendance au travail des enfants, tandis que des programmes de réinsertion scolaire et de formation professionnelle sont offerts aux enfants retirés des mines. L\'AEJT – RDC collabore avec les autorités locales, les entreprises minières et les organisations internationales pour renforcer les mécanismes de surveillance et promouvoir des pratiques minières responsables et respectueuses des droits de l\'enfant.'
                ]),
                'icon' => 'FaHardHat',
                'ordre' => 4,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Santé sexuelle et reproductive des adolescents',
                'slug' => 'sante-sexuelle-adolescents',
                'image' => 'domains/68fa99cc335d81.89565554.jpg',
                'description_courte' => 'Amélioration de la santé sexuelle et reproductive des adolescents par l\'information et les services adaptés.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC œuvre à l\'amélioration de la santé sexuelle et reproductive des adolescents en leur fournissant des informations précises, des services de santé adaptés et un environnement favorable à leur bien-être. Le programme propose des séances d\'éducation sur la santé reproductive, la prévention des grossesses précoces, les infections sexuellement transmissibles (IST) et les droits reproductifs.',
                    'Des services de conseil et de soins de santé sont rendus accessibles aux jeunes, avec une approche respectueuse de leur vie privée et de leur dignité. L\'AEJT – RDC travaille également à sensibiliser les parents, les enseignants et les leaders communautaires sur l\'importance de soutenir les adolescents dans leurs besoins en matière de santé reproductive. L\'objectif est de permettre aux jeunes de prendre des décisions éclairées concernant leur santé et leur avenir, tout en réduisant les risques associés aux comportements à risque.'
                ]),
                'icon' => 'FaHeartbeat',
                'ordre' => 5,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'L\'inclusion par le sport',
                'slug' => 'inclusion-par-sport',
                'image' => 'domains/68fa99594efc66.96353983.jpg',
                'description_courte' => 'Utilisation du sport comme outil d\'inclusion sociale et d\'éducation pour les enfants et jeunes marginalisés.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC utilise le sport comme outil d\'inclusion sociale et d\'éducation pour les enfants et les jeunes, en particulier ceux issus de milieux marginalisés ou vulnérables. Le programme organise des activités sportives et récréatives qui favorisent le développement physique, émotionnel et social des participants, tout en renforçant les valeurs de respect, de travail d\'équipe et de fair-play.',
                    'Le sport offre également un espace sûr où les enfants peuvent s\'épanouir, développer leur confiance en soi et acquérir des compétences de leadership. L\'AEJT – RDC collabore avec des écoles, des clubs sportifs et des organisations locales pour créer des infrastructures sportives accessibles et promouvoir l\'égalité des chances, en veillant à ce que les filles et les enfants vivant avec un handicap puissent participer pleinement aux activités sportives.'
                ]),
                'icon' => 'FaFutbol',
                'ordre' => 6,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Lutte contre la violence faite aux filles dans les écoles',
                'slug' => 'lutte-violence-filles-ecoles',
                'image' => 'domains/68fa991ad97ed4.30888153.jpg',
                'description_courte' => 'Création d\'un environnement scolaire sûr et protecteur pour les filles.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC œuvre à la création d\'un environnement scolaire sûr et protecteur pour les filles, en luttant contre toutes les formes de violence, y compris les violences physiques, psychologiques et sexuelles. Le programme sensibilise les élèves, les enseignants, les parents et les communautés aux impacts néfastes de la violence sur l\'éducation et le bien-être des filles.',
                    'Des mécanismes de signalement et de prise en charge des cas de violence sont mis en place, avec un accompagnement psychosocial pour les victimes. L\'AEJT – RDC forme également les enseignants et le personnel scolaire à la prévention et à la gestion des cas de violence, tout en promouvant des politiques scolaires inclusives et respectueuses des droits des filles. L\'objectif est de garantir que chaque fille puisse poursuivre son éducation dans un environnement sûr, où elle se sent respectée et valorisée.'
                ]),
                'icon' => 'FaShieldAlt',
                'ordre' => 7,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Les pires formes de travail des enfants',
                'slug' => 'pires-formes-travail-enfants',
                'image' => 'domains/68fa9d52352c47.74657218.jpg',
                'description_courte' => 'Protection des enfants contre l\'exploitation sexuelle, le travail forcé et les activités dangereuses.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC s\'engage à protéger les enfants des pires formes de travail, telles que l\'exploitation sexuelle, le travail forcé, le recrutement dans les groupes armés et les travaux dangereux qui compromettent leur santé, leur sécurité et leur développement. Le programme identifie et retire les enfants de ces situations d\'exploitation, en leur offrant un soutien immédiat et un accompagnement pour leur réintégration sociale et scolaire.',
                    'Des actions de plaidoyer sont menées pour renforcer les lois et les politiques de protection de l\'enfance, tandis que des campagnes de sensibilisation ciblent les communautés, les employeurs et les autorités locales. L\'AEJT – RDC travaille également avec les familles pour proposer des alternatives économiques durables et réduire les facteurs qui poussent les enfants vers le travail. L\'objectif est de garantir que chaque enfant puisse grandir dans un environnement protecteur, libre de toute forme d\'exploitation.'
                ]),
                'icon' => 'FaExclamationTriangle',
                'ordre' => 8,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Éducation d\'urgence pour les enfants, jeunes et femmes touchés par les crises',
                'slug' => 'education-urgence-crises',
                'image' => 'domains/68fa986295af79.24579904.jpg',
                'description_courte' => 'Assurer la continuité de l\'éducation dans les contextes de crises, conflits ou catastrophes.',
                'contenu' => json_encode([
                    'AEJT – RDC intervient dans des contextes de crises, de conflits ou de catastrophes naturelles pour assurer la continuité de l\'éducation des enfants, des jeunes et des femmes touchés. Le programme met en place des espaces d\'apprentissage temporaires, distribue des kits scolaires et propose des activités éducatives adaptées aux besoins des populations déplacées ou affectées par les crises.',
                    'Un accompagnement psychosocial est également offert pour aider les bénéficiaires à surmonter les traumatismes liés aux crises et à retrouver un sentiment de normalité et de stabilité. L\'AEJT – RDC collabore avec les autorités locales, les organisations humanitaires et les communautés pour garantir un accès rapide et équitable à l\'éducation en situation d\'urgence. L\'objectif est de protéger le droit à l\'éducation même dans les contextes les plus difficiles et de contribuer à la résilience des populations affectées.'
                ]),
                'icon' => 'FaFirstAid',
                'ordre' => 9,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Entrepreneuriat et autonomisation des femmes et des jeunes',
                'slug' => 'entrepreneuriat-autonomisation',
                'image' => 'domains/68fa95578fa5a4.49222161.jpg',
                'description_courte' => 'Soutien au développement socio-économique des femmes et des jeunes par l\'entrepreneuriat et la formation.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC soutient les femmes et les jeunes dans leur développement socio-économique en leur offrant des opportunités d\'entrepreneuriat, de formation professionnelle et d\'accès au crédit. Le programme propose des formations en gestion d\'entreprise, en développement de compétences techniques et en alphabétisation financière pour renforcer les capacités des bénéficiaires.',
                    'Des groupes d\'épargne et de crédit sont créés pour faciliter l\'accès au financement, tandis que des activités génératrices de revenus sont promues pour améliorer les conditions de vie des familles. L\'AEJT – RDC encourage également l\'égalité des genres et l\'autonomisation des femmes en les impliquant dans les prises de décisions économiques et communautaires. L\'objectif est de réduire la pauvreté, de promouvoir l\'autonomie économique et de renforcer la résilience des communautés.'
                ]),
                'icon' => 'FaBusinessTime',
                'ordre' => 10,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Règlement pacifique des conflits, paix et bonne gouvernance',
                'slug' => 'reglement-conflits-paix',
                'image' => 'domains/68fa939535deb2.67763353.jpg',
                'description_courte' => 'Promotion de la paix durable et de la cohésion sociale par le dialogue et la bonne gouvernance.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC promeut une paix durable et la cohésion sociale dans la région en facilitant le règlement pacifique des conflits et en renforçant les mécanismes de bonne gouvernance. Le programme forme les communautés, les leaders locaux et les jeunes à la médiation, au dialogue et à la résolution non-violente des conflits.',
                    'Des espaces de dialogue sont créés pour favoriser la réconciliation et la coexistence pacifique entre les groupes en conflit. L\'AEJT – RDC sensibilise également les populations aux principes de bonne gouvernance, de transparence et de responsabilité, tout en plaidant pour des politiques inclusives et participatives. L\'objectif est de prévenir les conflits, de promouvoir la justice sociale et de contribuer à la construction d\'une société pacifique et démocratique.'
                ]),
                'icon' => 'FaPeace',
                'ordre' => 11,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Nutrition, sécurité alimentaire et environnement',
                'slug' => 'nutrition-securite-alimentaire',
                'image' => 'domains/68fa90f927f355.68983087.jpg',
                'description_courte' => 'Amélioration de la sécurité alimentaire, nutrition et promotion de pratiques agricoles durables.',
                'contenu' => json_encode([
                    'L\'AEJT – RDC œuvre pour améliorer la sécurité alimentaire et la nutrition des communautés vulnérables, tout en promouvoir des pratiques agricoles durables et respectueuses de l\'environnement. Le programme sensibilise les familles à l\'importance d\'une alimentation équilibrée et propose des formations en nutrition pour réduire la malnutrition, en particulier chez les enfants et les femmes enceintes.',
                    'Des activités de production agricole, d\'élevage et de transformation des aliments sont promues pour renforcer la résilience des ménages face à l\'insécurité alimentaire. L\'AEJT – RDC encourage également l\'adoption de techniques agricoles écologiques, telles que l\'agroforesterie et l\'agriculture biologique, pour préserver les ressources naturelles et lutter contre la dégradation de l\'environnement. L\'objectif est de garantir un accès durable à une alimentation suffisante et nutritive, tout en protégeant l\'environnement pour les générations futures.'
                ]),
                'icon' => 'FaAppleAlt',
                'ordre' => 12,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titre' => 'Conservation de la biodiversité',
                'slug' => 'conservation-biodiversite',
                'image' => 'domains/68fa8cd4e55465.16973276.jpg',
                'description_courte' => 'Engagement pour la conservation de la biodiversité et la protection des écosystèmes naturels.',
                'contenu' => json_encode([
                    'AEJT - RDC s\'engage pour la conservation de la biodiversité et la protection des écosystèmes naturels, en reconnaissant leur importance pour le bien-être des communautés et la durabilité environnementale. Le programme sensibilise les populations locales à la valeur de la biodiversité et aux menaces qui pèsent sur les espèces et les habitats naturels, telles que la déforestation, le braconnage et la pollution.',
                    'Des actions de reforestation, de protection des zones écologiques sensibles et de gestion durable des ressources naturelles sont mises en œuvre en collaboration avec les communautés locales et les autorités environnementales. L\'AEJT – RDC promeut également des pratiques économiques alternatives, telles que l\'écotourisme et l\'agriculture durable, pour réduire la pression sur les ressources naturelles. L\'objectif est de préserver la richesse biologique de la région et de garantir un environnement sain pour les générations actuelles et futures.'
                ]),
                'icon' => 'FaLeaf',
                'ordre' => 13,
                'actif' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Vider la table d'abord
        DB::table('domains')->truncate();
        
        // Insérer les données
        DB::table('domains')->insert($domains);

        $this->command->info(count($domains) . ' domaines ont été créés avec succès !');
    }
}