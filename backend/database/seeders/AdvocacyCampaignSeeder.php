<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdvocacyCampaign;
use Carbon\Carbon;

class AdvocacyCampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campaigns = [
            // PROTECTION
            [
                'title' => 'Campagne contre les violences basées sur le genre',
                'theme' => 'protection',
                'objective' => 'Réduire de 40% les cas de VBG dans les zones ciblées et améliorer l\'accès aux services de prise en charge pour les survivantes',
                'target_audience' => 'Communautés locales, leaders communautaires, forces de sécurité, organisations locales',
                'key_messages' => "- Les VBG sont une violation des droits humains\n- Briser le silence sauve des vies\n- Les survivantes méritent respect et soutien\n- La communauté a un rôle à jouer dans la prévention",
                'activities' => "- Sessions de sensibilisation communautaire (50 villages)\n- Formation de 100 leaders communautaires\n- Établissement de 10 espaces sûrs pour femmes\n- Campagne médiatique (radio, affiches)\n- Plaidoyer auprès des autorités locales",
                'timeline' => 'Phase 1 (Mois 1-3): Sensibilisation | Phase 2 (Mois 4-8): Formation et espaces sûrs | Phase 3 (Mois 9-12): Plaidoyer et évaluation',
                'budget' => '150,000 USD (Personnel: 45%, Activités: 35%, Communication: 15%, Admin: 5%)',
                'partners' => 'Ministère des Affaires Sociales, ONU Femmes, Associations féminines locales, Radios communautaires',
                'indicators' => "- Nombre de sessions de sensibilisation réalisées\n- Nombre de personnes formées\n- Taux de dénonciation des VBG\n- Nombre de survivantes prises en charge\n- Adoption de politiques locales de protection",
                'progress' => 65,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(8),
                'end_date' => Carbon::now()->addMonths(4),
                'is_active' => true
            ],

            // EDUCATION
            [
                'title' => 'Plaidoyer pour l\'éducation des filles en zones rurales',
                'theme' => 'education',
                'objective' => 'Augmenter de 50% le taux de scolarisation des filles dans 30 villages ruraux et plaider pour des infrastructures scolaires adaptées',
                'target_audience' => 'Ministère de l\'Éducation, parents, chefs traditionnels, ONGs partenaires',
                'key_messages' => "- L'éducation des filles est un droit fondamental\n- Une fille éduquée transforme sa communauté\n- Investir dans l'éducation des filles = développement durable\n- Les barrières culturelles peuvent être surmontées",
                'activities' => "- Dialogue communautaire avec parents et leaders (30 villages)\n- Campagne médiatique #EducationPourToutes\n- Plaidoyer auprès du Ministère de l'Éducation\n- Distribution de kits scolaires (500 filles)\n- Construction de latrines séparées (15 écoles)",
                'timeline' => 'Année 1: Sensibilisation et infrastructure | Année 2: Suivi et expansion',
                'budget' => '280,000 USD (Infrastructure: 50%, Kits scolaires: 20%, Campagne: 20%, Suivi: 10%)',
                'partners' => 'UNICEF, Ministère de l\'Éducation, Associations de parents d\'élèves, Save the Children',
                'indicators' => "- Taux de scolarisation des filles\n- Taux d'abandon scolaire\n- Nombre d'infrastructures construites\n- Adoption de politiques éducatives favorables\n- Changement de perception communautaire",
                'progress' => 45,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(5),
                'end_date' => Carbon::now()->addMonths(19),
                'is_active' => true
            ],

            // SANTÉ
            [
                'title' => 'Accès universel aux soins de santé primaires',
                'theme' => 'health',
                'objective' => 'Plaider pour l\'extension de la couverture sanitaire universelle et l\'amélioration de l\'accès aux soins dans les zones rurales',
                'target_audience' => 'Ministère de la Santé, parlementaires, bailleurs de fonds, organisations de la société civile',
                'key_messages' => "- La santé est un droit, pas un privilège\n- Les zones rurales méritent des services de qualité\n- Prévention = économies pour le système de santé\n- Investir dans la santé = investir dans le capital humain",
                'activities' => "- Production de données probantes (enquête 5000 ménages)\n- Plaidoyer parlementaire (10 sessions)\n- Coalition avec 25 ONGs santé\n- Campagne médiatique nationale\n- Organisation de forums publics (5 régions)",
                'timeline' => 'Phase préparatoire (3 mois) | Phase de plaidoyer intensif (9 mois) | Phase de suivi (6 mois)',
                'budget' => '320,000 USD (Recherche: 30%, Plaidoyer: 40%, Campagne: 20%, Coordination: 10%)',
                'partners' => 'OMS, Ministère de la Santé, Réseau des ONGs santé, Médias nationaux',
                'indicators' => "- Nombre de sessions parlementaires influencées\n- Budget santé augmenté de X%\n- Adoption de politiques favorables\n- Couverture médiatique obtenue\n- Engagement des décideurs",
                'progress' => 30,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(3),
                'end_date' => Carbon::now()->addMonths(15),
                'is_active' => true
            ],

            // NUTRITION
            [
                'title' => 'Lutte contre la malnutrition infantile',
                'theme' => 'nutrition',
                'objective' => 'Réduire le taux de malnutrition aiguë de 15% à moins de 10% dans les zones prioritaires via le plaidoyer et la mobilisation communautaire',
                'target_audience' => 'Gouvernement, bailleurs internationaux, communautés, agents de santé',
                'key_messages' => "- Les 1000 premiers jours sont cruciaux\n- La malnutrition freine le développement national\n- Solutions locales existent et fonctionnent\n- Investissement rentable: 1$ investi = 16$ de retour",
                'activities' => "- Documentation de bonnes pratiques locales\n- Plaidoyer budgétaire (augmentation ligne nutrition)\n- Formation de 200 agents communautaires\n- Jardins nutritionnels dans 40 villages\n- Campagne ANJE (Alimentation du Nourrisson et Jeune Enfant)",
                'timeline' => 'Tri 1: Documentation | Tri 2-3: Plaidoyer et formation | Tri 4: Jardins et campagne | Année 2: Consolidation',
                'budget' => '195,000 USD (Formation: 30%, Jardins: 25%, Plaidoyer: 25%, Campagne: 15%, Monitoring: 5%)',
                'partners' => 'PAM, UNICEF, Ministère de la Santé, ONGs nutrition, Organisations paysannes',
                'indicators' => "- Taux de malnutrition aiguë globale\n- Budget nutrition national\n- Nombre d'agents formés actifs\n- Production jardins nutritionnels\n- Adoption pratiques ANJE",
                'progress' => 55,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(6),
                'end_date' => Carbon::now()->addMonths(18),
                'is_active' => true
            ],

            // WASH
            [
                'title' => 'Eau potable et assainissement pour tous',
                'theme' => 'wash',
                'objective' => 'Plaider pour l\'allocation de 5% du budget national au secteur WASH et améliorer l\'accès à l\'eau potable dans 50 communautés',
                'target_audience' => 'Ministère de l\'Eau, Ministère des Finances, collectivités locales, partenaires techniques',
                'key_messages' => "- L'eau c'est la vie, l'assainissement c'est la dignité\n- Maladies hydriques = coûts énormes pour l'économie\n- Technologies simples, impact durable\n- Droits humains à l'eau et l'assainissement",
                'activities' => "- Cartographie des besoins WASH (100 villages)\n- Plaidoyer budgétaire auprès Ministère Finances\n- Construction de 25 forages communautaires\n- Formation de 50 comités de gestion d'eau\n- Campagne d'hygiène et assainissement total",
                'timeline' => 'Phase 1 (6 mois): Cartographie et plaidoyer | Phase 2 (12 mois): Construction et formation | Phase 3 (6 mois): Suivi-évaluation',
                'budget' => '450,000 USD (Infrastructure: 60%, Plaidoyer: 15%, Formation: 15%, Campagne: 10%)',
                'partners' => 'UNICEF, Hydraulique Villageoise, Ministère de l\'Eau, ONGs WASH',
                'indicators' => "- % budget national alloué à WASH\n- Nombre de personnes avec accès eau potable\n- Taux de fonctionnalité des ouvrages\n- Adoption pratiques d'hygiène\n- Politiques WASH adoptées",
                'progress' => 40,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(4),
                'end_date' => Carbon::now()->addMonths(20),
                'is_active' => true
            ],

            // MOYENS DE SUBSISTANCE
            [
                'title' => 'Autonomisation économique des femmes rurales',
                'theme' => 'livelihoods',
                'objective' => 'Plaider pour des politiques favorisant l\'entrepreneuriat féminin et soutenir 500 femmes dans le lancement de micro-entreprises',
                'target_audience' => 'Ministère de l\'Économie, institutions de microfinance, coopératives féminines, bailleurs',
                'key_messages' => "- Femmes rurales = piliers de l'économie\n- Accès au crédit = autonomisation réelle\n- Entrepreneuses = développement inclusif\n- Investir dans les femmes = réduire la pauvreté",
                'activities' => "- Étude sur barrières économiques femmes rurales\n- Plaidoyer pour réforme lois foncières\n- Formation entrepreneuriale (500 femmes)\n- Facilitation accès microcrédits\n- Création de 20 coopératives féminines",
                'timeline' => 'Année 1: Étude, plaidoyer, formations | Année 2: Microcrédits et coopératives | Année 3: Consolidation',
                'budget' => '380,000 USD (Formations: 30%, Microcrédits: 35%, Plaidoyer: 20%, Étude: 10%, Suivi: 5%)',
                'partners' => 'ONU Femmes, Ministère de l\'Économie, Institutions de microfinance, Réseau des coopératives',
                'indicators' => "- Nombre de femmes formées\n- Taux de survie des micro-entreprises\n- Revenus moyens générés\n- Réformes législatives adoptées\n- Taux d'accès au crédit",
                'progress' => 25,
                'status' => 'planning',
                'start_date' => Carbon::now()->addMonths(1),
                'end_date' => Carbon::now()->addMonths(37),
                'is_active' => true
            ],

            // CLIMAT
            [
                'title' => 'Adaptation au changement climatique',
                'theme' => 'climate',
                'objective' => 'Plaider pour l\'intégration de l\'adaptation climatique dans les politiques nationales et renforcer la résilience de 30 communautés vulnérables',
                'target_audience' => 'Ministère de l\'Environnement, Parlement, bailleurs climat, communautés agricoles',
                'key_messages' => "- Le climat change, adaptons-nous maintenant\n- Communautés vulnérables en première ligne\n- Solutions basées sur la nature fonctionnent\n- Financement climat = justice climatique",
                'activities' => "- Recherche sur vulnérabilités climatiques locales\n- Plaidoyer pour Plan National d'Adaptation\n- Techniques agriculture climato-intelligente (30 villages)\n- Reboisement communautaire (100 000 arbres)\n- Mobilisation fonds vert climat",
                'timeline' => 'Phase 1 (6 mois): Recherche et plaidoyer | Phase 2 (18 mois): Mise en œuvre terrain | Phase 3 (12 mois): Capitalisation',
                'budget' => '520,000 USD (Recherche: 15%, Plaidoyer: 20%, Agriculture: 30%, Reboisement: 25%, Admin: 10%)',
                'partners' => 'PNUD, Ministère de l\'Environnement, FAO, ONGs environnement, Communautés agricoles',
                'indicators' => "- Plan National d'Adaptation adopté\n- Financement climat mobilisé\n- Hectares reboisés\n- Rendements agricoles améliorés\n- Résilience communautaire accrue",
                'progress' => 20,
                'status' => 'planning',
                'start_date' => Carbon::now()->addMonths(2),
                'end_date' => Carbon::now()->addMonths(38),
                'is_active' => true
            ],

            // GOUVERNANCE
            [
                'title' => 'Transparence et redevabilité dans l\'aide humanitaire',
                'theme' => 'governance',
                'objective' => 'Renforcer la transparence dans l\'utilisation des fonds humanitaires et promouvoir la participation communautaire dans les décisions',
                'target_audience' => 'ONGs humanitaires, bailleurs, gouvernement, communautés bénéficiaires, médias',
                'key_messages' => "- L'aide doit bénéficier réellement aux vulnérables\n- Transparence = efficacité et confiance\n- Bénéficiaires ont droit à l'information\n- Redevabilité mutuelle = meilleure aide",
                'activities' => "- Élaboration charte de transparence sectorielle\n- Formation de 100 comités communautaires de suivi\n- Plateforme web de publication financière\n- Mécanismes de plaintes accessibles (10 zones)\n- Audits participatifs semestriels",
                'timeline' => 'Semestre 1: Charte et formations | Semestre 2: Plateforme et mécanismes | Année 2-3: Opérationnalisation et audits',
                'budget' => '240,000 USD (Plateforme: 25%, Formations: 30%, Mécanismes plaintes: 20%, Audits: 15%, Coordination: 10%)',
                'partners' => 'Transparency International, ONGs humanitaires, Gouvernement, Réseaux communautaires',
                'indicators' => "- Charte adoptée par X organisations\n- % fonds publiés en ligne\n- Nombre de plaintes traitées\n- Satisfaction bénéficiaires\n- Cas de fraude détectés/résolus",
                'progress' => 35,
                'status' => 'ongoing',
                'start_date' => Carbon::now()->subMonths(4),
                'end_date' => Carbon::now()->addMonths(32),
                'is_active' => true
            ],

            // CAMPAGNE COMPLÉTÉE
            [
                'title' => 'Abolition du mariage précoce - Phase 1',
                'theme' => 'protection',
                'objective' => 'Obtenir l\'adoption d\'une loi fixant l\'âge minimum du mariage à 18 ans et sensibiliser 100 communautés',
                'target_audience' => 'Parlementaires, leaders religieux, chefs traditionnels, parents, jeunes',
                'key_messages' => "- L'enfance n'est pas à vendre\n- Mariage précoce = violation des droits de l'enfant\n- Éducation plutôt que mariage\n- Protégeons nos filles, construisons l'avenir",
                'activities' => "- Lobbying parlementaire (18 mois)\n- Dialogue avec leaders religieux (50 sessions)\n- Campagne médiatique nationale\n- Sensibilisation communautaire (100 villages)\n- Formation agents de protection (200)",
                'timeline' => 'Phase 1: Lobby et dialogue | Phase 2: Campagne médiatique | Phase 3: Sensibilisation terrain',
                'budget' => '175,000 USD (entièrement dépensé)',
                'partners' => 'Plan International, UNICEF, Ministère Justice, Réseaux religieux, Médias',
                'indicators' => "✅ Loi adoptée en novembre 2024\n✅ 120 communautés sensibilisées\n✅ 250 agents formés\n✅ 500 000+ personnes touchées par campagne\n✅ Réduction de 30% mariages précoces zones pilotes",
                'progress' => 100,
                'status' => 'completed',
                'start_date' => Carbon::now()->subMonths(24),
                'end_date' => Carbon::now()->subMonths(2),
                'is_active' => false
            ],

            // CAMPAGNE EN ATTENTE
            [
                'title' => 'Accès aux services juridiques pour les réfugiés',
                'theme' => 'protection',
                'objective' => 'Plaider pour l\'accès équitable à la justice pour les réfugiés et déplacés internes dans 3 régions prioritaires',
                'target_audience' => 'Ministère de la Justice, HCR, organisations de réfugiés, barreaux des avocats',
                'key_messages' => "- Justice pour tous, y compris les déplacés\n- Accès au droit = protection effective\n- Réfugiés ont des droits justiciables\n- Aide juridique = dignité restaurée",
                'activities' => "- Cartographie barrières d'accès à la justice\n- Plaidoyer pour cadre légal favorable\n- Création de 5 cliniques juridiques mobiles\n- Formation de 50 parajuristes réfugiés\n- Sensibilisation juridique (camps et sites)",
                'timeline' => 'En attente de financement - Durée prévue: 24 mois',
                'budget' => '290,000 USD (recherche de financement en cours)',
                'partners' => 'HCR, Ministère de la Justice, Barreau, ONGs protection',
                'indicators' => "- Nombre de personnes assistées juridiquement\n- Taux de résolution des cas\n- Réformes légales adoptées\n- Cliniques juridiques fonctionnelles\n- Parajuristes actifs",
                'progress' => 5,
                'status' => 'on_hold',
                'start_date' => Carbon::now()->addMonths(6),
                'end_date' => Carbon::now()->addMonths(30),
                'is_active' => false
            ]
        ];

        foreach ($campaigns as $campaign) {
            AdvocacyCampaign::create($campaign);
        }

        $this->command->info('✅ 10 campagnes de plaidoyer créées avec succès!');
        $this->command->info('   - 5 en cours (ongoing)');
        $this->command->info('   - 2 en planification (planning)');
        $this->command->info('   - 1 complétée (completed)');
        $this->command->info('   - 1 en attente (on_hold)');
        $this->command->info('   - 1 archivée (inactive)');
    }
}