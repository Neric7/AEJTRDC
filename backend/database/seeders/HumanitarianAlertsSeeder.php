<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HumanitarianAlert;
use Carbon\Carbon;

class HumanitarianAlertsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alerts = [
            [
                'title' => 'Cyclone Batsirai - Côte Est',
                'alert_type' => 'natural_disaster',
                'severity' => 'critical',
                'location' => 'Toamasina, Mahanoro, Mananjary',
                'affected_population' => '150,000 personnes',
                'description' => 'Le cyclone Batsirai a touché la côte est de Madagascar avec des vents violents dépassant 165 km/h. Des inondations massives ont été signalées dans plusieurs districts. De nombreuses habitations ont été détruites et les infrastructures sont gravement endommagées.',
                'needs_identified' => 'Abris d\'urgence, kits alimentaires, eau potable, couvertures, soins médicaux d\'urgence, réparation des toits, accès à l\'électricité.',
                'response_actions' => 'Distribution de 5000 kits d\'urgence en cours. Mise en place de 15 centres d\'hébergement temporaires. Équipes médicales mobiles déployées. Évaluation des dégâts en cours avec les autorités locales.',
                'contact_person' => 'Rakoto Jean-Pierre',
                'contact_phone' => '+261 34 12 345 67',
                'start_date' => Carbon::now()->subDays(3),
                'end_date' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Sécheresse sévère - Sud Madagascar',
                'alert_type' => 'food_insecurity',
                'severity' => 'critical',
                'location' => 'Ambovombe, Bekily, Tsihombe',
                'affected_population' => '1,200,000 personnes',
                'description' => 'La région sud fait face à une sécheresse sans précédent depuis 40 ans. Les récoltes ont échoué pour la troisième année consécutive. La malnutrition aiguë sévère touche plus de 30% des enfants de moins de 5 ans.',
                'needs_identified' => 'Aide alimentaire d\'urgence, eau potable, semences résistantes à la sécheresse, suppléments nutritionnels pour enfants, accès aux soins de santé.',
                'response_actions' => 'Programme de distribution alimentaire pour 500,000 bénéficiaires. Installation de points d\'eau potable. Centres de nutrition thérapeutique opérationnels. Sensibilisation sur les pratiques agricoles résilientes.',
                'contact_person' => 'Randrianasolo Marie',
                'contact_phone' => '+261 33 98 765 43',
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now()->addMonths(4),
                'is_active' => true,
            ],
            [
                'title' => 'Épidémie de choléra - Région Analamanga',
                'alert_type' => 'epidemic',
                'severity' => 'high',
                'location' => 'Antananarivo, Ambohidratrimo',
                'affected_population' => '25,000 personnes à risque',
                'description' => 'Une épidémie de choléra a été déclarée dans plusieurs quartiers de la capitale et ses environs. Plus de 500 cas confirmés et 15 décès signalés. La contamination de l\'eau est la principale cause.',
                'needs_identified' => 'Traitement médical, kits d\'hygiène, purification de l\'eau, sensibilisation à l\'hygiène, points de réhydratation orale.',
                'response_actions' => 'Campagne de vaccination en cours (50,000 doses distribuées). Distribution de 10,000 kits d\'hygiène. Chloration des points d\'eau. Unités de traitement du choléra opérationnelles dans 5 centres de santé.',
                'contact_person' => 'Dr. Andriamihaja Paul',
                'contact_phone' => '+261 32 45 678 90',
                'start_date' => Carbon::now()->subDays(15),
                'end_date' => Carbon::now()->addDays(30),
                'is_active' => true,
            ],
            [
                'title' => 'Déplacement de population - Conflit foncier',
                'alert_type' => 'displacement',
                'severity' => 'medium',
                'location' => 'District de Morondava',
                'affected_population' => '3,500 personnes déplacées',
                'description' => 'Des tensions foncières ont entraîné le déplacement forcé de plusieurs villages. Les familles ont fui vers des zones plus sûres mais manquent d\'abris et de moyens de subsistance.',
                'needs_identified' => 'Abris temporaires, assistance alimentaire, protection juridique, médiation communautaire, accès à l\'éducation pour les enfants.',
                'response_actions' => 'Installation d\'un camp temporaire avec 200 tentes. Distribution alimentaire mensuelle. Sessions de médiation avec les autorités locales et les chefs traditionnels. Mise en place d\'une école temporaire.',
                'contact_person' => 'Razafy Solofo',
                'contact_phone' => '+261 34 56 789 01',
                'start_date' => Carbon::now()->subDays(20),
                'end_date' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Inondations - Vallée du Betsiboka',
                'alert_type' => 'natural_disaster',
                'severity' => 'high',
                'location' => 'Maevatanana, Kandreho',
                'affected_population' => '45,000 personnes',
                'description' => 'Des pluies torrentielles ont provoqué le débordement de la rivière Betsiboka. Plusieurs villages sont sous les eaux. Les routes sont coupées, isolant les communautés.',
                'needs_identified' => 'Évacuation d\'urgence, bateaux de secours, nourriture, eau potable, abris temporaires, soins médicaux.',
                'response_actions' => 'Évacuation de 5,000 personnes vers des zones plus élevées. Distribution de 3,000 kits alimentaires. Équipes de secouristes déployées avec bateaux. Évaluation rapide des besoins en cours.',
                'contact_person' => 'Rasoamanana Luc',
                'contact_phone' => '+261 33 12 345 78',
                'start_date' => Carbon::now()->subDays(5),
                'end_date' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Crise alimentaire - Région Atsimo Andrefana',
                'alert_type' => 'food_insecurity',
                'severity' => 'high',
                'location' => 'Toliara, Sakaraha, Betioky',
                'affected_population' => '800,000 personnes',
                'description' => 'La période de soudure s\'aggrave avec l\'échec des dernières récoltes. Les taux de malnutrition augmentent de façon alarmante, particulièrement chez les enfants et les femmes enceintes.',
                'needs_identified' => 'Distributions alimentaires d\'urgence, supplémentation nutritionnelle, semences et outils agricoles, programme cash-for-work.',
                'response_actions' => 'Distribution de vivres pour 250,000 personnes. Centres de nutrition thérapeutique dans 12 communes. Programme de cantines scolaires pour 30,000 enfants. Formation sur les techniques de conservation des aliments.',
                'contact_person' => 'Raharijaona Hanta',
                'contact_phone' => '+261 34 87 654 32',
                'start_date' => Carbon::now()->subDays(45),
                'end_date' => Carbon::now()->addMonths(3),
                'is_active' => true,
            ],
            [
                'title' => 'Défaillance infrastructure - Effondrement pont',
                'alert_type' => 'infrastructure',
                'severity' => 'medium',
                'location' => 'Route Nationale 7, Antsirabe',
                'affected_population' => '100,000 personnes affectées',
                'description' => 'L\'effondrement du pont principal a coupé l\'accès à plusieurs communes rurales. L\'approvisionnement en denrées et l\'accès aux services de santé sont gravement compromis.',
                'needs_identified' => 'Pont temporaire, transport d\'urgence pour les malades, approvisionnement en carburant et vivres, communication avec les communautés isolées.',
                'response_actions' => 'Construction d\'un pont provisoire en cours (délai 15 jours). Mise en place d\'un service de bac pour le passage d\'urgence. Stocks de vivres pré-positionnés dans les communes isolées. Ambulance fluviale opérationnelle.',
                'contact_person' => 'Rakotonirina Fidy',
                'contact_phone' => '+261 32 98 765 41',
                'start_date' => Carbon::now()->subDays(10),
                'end_date' => Carbon::now()->addDays(20),
                'is_active' => true,
            ],
            [
                'title' => 'Invasion acridienne - Menace récoltes',
                'alert_type' => 'natural_disaster',
                'severity' => 'medium',
                'location' => 'Menabe, Melaky',
                'affected_population' => '200,000 agriculteurs',
                'description' => 'Des essaims de criquets pèlerins menacent les cultures dans les régions du centre-ouest. Si rien n\'est fait, les récoltes pourraient être détruites à 70%.',
                'needs_identified' => 'Pesticides biologiques, équipements de pulvérisation, formation des agriculteurs, surveillance des essaims, aide alimentaire préventive.',
                'response_actions' => 'Campagne de lutte antiacridienne avec drones et équipes terrestres. Distribution de 500 pulvérisateurs aux agriculteurs. Surveillance par satellite des mouvements d\'essaims. Sensibilisation communautaire active.',
                'contact_person' => 'Andrianaivoarivelo Nirina',
                'contact_phone' => '+261 33 45 678 92',
                'start_date' => Carbon::now()->subDays(7),
                'end_date' => Carbon::now()->addDays(45),
                'is_active' => true,
            ],
            [
                'title' => 'Éboulement de terrain - Route bloquée',
                'alert_type' => 'infrastructure',
                'severity' => 'low',
                'location' => 'RN2, Andasibe',
                'affected_population' => '15,000 personnes',
                'description' => 'Un éboulement a bloqué la route nationale 2. Les travaux de déblayage sont en cours mais les déplacements sont perturbés.',
                'needs_identified' => 'Équipement de déblayage, itinéraire alternatif, communication aux usagers.',
                'response_actions' => 'Équipes de déblayage mobilisées. Route alternative balisée. Information diffusée via radios locales. Travaux estimés à 3 jours.',
                'contact_person' => 'Rakotondrabe Hery',
                'contact_phone' => '+261 34 23 456 78',
                'start_date' => Carbon::now()->subDays(2),
                'end_date' => Carbon::now()->addDays(3),
                'is_active' => true,
            ],
            [
                'title' => 'Tension communautaire - Conflit pastoral (RÉSOLU)',
                'alert_type' => 'conflict',
                'severity' => 'low',
                'location' => 'District d\'Ihosy',
                'affected_population' => '5,000 personnes',
                'description' => 'Des tensions entre éleveurs et agriculteurs avaient éclaté suite à la divagation de troupeaux dans les champs cultivés. Situation résolue grâce à la médiation.',
                'needs_identified' => 'Médiation communautaire, accord de pâturage, sensibilisation.',
                'response_actions' => 'Médiation réussie entre les parties. Accord de pâturage signé. Sessions de sensibilisation organisées. Comité de suivi mis en place.',
                'contact_person' => 'Rabemananjara Michel',
                'contact_phone' => '+261 33 67 890 12',
                'start_date' => Carbon::now()->subDays(30),
                'end_date' => Carbon::now()->subDays(5),
                'is_active' => false,
            ],
        ];

        foreach ($alerts as $alert) {
            HumanitarianAlert::create($alert);
        }

        $this->command->info('✅ ' . count($alerts) . ' alertes humanitaires créées avec succès !');
    }
}