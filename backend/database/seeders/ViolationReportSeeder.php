<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ViolationReport;
use Carbon\Carbon;

class ViolationReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reports = [
            // 1. Safeguarding - URGENT
            [
                'reference' => 'VR-2024-001',
                'category' => 'safeguarding',
                'title' => 'Suspicion d\'abus sur mineur dans un centre d\'accueil',
                'description' => 'Une famille a signalé des comportements inappropriés d\'un membre du personnel envers son enfant lors des activités éducatives du samedi. L\'enfant présente des signes de détresse émotionnelle et refuse de retourner au centre. Les parents demandent une enquête immédiate.',
                'reporter_type' => 'beneficiary',
                'reporter_info' => 'Famille anonyme - Contact établi via hotline',
                'location' => 'Centre d\'accueil de Kinshasa, Quartier Lemba',
                'incident_date' => Carbon::now()->subDays(3),
                'reported_date' => Carbon::now()->subDays(2),
                'status' => 'investigating',
                'priority' => 'urgent',
                'assigned_to' => 'Dr. Marie Kalala - Responsable Safeguarding',
                'actions_taken' => 'Suspension immédiate du membre du personnel concerné. Entretiens confidentiels avec la famille et l\'enfant prévus. Coordinateur protection de l\'enfance informé. Investigation en cours avec protocole Child Protection.',
                'notes' => 'URGENT - Respecter strictement la confidentialité. Suivi psychologique de l\'enfant assuré. Rapport au coordinateur protection dans 48h.'
            ],

            // 2. Corruption - HIGH
            [
                'reference' => 'VR-2024-002',
                'category' => 'corruption',
                'title' => 'Détournement de fonds dans un projet communautaire',
                'description' => 'Un audit interne a révélé des incohérences dans les dépenses du projet d\'approvisionnement en eau potable. Des factures gonflées et des paiements à des fournisseurs fictifs ont été identifiés. Montant estimé du détournement : 8 500 USD.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Équipe d\'audit interne',
                'location' => 'Projet Eau Potable - Province du Kasaï',
                'incident_date' => Carbon::now()->subMonths(2),
                'reported_date' => Carbon::now()->subDays(10),
                'status' => 'investigating',
                'priority' => 'high',
                'assigned_to' => 'Unité Conformité & Audit',
                'actions_taken' => 'Gel temporaire des décaissements du projet. Saisine de l\'unité anti-fraude. Collection de toutes les pièces justificatives et factures. Entretiens avec le gestionnaire de projet et les fournisseurs.',
                'notes' => 'Collaboration avec les autorités locales en cours. Documentation complète nécessaire pour procédures légales.'
            ],

            // 3. Discrimination - MEDIUM
            [
                'reference' => 'VR-2024-003',
                'category' => 'discrimination',
                'title' => 'Discrimination ethnique dans le recrutement',
                'description' => 'Plusieurs candidats qualifiés issus de minorités ethniques ont été systématiquement écartés lors des derniers recrutements pour des postes de terrain. Les critères de sélection semblent biaisés en faveur d\'un groupe ethnique spécifique.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Personnel RH anonyme',
                'location' => 'Bureau de Goma - Province du Nord-Kivu',
                'incident_date' => Carbon::now()->subDays(45),
                'reported_date' => Carbon::now()->subDays(15),
                'status' => 'pending',
                'priority' => 'medium',
                'assigned_to' => null,
                'actions_taken' => null,
                'notes' => 'Nécessite investigation par RH et Direction. Révision des processus de recrutement recommandée.'
            ],

            // 4. Harassment - HIGH
            [
                'reference' => 'VR-2024-004',
                'category' => 'harassment',
                'title' => 'Harcèlement sexuel au travail',
                'description' => 'Une employée a rapporté des avances répétées et non désirées de la part de son superviseur direct, incluant des commentaires déplacés, des invitations insistantes et des messages inappropriés via WhatsApp. La situation crée un environnement de travail hostile.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Employée - Identité protégée',
                'location' => 'Bureau régional de Lubumbashi',
                'incident_date' => Carbon::now()->subDays(60),
                'reported_date' => Carbon::now()->subDays(5),
                'status' => 'investigating',
                'priority' => 'high',
                'assigned_to' => 'Cellule Genre & Protection',
                'actions_taken' => 'Réaffectation temporaire de l\'employée pour garantir sa sécurité. Entretien confidentiel réalisé. Convocation du superviseur pour audition. Mesures conservatoires appliquées.',
                'notes' => 'CONFIDENTIEL - Protection de la victime prioritaire. Possibilité de sanctions disciplinaires graves.'
            ],

            // 5. Fraud - MEDIUM
            [
                'reference' => 'VR-2024-005',
                'category' => 'fraud',
                'title' => 'Falsification de documents administratifs',
                'description' => 'Des certificats de formation professionnelle falsifiés ont été découverts parmi les documents de qualification de certains bénéficiaires du programme de renforcement des capacités. Cela remet en question l\'intégrité du processus de sélection.',
                'reporter_type' => 'partner',
                'reporter_info' => 'ONG partenaire locale - ASBL Tumaini',
                'location' => 'Programme formation - Bukavu',
                'incident_date' => Carbon::now()->subDays(20),
                'reported_date' => Carbon::now()->subDays(8),
                'status' => 'pending',
                'priority' => 'medium',
                'assigned_to' => null,
                'actions_taken' => null,
                'notes' => 'Vérification de tous les dossiers de candidature nécessaire. Révision des critères d\'éligibilité.'
            ],

            // 6. Misconduct - LOW
            [
                'reference' => 'VR-2024-006',
                'category' => 'misconduct',
                'title' => 'Utilisation inappropriée des véhicules de l\'organisation',
                'description' => 'Des véhicules de service ont été utilisés à des fins personnelles le week-end, notamment pour des déplacements familiaux et des activités commerciales privées. Le carburant est imputé au budget de l\'organisation.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Équipe logistique',
                'location' => 'Bureau de Kisangani',
                'incident_date' => Carbon::now()->subDays(30),
                'reported_date' => Carbon::now()->subDays(12),
                'status' => 'resolved',
                'priority' => 'low',
                'assigned_to' => 'Responsable Logistique',
                'actions_taken' => 'Rappel à l\'ordre des conducteurs concernés. Mise en place d\'un système de suivi GPS sur les véhicules. Révision du règlement intérieur sur l\'utilisation des biens de l\'organisation. Remboursement du carburant exigé.',
                'notes' => 'Problème résolu. Monitoring renforcé. Aucune récidive constatée depuis 15 jours.'
            ],

            // 7. Safeguarding - URGENT (Résolu)
            [
                'reference' => 'VR-2024-007',
                'category' => 'safeguarding',
                'title' => 'Travail des enfants dans un projet agricole partenaire',
                'description' => 'Des enfants de moins de 15 ans ont été observés effectuant des travaux agricoles lourds dans une ferme soutenue par l\'organisation. Violation claire des politiques de protection de l\'enfance et des conventions internationales.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Agent de suivi terrain',
                'location' => 'Projet agricole - Territoire de Mwenga',
                'incident_date' => Carbon::now()->subMonths(1),
                'reported_date' => Carbon::now()->subDays(25),
                'status' => 'resolved',
                'priority' => 'urgent',
                'assigned_to' => 'Coordinateur Protection',
                'actions_taken' => 'Suspension immédiate du partenariat avec la ferme concernée. Retrait des enfants et scolarisation assurée. Sensibilisation communautaire sur les droits de l\'enfant réalisée. Nouveau protocole de monitoring des partenaires instauré.',
                'notes' => 'Cas résolu. Les 7 enfants sont désormais scolarisés. Suivi trimestriel mis en place. Partenaire radié définitivement.'
            ],

            // 8. Discrimination - LOW
            [
                'reference' => 'VR-2024-008',
                'category' => 'discrimination',
                'title' => 'Exclusion de personnes handicapées des activités',
                'description' => 'Les personnes à mobilité réduite sont régulièrement exclues des formations et activités communautaires en raison de l\'inaccessibilité des locaux. Absence de rampes d\'accès et de toilettes adaptées.',
                'reporter_type' => 'beneficiary',
                'reporter_info' => 'Association des personnes handicapées de Matadi',
                'location' => 'Centre communautaire - Matadi',
                'incident_date' => Carbon::now()->subMonths(3),
                'reported_date' => Carbon::now()->subDays(18),
                'status' => 'investigating',
                'priority' => 'low',
                'assigned_to' => 'Responsable Inclusion',
                'actions_taken' => 'Audit d\'accessibilité du centre en cours. Consultations avec des associations de personnes handicapées. Budget pour travaux d\'aménagement en cours de validation.',
                'notes' => 'Plan d\'action inclusif en préparation. Délai estimé : 3 mois pour travaux.'
            ],

            // 9. Corruption - URGENT
            [
                'reference' => 'VR-2024-009',
                'category' => 'corruption',
                'title' => 'Extorsion de pots-de-vin pour l\'accès aux services',
                'description' => 'Des bénéficiaires ont rapporté que certains membres du personnel exigent des paiements illégaux pour accélérer l\'accès aux distributions alimentaires et aux soins de santé. Montants variant entre 5 et 20 USD.',
                'reporter_type' => 'beneficiary',
                'reporter_info' => 'Groupe de bénéficiaires - Témoignages anonymes',
                'location' => 'Centre de distribution - Camp de Nyarugusu',
                'incident_date' => Carbon::now()->subDays(10),
                'reported_date' => Carbon::now()->subDays(3),
                'status' => 'pending',
                'priority' => 'urgent',
                'assigned_to' => null,
                'actions_taken' => null,
                'notes' => 'Investigation urgente requise. Suspicion sur 3 membres du personnel. Mise en place d\'un système de plainte anonyme recommandé.'
            ],

            // 10. Harassment - MEDIUM (Closed)
            [
                'reference' => 'VR-2024-010',
                'category' => 'harassment',
                'title' => 'Harcèlement moral et intimidation par un supérieur',
                'description' => 'Un coordinateur de programme a été accusé de comportement intimidant, de critiques humiliantes publiques, et de menaces de licenciement abusif envers plusieurs membres de son équipe.',
                'reporter_type' => 'staff',
                'reporter_info' => '3 employés - Plainte collective',
                'location' => 'Bureau de Kananga',
                'incident_date' => Carbon::now()->subMonths(4),
                'reported_date' => Carbon::now()->subMonths(3),
                'status' => 'closed',
                'priority' => 'medium',
                'assigned_to' => 'Direction RH',
                'actions_taken' => 'Enquête interne menée avec entretiens de 8 membres de l\'équipe. Formation sur le leadership bienveillant imposée au coordinateur. Plan d\'amélioration comportementale de 6 mois avec suivi RH mensuel. Avertissement formel inscrit au dossier.',
                'notes' => 'Cas clos. Amélioration constatée après 3 mois de suivi. Aucune nouvelle plainte.'
            ],

            // 11. Other - MEDIUM
            [
                'reference' => 'VR-2024-011',
                'category' => 'other',
                'title' => 'Non-respect des normes de sécurité sur chantier',
                'description' => 'Les ouvriers travaillant sur la construction d\'un centre de santé ne disposent pas d\'équipements de protection individuelle (casques, gants, harnais). Risques d\'accidents graves.',
                'reporter_type' => 'partner',
                'reporter_info' => 'Superviseur de chantier - Entreprise BATIMEX',
                'location' => 'Chantier Centre de Santé - Uvira',
                'incident_date' => Carbon::now()->subDays(7),
                'reported_date' => Carbon::now()->subDays(4),
                'status' => 'investigating',
                'priority' => 'medium',
                'assigned_to' => 'Responsable Sécurité',
                'actions_taken' => 'Arrêt temporaire des travaux. Commande d\'équipements de protection en urgence. Formation sécurité obligatoire pour tous les ouvriers prévue cette semaine.',
                'notes' => 'Reprise des travaux conditionnée à la conformité totale aux normes de sécurité.'
            ],

            // 12. Safeguarding - HIGH
            [
                'reference' => 'VR-2024-012',
                'category' => 'safeguarding',
                'title' => 'Négligence dans la supervision d\'enfants lors d\'une sortie',
                'description' => 'Lors d\'une excursion éducative, 3 enfants se sont éloignés du groupe sans que le personnel ne s\'en aperçoive pendant plus de 30 minutes. Les enfants ont été retrouvés près d\'une zone dangereuse. Protocole de supervision non respecté.',
                'reporter_type' => 'staff',
                'reporter_info' => 'Coordinateur éducation',
                'location' => 'Programme éducatif - Kolwezi',
                'incident_date' => Carbon::now()->subDays(14),
                'reported_date' => Carbon::now()->subDays(13),
                'status' => 'resolved',
                'priority' => 'high',
                'assigned_to' => 'Responsable Safeguarding',
                'actions_taken' => 'Rappel immédiat des protocoles de sécurité à tout le personnel. Formation obligatoire sur la supervision des enfants. Ratio adulte/enfant augmenté pour toutes les activités. Politique de sorties révisée et approuvée.',
                'notes' => 'Heureusement aucun incident grave. Procédures renforcées. Pas de récidive depuis.'
            ]
        ];

        foreach ($reports as $report) {
            ViolationReport::create($report);
        }

        $this->command->info('✅ 12 signalements de violations créés avec succès !');
    }
}