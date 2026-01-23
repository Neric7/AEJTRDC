-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 22, 2026 at 04:37 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sitecongo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `advocacy_campaigns`
--

CREATE TABLE `advocacy_campaigns` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theme` enum('protection','education','health','nutrition','wash','livelihoods','climate','governance') COLLATE utf8mb4_unicode_ci NOT NULL,
  `objective` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_audience` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_messages` text COLLATE utf8mb4_unicode_ci,
  `activities` text COLLATE utf8mb4_unicode_ci,
  `timeline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `partners` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `indicators` text COLLATE utf8mb4_unicode_ci,
  `progress` int NOT NULL DEFAULT '0',
  `status` enum('planning','ongoing','completed','on_hold') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'planning',
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `advocacy_campaigns`
--

INSERT INTO `advocacy_campaigns` (`id`, `title`, `theme`, `objective`, `target_audience`, `key_messages`, `activities`, `timeline`, `budget`, `partners`, `indicators`, `progress`, `status`, `start_date`, `end_date`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Campagne contre les violences basées sur le genre', 'protection', 'Réduire de 40% les cas de VBG dans les zones ciblées et améliorer l\'accès aux services de prise en charge pour les survivantes', 'Communautés locales, leaders communautaires, forces de sécurité, organisations locales', '- Les VBG sont une violation des droits humains\n- Briser le silence sauve des vies\n- Les survivantes méritent respect et soutien\n- La communauté a un rôle à jouer dans la prévention', '- Sessions de sensibilisation communautaire (50 villages)\n- Formation de 100 leaders communautaires\n- Établissement de 10 espaces sûrs pour femmes\n- Campagne médiatique (radio, affiches)\n- Plaidoyer auprès des autorités locales', 'Phase 1 (Mois 1-3): Sensibilisation | Phase 2 (Mois 4-8): Formation et espaces sûrs | Phase 3 (Mois 9-12): Plaidoyer et évaluation', '150,000 USD (Personnel: 45%, Activités: 35%, Communication: 15%, Admin: 5%)', 'Ministère des Affaires Sociales, ONU Femmes, Associations féminines locales, Radios communautaires', '- Nombre de sessions de sensibilisation réalisées\n- Nombre de personnes formées\n- Taux de dénonciation des VBG\n- Nombre de survivantes prises en charge\n- Adoption de politiques locales de protection', 65, 'ongoing', '2025-05-10', '2026-05-10', 1, '2026-01-10 19:36:22', '2026-01-10 19:36:22', NULL),
(2, 'Plaidoyer pour l\'éducation des filles en zones rurales', 'education', 'Augmenter de 50% le taux de scolarisation des filles dans 30 villages ruraux et plaider pour des infrastructures scolaires adaptées', 'Ministère de l\'Éducation, parents, chefs traditionnels, ONGs partenaires', '- L\'éducation des filles est un droit fondamental\n- Une fille éduquée transforme sa communauté\n- Investir dans l\'éducation des filles = développement durable\n- Les barrières culturelles peuvent être surmontées', '- Dialogue communautaire avec parents et leaders (30 villages)\n- Campagne médiatique #EducationPourToutes\n- Plaidoyer auprès du Ministère de l\'Éducation\n- Distribution de kits scolaires (500 filles)\n- Construction de latrines séparées (15 écoles)', 'Année 1: Sensibilisation et infrastructure | Année 2: Suivi et expansion', '280,000 USD (Infrastructure: 50%, Kits scolaires: 20%, Campagne: 20%, Suivi: 10%)', 'UNICEF, Ministère de l\'Éducation, Associations de parents d\'élèves, Save the Children', '- Taux de scolarisation des filles\n- Taux d\'abandon scolaire\n- Nombre d\'infrastructures construites\n- Adoption de politiques éducatives favorables\n- Changement de perception communautaire', 45, 'ongoing', '2025-08-10', '2027-08-10', 1, '2026-01-10 19:36:22', '2026-01-10 19:36:22', NULL),
(3, 'Accès universel aux soins de santé primaires', 'health', 'Plaider pour l\'extension de la couverture sanitaire universelle et l\'amélioration de l\'accès aux soins dans les zones rurales', 'Ministère de la Santé, parlementaires, bailleurs de fonds, organisations de la société civile', '- La santé est un droit, pas un privilège\n- Les zones rurales méritent des services de qualité\n- Prévention = économies pour le système de santé\n- Investir dans la santé = investir dans le capital humain', '- Production de données probantes (enquête 5000 ménages)\n- Plaidoyer parlementaire (10 sessions)\n- Coalition avec 25 ONGs santé\n- Campagne médiatique nationale\n- Organisation de forums publics (5 régions)', 'Phase préparatoire (3 mois) | Phase de plaidoyer intensif (9 mois) | Phase de suivi (6 mois)', '320,000 USD (Recherche: 30%, Plaidoyer: 40%, Campagne: 20%, Coordination: 10%)', 'OMS, Ministère de la Santé, Réseau des ONGs santé, Médias nationaux', '- Nombre de sessions parlementaires influencées\n- Budget santé augmenté de X%\n- Adoption de politiques favorables\n- Couverture médiatique obtenue\n- Engagement des décideurs', 30, 'ongoing', '2025-10-10', '2027-04-10', 1, '2026-01-10 19:36:22', '2026-01-10 19:36:22', NULL),
(4, 'Lutte contre la malnutrition infantile', 'nutrition', 'Réduire le taux de malnutrition aiguë de 15% à moins de 10% dans les zones prioritaires via le plaidoyer et la mobilisation communautaire', 'Gouvernement, bailleurs internationaux, communautés, agents de santé', '- Les 1000 premiers jours sont cruciaux\n- La malnutrition freine le développement national\n- Solutions locales existent et fonctionnent\n- Investissement rentable: 1$ investi = 16$ de retour', '- Documentation de bonnes pratiques locales\n- Plaidoyer budgétaire (augmentation ligne nutrition)\n- Formation de 200 agents communautaires\n- Jardins nutritionnels dans 40 villages\n- Campagne ANJE (Alimentation du Nourrisson et Jeune Enfant)', 'Tri 1: Documentation | Tri 2-3: Plaidoyer et formation | Tri 4: Jardins et campagne | Année 2: Consolidation', '195,000 USD (Formation: 30%, Jardins: 25%, Plaidoyer: 25%, Campagne: 15%, Monitoring: 5%)', 'PAM, UNICEF, Ministère de la Santé, ONGs nutrition, Organisations paysannes', '- Taux de malnutrition aiguë globale\n- Budget nutrition national\n- Nombre d\'agents formés actifs\n- Production jardins nutritionnels\n- Adoption pratiques ANJE', 55, 'ongoing', '2025-07-10', '2027-07-10', 1, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(5, 'Eau potable et assainissement pour tous', 'wash', 'Plaider pour l\'allocation de 5% du budget national au secteur WASH et améliorer l\'accès à l\'eau potable dans 50 communautés', 'Ministère de l\'Eau, Ministère des Finances, collectivités locales, partenaires techniques', '- L\'eau c\'est la vie, l\'assainissement c\'est la dignité\n- Maladies hydriques = coûts énormes pour l\'économie\n- Technologies simples, impact durable\n- Droits humains à l\'eau et l\'assainissement', '- Cartographie des besoins WASH (100 villages)\n- Plaidoyer budgétaire auprès Ministère Finances\n- Construction de 25 forages communautaires\n- Formation de 50 comités de gestion d\'eau\n- Campagne d\'hygiène et assainissement total', 'Phase 1 (6 mois): Cartographie et plaidoyer | Phase 2 (12 mois): Construction et formation | Phase 3 (6 mois): Suivi-évaluation', '450,000 USD (Infrastructure: 60%, Plaidoyer: 15%, Formation: 15%, Campagne: 10%)', 'UNICEF, Hydraulique Villageoise, Ministère de l\'Eau, ONGs WASH', '- % budget national alloué à WASH\n- Nombre de personnes avec accès eau potable\n- Taux de fonctionnalité des ouvrages\n- Adoption pratiques d\'hygiène\n- Politiques WASH adoptées', 40, 'ongoing', '2025-09-10', '2027-09-10', 1, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(6, 'Autonomisation économique des femmes rurales', 'livelihoods', 'Plaider pour des politiques favorisant l\'entrepreneuriat féminin et soutenir 500 femmes dans le lancement de micro-entreprises', 'Ministère de l\'Économie, institutions de microfinance, coopératives féminines, bailleurs', '- Femmes rurales = piliers de l\'économie\n- Accès au crédit = autonomisation réelle\n- Entrepreneuses = développement inclusif\n- Investir dans les femmes = réduire la pauvreté', '- Étude sur barrières économiques femmes rurales\n- Plaidoyer pour réforme lois foncières\n- Formation entrepreneuriale (500 femmes)\n- Facilitation accès microcrédits\n- Création de 20 coopératives féminines', 'Année 1: Étude, plaidoyer, formations | Année 2: Microcrédits et coopératives | Année 3: Consolidation', '380,000 USD (Formations: 30%, Microcrédits: 35%, Plaidoyer: 20%, Étude: 10%, Suivi: 5%)', 'ONU Femmes, Ministère de l\'Économie, Institutions de microfinance, Réseau des coopératives', '- Nombre de femmes formées\n- Taux de survie des micro-entreprises\n- Revenus moyens générés\n- Réformes législatives adoptées\n- Taux d\'accès au crédit', 25, 'planning', '2026-02-10', '2029-02-10', 1, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(7, 'Adaptation au changement climatique', 'climate', 'Plaider pour l\'intégration de l\'adaptation climatique dans les politiques nationales et renforcer la résilience de 30 communautés vulnérables', 'Ministère de l\'Environnement, Parlement, bailleurs climat, communautés agricoles', '- Le climat change, adaptons-nous maintenant\n- Communautés vulnérables en première ligne\n- Solutions basées sur la nature fonctionnent\n- Financement climat = justice climatique', '- Recherche sur vulnérabilités climatiques locales\n- Plaidoyer pour Plan National d\'Adaptation\n- Techniques agriculture climato-intelligente (30 villages)\n- Reboisement communautaire (100 000 arbres)\n- Mobilisation fonds vert climat', 'Phase 1 (6 mois): Recherche et plaidoyer | Phase 2 (18 mois): Mise en œuvre terrain | Phase 3 (12 mois): Capitalisation', '520,000 USD (Recherche: 15%, Plaidoyer: 20%, Agriculture: 30%, Reboisement: 25%, Admin: 10%)', 'PNUD, Ministère de l\'Environnement, FAO, ONGs environnement, Communautés agricoles', '- Plan National d\'Adaptation adopté\n- Financement climat mobilisé\n- Hectares reboisés\n- Rendements agricoles améliorés\n- Résilience communautaire accrue', 20, 'planning', '2026-03-10', '2029-03-10', 1, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(8, 'Transparence et redevabilité dans l\'aide humanitaire', 'governance', 'Renforcer la transparence dans l\'utilisation des fonds humanitaires et promouvoir la participation communautaire dans les décisions', 'ONGs humanitaires, bailleurs, gouvernement, communautés bénéficiaires, médias', '- L\'aide doit bénéficier réellement aux vulnérables\n- Transparence = efficacité et confiance\n- Bénéficiaires ont droit à l\'information\n- Redevabilité mutuelle = meilleure aide', '- Élaboration charte de transparence sectorielle\n- Formation de 100 comités communautaires de suivi\n- Plateforme web de publication financière\n- Mécanismes de plaintes accessibles (10 zones)\n- Audits participatifs semestriels', 'Semestre 1: Charte et formations | Semestre 2: Plateforme et mécanismes | Année 2-3: Opérationnalisation et audits', '240,000 USD (Plateforme: 25%, Formations: 30%, Mécanismes plaintes: 20%, Audits: 15%, Coordination: 10%)', 'Transparency International, ONGs humanitaires, Gouvernement, Réseaux communautaires', '- Charte adoptée par X organisations\n- % fonds publiés en ligne\n- Nombre de plaintes traitées\n- Satisfaction bénéficiaires\n- Cas de fraude détectés/résolus', 35, 'ongoing', '2025-09-10', '2028-09-10', 1, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(9, 'Abolition du mariage précoce - Phase 1', 'protection', 'Obtenir l\'adoption d\'une loi fixant l\'âge minimum du mariage à 18 ans et sensibiliser 100 communautés', 'Parlementaires, leaders religieux, chefs traditionnels, parents, jeunes', '- L\'enfance n\'est pas à vendre\n- Mariage précoce = violation des droits de l\'enfant\n- Éducation plutôt que mariage\n- Protégeons nos filles, construisons l\'avenir', '- Lobbying parlementaire (18 mois)\n- Dialogue avec leaders religieux (50 sessions)\n- Campagne médiatique nationale\n- Sensibilisation communautaire (100 villages)\n- Formation agents de protection (200)', 'Phase 1: Lobby et dialogue | Phase 2: Campagne médiatique | Phase 3: Sensibilisation terrain', '175,000 USD (entièrement dépensé)', 'Plan International, UNICEF, Ministère Justice, Réseaux religieux, Médias', '✅ Loi adoptée en novembre 2024\n✅ 120 communautés sensibilisées\n✅ 250 agents formés\n✅ 500 000+ personnes touchées par campagne\n✅ Réduction de 30% mariages précoces zones pilotes', 100, 'completed', '2024-01-10', '2025-11-10', 0, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL),
(10, 'Accès aux services juridiques pour les réfugiés', 'protection', 'Plaider pour l\'accès équitable à la justice pour les réfugiés et déplacés internes dans 3 régions prioritaires', 'Ministère de la Justice, HCR, organisations de réfugiés, barreaux des avocats', '- Justice pour tous, y compris les déplacés\n- Accès au droit = protection effective\n- Réfugiés ont des droits justiciables\n- Aide juridique = dignité restaurée', '- Cartographie barrières d\'accès à la justice\n- Plaidoyer pour cadre légal favorable\n- Création de 5 cliniques juridiques mobiles\n- Formation de 50 parajuristes réfugiés\n- Sensibilisation juridique (camps et sites)', 'En attente de financement - Durée prévue: 24 mois', '290,000 USD (recherche de financement en cours)', 'HCR, Ministère de la Justice, Barreau, ONGs protection', '- Nombre de personnes assistées juridiquement\n- Taux de résolution des cas\n- Réformes légales adoptées\n- Cliniques juridiques fonctionnelles\n- Parajuristes actifs', 5, 'on_hold', '2026-07-10', '2028-07-10', 0, '2026-01-10 19:36:23', '2026-01-10 19:36:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint UNSIGNED NOT NULL,
  `news_id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `author_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `news_id`, `parent_id`, `user_id`, `author_name`, `author_email`, `content`, `status`, `ip_address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, NULL, NULL, 'Jean-Pierre Kalala', 'jp.kalala@example.com', 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.', 'approved', '127.0.0.101', '2025-11-11 08:28:52', '2025-12-10 08:28:52', NULL),
(2, 1, 1, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.', 'approved', '127.0.0.1', '2025-11-11 15:28:52', '2025-12-10 08:28:52', NULL),
(3, 1, NULL, NULL, 'Marie Nsimba', 'marie.nsimba@example.com', 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?', 'approved', '127.0.0.78', '2025-11-30 08:28:52', '2025-12-10 08:28:52', NULL),
(4, 1, 3, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org', 'approved', '127.0.0.1', '2025-11-30 16:28:52', '2025-12-10 08:28:52', NULL),
(5, 1, NULL, NULL, 'Patrick Lukombe', 'p.lukombe@example.com', 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.', 'approved', '127.0.0.127', '2025-12-03 08:28:52', '2025-12-10 08:28:52', NULL),
(6, 1, 5, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !', 'approved', '127.0.0.1', '2025-12-04 06:28:52', '2025-12-10 08:28:52', NULL),
(7, 1, NULL, NULL, 'Sylvie Mputu', 'sylvie.m@example.com', 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?', 'approved', '127.0.0.189', '2025-12-03 08:28:52', '2025-12-10 08:28:52', NULL),
(8, 1, NULL, NULL, 'Robert Tshimanga', 'robert.t@example.com', 'Très bon programme. J\'espère qu\'il sera étendu à d\'autres provinces également.', 'approved', '127.0.0.150', '2025-11-13 08:28:52', '2025-12-10 08:28:52', NULL),
(9, 2, NULL, NULL, 'Jean-Pierre Kalala', 'jp.kalala@example.com', 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.', 'approved', '127.0.0.147', '2025-11-25 08:28:52', '2025-12-10 08:28:52', NULL),
(10, 2, 9, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.', 'approved', '127.0.0.1', '2025-11-26 01:28:52', '2025-12-10 08:28:52', NULL),
(11, 2, NULL, NULL, 'Marie Nsimba', 'marie.nsimba@example.com', 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?', 'approved', '127.0.0.94', '2025-12-03 08:28:52', '2025-12-10 08:28:52', NULL),
(12, 2, 11, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org', 'approved', '127.0.0.1', '2025-12-04 09:28:52', '2025-12-10 08:28:52', NULL),
(13, 2, NULL, NULL, 'Patrick Lukombe', 'p.lukombe@example.com', 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.', 'approved', '127.0.0.78', '2025-12-09 08:28:52', '2025-12-10 08:28:52', NULL),
(14, 2, 13, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !', 'approved', '127.0.0.1', '2025-12-10 08:28:52', '2025-12-10 08:28:52', NULL),
(15, 2, NULL, NULL, 'Sylvie Mputu', 'sylvie.m@example.com', 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?', 'approved', '127.0.0.235', '2025-11-12 08:28:52', '2025-12-10 08:28:52', NULL),
(16, 3, NULL, NULL, 'Jean-Pierre Kalala', 'jp.kalala@example.com', 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.', 'approved', '127.0.0.165', '2025-11-12 08:28:52', '2025-12-10 08:28:52', NULL),
(17, 3, 16, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.', 'approved', '127.0.0.1', '2025-11-13 20:28:52', '2025-12-10 08:28:52', NULL),
(18, 3, NULL, NULL, 'Marie Nsimba', 'marie.nsimba@example.com', 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?', 'approved', '127.0.0.34', '2025-11-18 08:28:52', '2025-12-10 08:28:52', NULL),
(19, 3, 18, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org', 'approved', '127.0.0.1', '2025-11-20 05:28:52', '2025-12-10 08:28:52', NULL),
(20, 3, NULL, NULL, 'Patrick Lukombe', 'p.lukombe@example.com', 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.', 'approved', '127.0.0.141', '2025-11-25 08:28:52', '2025-12-10 08:28:52', NULL),
(21, 3, 20, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !', 'approved', '127.0.0.1', '2025-11-26 11:28:52', '2025-12-10 08:28:52', NULL),
(22, 3, NULL, NULL, 'Sylvie Mputu', 'sylvie.m@example.com', 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?', 'approved', '127.0.0.37', '2025-11-13 08:28:52', '2025-12-10 08:28:52', NULL),
(23, 3, NULL, NULL, 'Robert Tshimanga', 'robert.t@example.com', 'Très bon programme. J\'espère qu\'il sera étendu à d\'autres provinces également.', 'approved', '127.0.0.242', '2025-11-20 08:28:52', '2025-12-10 08:28:52', NULL),
(24, 4, NULL, NULL, 'Jean-Pierre Kalala', 'jp.kalala@example.com', 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.', 'approved', '127.0.0.12', '2025-11-18 08:28:52', '2025-12-10 08:28:52', NULL),
(25, 4, 24, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.', 'approved', '127.0.0.1', '2025-11-18 17:28:52', '2025-12-10 08:28:52', NULL),
(26, 4, NULL, NULL, 'Marie Nsimba', 'marie.nsimba@example.com', 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?', 'approved', '127.0.0.15', '2025-11-23 08:28:52', '2025-12-10 08:28:52', NULL),
(27, 4, 26, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org', 'approved', '127.0.0.1', '2025-11-23 15:28:52', '2025-12-10 08:28:52', NULL),
(28, 4, NULL, NULL, 'Patrick Lukombe', 'p.lukombe@example.com', 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.', 'approved', '127.0.0.228', '2025-12-06 08:28:52', '2025-12-10 08:28:52', NULL),
(29, 4, 28, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !', 'approved', '127.0.0.1', '2025-12-06 20:28:52', '2025-12-10 08:28:52', NULL),
(30, 4, NULL, NULL, 'Sylvie Mputu', 'sylvie.m@example.com', 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?', 'approved', '127.0.0.94', '2025-11-10 08:28:52', '2025-12-10 08:28:52', NULL),
(31, 5, NULL, NULL, 'Jean-Pierre Kalala', 'jp.kalala@example.com', 'Excellente initiative ! C\'est exactement ce dont nos enfants ont besoin. Bravo à l\'équipe de l\'AEJT-RDC.', 'approved', '127.0.0.122', '2025-11-15 08:28:52', '2025-12-10 08:28:52', NULL),
(32, 5, 31, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre message ! Pour inscrire votre enfant, vous pouvez vous rendre dans nos bureaux ou appeler notre ligne d\'assistance. Les critères sont basés sur la situation de vulnérabilité et l\'âge de l\'enfant.', 'approved', '127.0.0.1', '2025-11-16 13:28:52', '2025-12-10 08:28:52', NULL),
(33, 5, NULL, NULL, 'Marie Nsimba', 'marie.nsimba@example.com', 'Comment puis-je inscrire mon enfant à ce programme ? Y a-t-il des critères d\'éligibilité ?', 'approved', '127.0.0.21', '2025-12-08 08:28:52', '2025-12-10 08:28:52', NULL),
(34, 5, 33, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Nous serions ravis de collaborer avec vous ! Veuillez nous contacter via notre formulaire de contact ou par email à partenariats@aejtrdc.org', 'approved', '127.0.0.1', '2025-12-09 13:28:52', '2025-12-10 08:28:52', NULL),
(35, 5, NULL, NULL, 'Patrick Lukombe', 'p.lukombe@example.com', 'Merci pour tout ce que vous faites pour nos enfants. Que Dieu vous bénisse.', 'approved', '127.0.0.175', '2025-11-29 08:28:52', '2025-12-10 08:28:52', NULL),
(36, 5, 35, NULL, 'Équipe AEJT-RDC', 'contact@aejtrdc.org', 'Merci pour votre témoignage ! C\'est des retours comme celui-ci qui nous motivent à continuer notre mission. Tous nos vœux de réussite à votre fils !', 'approved', '127.0.0.1', '2025-11-29 20:28:52', '2025-12-10 08:28:52', NULL),
(37, 5, NULL, NULL, 'Sylvie Mputu', 'sylvie.m@example.com', 'Je suis enseignante et j\'aimerais collaborer avec votre organisation. Comment puis-je vous contacter ?', 'approved', '127.0.0.97', '2025-12-03 08:28:52', '2025-12-10 08:28:52', NULL),
(38, 1, 1, 2, 'Harena Heritiana RATOVOARISON', 'harenaheritiana@gmail.com', 'cool', 'approved', NULL, '2025-12-10 20:07:43', '2025-12-10 20:07:43', NULL),
(39, 3, NULL, 2, 'Harena Heritiana RATOVOARISON', 'harenaheritiana@gmail.com', 'great', 'approved', NULL, '2025-12-15 19:02:36', '2025-12-15 19:02:36', NULL),
(40, 1, NULL, 2, 'Harena Heritiana RATOVOARISON', 'harenaheritiana@gmail.com', 'Merci beaucoup !!❤️', 'approved', NULL, '2026-01-16 18:15:50', '2026-01-16 18:15:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` bigint UNSIGNED NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_courte` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contenu` json NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ordre` int NOT NULL DEFAULT '0',
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `titre`, `slug`, `image`, `description_courte`, `contenu`, `icon`, `ordre`, `actif`, `created_at`, `updated_at`) VALUES
(1, 'Éducation des enfants marginalisés', 'education-enfants-marginalises', 'domains/68fa9ecaf1d0c0.29467065.jpg', 'Accès à l\'éducation pour les enfants en situation de rue, orphelins, déplacés et familles vulnérables touchées par les conflits et la pauvreté.', '[\"L\'AEJT – RDC œuvre pour garantir l\'accès à l\'éducation aux enfants marginalisés, notamment ceux vivant dans la rue, les orphelins, les personnes déplacées internes et les enfants issus de familles vulnérables touchées par les conflits et la pauvreté. Le programme apporte un soutien concret à la scolarité par la distribution de fournitures scolaires, le parrainage scolaire et des séances de soutien pour combler les lacunes.\", \"Parallèlement, un accompagnement psychosocial est proposé pour favoriser le développement émotionnel et social des enfants et les aider à surmonter les traumatismes liés à leur situation. Ces interventions visent à promouvoir la continuité de leur scolarité, leur inclusion sociale et leur épanouissement personnel, contribuant ainsi à rompre le cycle de la vulnérabilité et à leur offrir un avenir meilleur. Ben\"]', 'FaGraduationCap', 1, 1, '2025-12-10 08:38:09', '2025-12-10 10:07:46'),
(2, 'Éducation inclusive pour les enfants vivant avec un handicap', 'education-inclusive-handicap', 'domains/68fa9e8c319630.69281871.jpg', 'Promotion de l\'éducation inclusive pour les enfants en situation de handicap, lutte contre la discrimination et intégration scolaire et communautaire.', '[\"AEJT – RDC s\'engage à promouvoir une éducation inclusive pour les enfants vivant avec un handicap, en veillant à leur accès équitable aux services éducatifs et à leur intégration dans le système scolaire ordinaire. Le programme sensibilise les communautés, les écoles et les familles à l\'importance de l\'inclusion et lutte contre la stigmatisation et la discrimination.\", \"Des infrastructures adaptées sont mises en place, ainsi que des outils pédagogiques spécialisés pour répondre aux besoins spécifiques de chaque enfant. Les enseignants bénéficient de formations pour adopter des méthodes d\'enseignement inclusives. L\'objectif est de garantir que chaque enfant, quel que soit son handicap, puisse bénéficier d\'une éducation de qualité et participer pleinement à la vie scolaire et sociale.\"]', 'FaShieldAlt', 2, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(3, 'Lutte contre le mariage précoce des enfants', 'lutte-mariage-precoce', 'domains/68fa9dfa8a2832.75914076.jpg', 'Prévention et réduction des mariages précoces qui privent les filles de leur éducation et de leurs perspectives d\'avenir.', '[\"L\'AEJT – RDC œuvre pour prévenir et réduire les mariages précoces, qui privent les filles de leur enfance, de leur éducation et de leurs perspectives d\'avenir. Le programme sensibilise les communautés, les familles et les leaders locaux aux dangers du mariage précoce, notamment les risques pour la santé, les complications liées aux grossesses précoces et les impacts psychologiques et sociaux.\", \"Des alternatives éducatives et économiques sont proposées aux filles à risque, telles que des programmes de scolarisation, de formation professionnelle et d\'autonomisation. L\'AEJT – RDC travaille également à renforcer les cadres légaux et à encourager l\'application des lois protégeant les droits des enfants, tout en collaborant avec les autorités locales et les organisations communautaires pour créer un environnement protecteur où les filles peuvent grandir en toute sécurité.\"]', 'FaHeart', 3, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(4, 'Protection des enfants dans les mines artisanales', 'protection-enfants-mines', 'domains/68fa9d2bd69995.07585915.jpg', 'Mettre fin à l\'implication des enfants dans les activités minières artisanales dangereuses.', '[\"AEJT – RDC s\'engage activement à mettre fin à l\'implication d\'enfants dans les activités minières artisanales, une pratique qui expose les enfants à des conditions de travail dangereuses, compromet leur santé et les prive de leur droit à l\'éducation. Le programme intervient en sensibilisant les communautés minières aux risques graves associés au travail des enfants, notamment les accidents, l\'exposition à des substances toxiques et les impacts psychologiques.\", \"Des alternatives économiques sont proposées aux familles pour réduire leur dépendance au travail des enfants, tandis que des programmes de réinsertion scolaire et de formation professionnelle sont offerts aux enfants retirés des mines. L\'AEJT – RDC collabore avec les autorités locales, les entreprises minières et les organisations internationales pour renforcer les mécanismes de surveillance et promouvoir des pratiques minières responsables et respectueuses des droits de l\'enfant.\"]', 'FaHardHat', 4, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(5, 'Santé sexuelle et reproductive des adolescents', 'sante-sexuelle-adolescents', 'domains/68fa99cc335d81.89565554.jpg', 'Amélioration de la santé sexuelle et reproductive des adolescents par l\'information et les services adaptés.', '[\"L\'AEJT – RDC œuvre à l\'amélioration de la santé sexuelle et reproductive des adolescents en leur fournissant des informations précises, des services de santé adaptés et un environnement favorable à leur bien-être. Le programme propose des séances d\'éducation sur la santé reproductive, la prévention des grossesses précoces, les infections sexuellement transmissibles (IST) et les droits reproductifs.\", \"Des services de conseil et de soins de santé sont rendus accessibles aux jeunes, avec une approche respectueuse de leur vie privée et de leur dignité. L\'AEJT – RDC travaille également à sensibiliser les parents, les enseignants et les leaders communautaires sur l\'importance de soutenir les adolescents dans leurs besoins en matière de santé reproductive. L\'objectif est de permettre aux jeunes de prendre des décisions éclairées concernant leur santé et leur avenir, tout en réduisant les risques associés aux comportements à risque.\"]', 'FaHeartbeat', 5, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(6, 'L\'inclusion par le sport', 'inclusion-par-sport', 'domains/68fa99594efc66.96353983.jpg', 'Utilisation du sport comme outil d\'inclusion sociale et d\'éducation pour les enfants et jeunes marginalisés.', '[\"L\'AEJT – RDC utilise le sport comme outil d\'inclusion sociale et d\'éducation pour les enfants et les jeunes, en particulier ceux issus de milieux marginalisés ou vulnérables. Le programme organise des activités sportives et récréatives qui favorisent le développement physique, émotionnel et social des participants, tout en renforçant les valeurs de respect, de travail d\'équipe et de fair-play.\", \"Le sport offre également un espace sûr où les enfants peuvent s\'épanouir, développer leur confiance en soi et acquérir des compétences de leadership. L\'AEJT – RDC collabore avec des écoles, des clubs sportifs et des organisations locales pour créer des infrastructures sportives accessibles et promouvoir l\'égalité des chances, en veillant à ce que les filles et les enfants vivant avec un handicap puissent participer pleinement aux activités sportives.\"]', 'FaFutbol', 6, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(7, 'Lutte contre la violence faite aux filles dans les écoles', 'lutte-violence-filles-ecoles', 'domains/68fa991ad97ed4.30888153.jpg', 'Création d\'un environnement scolaire sûr et protecteur pour les filles.', '[\"L\'AEJT – RDC œuvre à la création d\'un environnement scolaire sûr et protecteur pour les filles, en luttant contre toutes les formes de violence, y compris les violences physiques, psychologiques et sexuelles. Le programme sensibilise les élèves, les enseignants, les parents et les communautés aux impacts néfastes de la violence sur l\'éducation et le bien-être des filles.\", \"Des mécanismes de signalement et de prise en charge des cas de violence sont mis en place, avec un accompagnement psychosocial pour les victimes. L\'AEJT – RDC forme également les enseignants et le personnel scolaire à la prévention et à la gestion des cas de violence, tout en promouvant des politiques scolaires inclusives et respectueuses des droits des filles. L\'objectif est de garantir que chaque fille puisse poursuivre son éducation dans un environnement sûr, où elle se sent respectée et valorisée.\"]', 'FaShieldAlt', 7, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(8, 'Les pires formes de travail des enfants', 'pires-formes-travail-enfants', 'domains/68fa9d52352c47.74657218.jpg', 'Protection des enfants contre l\'exploitation sexuelle, le travail forcé et les activités dangereuses.', '[\"L\'AEJT – RDC s\'engage à protéger les enfants des pires formes de travail, telles que l\'exploitation sexuelle, le travail forcé, le recrutement dans les groupes armés et les travaux dangereux qui compromettent leur santé, leur sécurité et leur développement. Le programme identifie et retire les enfants de ces situations d\'exploitation, en leur offrant un soutien immédiat et un accompagnement pour leur réintégration sociale et scolaire.\", \"Des actions de plaidoyer sont menées pour renforcer les lois et les politiques de protection de l\'enfance, tandis que des campagnes de sensibilisation ciblent les communautés, les employeurs et les autorités locales. L\'AEJT – RDC travaille également avec les familles pour proposer des alternatives économiques durables et réduire les facteurs qui poussent les enfants vers le travail. L\'objectif est de garantir que chaque enfant puisse grandir dans un environnement protecteur, libre de toute forme d\'exploitation.\"]', 'FaExclamationTriangle', 8, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(9, 'Éducation d\'urgence pour les enfants, jeunes et femmes touchés par les crises', 'education-urgence-crises', 'domains/68fa986295af79.24579904.jpg', 'Assurer la continuité de l\'éducation dans les contextes de crises, conflits ou catastrophes.', '[\"AEJT – RDC intervient dans des contextes de crises, de conflits ou de catastrophes naturelles pour assurer la continuité de l\'éducation des enfants, des jeunes et des femmes touchés. Le programme met en place des espaces d\'apprentissage temporaires, distribue des kits scolaires et propose des activités éducatives adaptées aux besoins des populations déplacées ou affectées par les crises.\", \"Un accompagnement psychosocial est également offert pour aider les bénéficiaires à surmonter les traumatismes liés aux crises et à retrouver un sentiment de normalité et de stabilité. L\'AEJT – RDC collabore avec les autorités locales, les organisations humanitaires et les communautés pour garantir un accès rapide et équitable à l\'éducation en situation d\'urgence. L\'objectif est de protéger le droit à l\'éducation même dans les contextes les plus difficiles et de contribuer à la résilience des populations affectées.\"]', 'FaFirstAid', 9, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(10, 'Entrepreneuriat et autonomisation des femmes et des jeunes', 'entrepreneuriat-autonomisation', 'domains/68fa95578fa5a4.49222161.jpg', 'Soutien au développement socio-économique des femmes et des jeunes par l\'entrepreneuriat et la formation.', '[\"L\'AEJT – RDC soutient les femmes et les jeunes dans leur développement socio-économique en leur offrant des opportunités d\'entrepreneuriat, de formation professionnelle et d\'accès au crédit. Le programme propose des formations en gestion d\'entreprise, en développement de compétences techniques et en alphabétisation financière pour renforcer les capacités des bénéficiaires.\", \"Des groupes d\'épargne et de crédit sont créés pour faciliter l\'accès au financement, tandis que des activités génératrices de revenus sont promues pour améliorer les conditions de vie des familles. L\'AEJT – RDC encourage également l\'égalité des genres et l\'autonomisation des femmes en les impliquant dans les prises de décisions économiques et communautaires. L\'objectif est de réduire la pauvreté, de promouvoir l\'autonomie économique et de renforcer la résilience des communautés.\"]', 'FaBusinessTime', 10, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(11, 'Règlement pacifique des conflits, paix et bonne gouvernance', 'reglement-conflits-paix', 'domains/68fa939535deb2.67763353.jpg', 'Promotion de la paix durable et de la cohésion sociale par le dialogue et la bonne gouvernance.', '[\"L\'AEJT – RDC promeut une paix durable et la cohésion sociale dans la région en facilitant le règlement pacifique des conflits et en renforçant les mécanismes de bonne gouvernance. Le programme forme les communautés, les leaders locaux et les jeunes à la médiation, au dialogue et à la résolution non-violente des conflits.\", \"Des espaces de dialogue sont créés pour favoriser la réconciliation et la coexistence pacifique entre les groupes en conflit. L\'AEJT – RDC sensibilise également les populations aux principes de bonne gouvernance, de transparence et de responsabilité, tout en plaidant pour des politiques inclusives et participatives. L\'objectif est de prévenir les conflits, de promouvoir la justice sociale et de contribuer à la construction d\'une société pacifique et démocratique.\"]', 'FaPeace', 11, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(12, 'Nutrition, sécurité alimentaire et environnement', 'nutrition-securite-alimentaire', 'domains/68fa90f927f355.68983087.jpg', 'Amélioration de la sécurité alimentaire, nutrition et promotion de pratiques agricoles durables.', '[\"L\'AEJT – RDC œuvre pour améliorer la sécurité alimentaire et la nutrition des communautés vulnérables, tout en promouvoir des pratiques agricoles durables et respectueuses de l\'environnement. Le programme sensibilise les familles à l\'importance d\'une alimentation équilibrée et propose des formations en nutrition pour réduire la malnutrition, en particulier chez les enfants et les femmes enceintes.\", \"Des activités de production agricole, d\'élevage et de transformation des aliments sont promues pour renforcer la résilience des ménages face à l\'insécurité alimentaire. L\'AEJT – RDC encourage également l\'adoption de techniques agricoles écologiques, telles que l\'agroforesterie et l\'agriculture biologique, pour préserver les ressources naturelles et lutter contre la dégradation de l\'environnement. L\'objectif est de garantir un accès durable à une alimentation suffisante et nutritive, tout en protégeant l\'environnement pour les générations futures.\"]', 'FaAppleAlt', 12, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09'),
(13, 'Conservation de la biodiversité', 'conservation-biodiversite', 'domains/68fa8cd4e55465.16973276.jpg', 'Engagement pour la conservation de la biodiversité et la protection des écosystèmes naturels.', '[\"AEJT - RDC s\'engage pour la conservation de la biodiversité et la protection des écosystèmes naturels, en reconnaissant leur importance pour le bien-être des communautés et la durabilité environnementale. Le programme sensibilise les populations locales à la valeur de la biodiversité et aux menaces qui pèsent sur les espèces et les habitats naturels, telles que la déforestation, le braconnage et la pollution.\", \"Des actions de reforestation, de protection des zones écologiques sensibles et de gestion durable des ressources naturelles sont mises en œuvre en collaboration avec les communautés locales et les autorités environnementales. L\'AEJT – RDC promeut également des pratiques économiques alternatives, telles que l\'écotourisme et l\'agriculture durable, pour réduire la pression sur les ressources naturelles. L\'objectif est de préserver la richesse biologique de la région et de garantir un environnement sain pour les générations actuelles et futures.\"]', 'FaLeaf', 13, 1, '2025-12-10 08:38:09', '2025-12-10 08:38:09');

-- --------------------------------------------------------

--
-- Table structure for table `ethical_commitments`
--

CREATE TABLE `ethical_commitments` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('principes_humanitaires','protection','safeguarding','code_conduite','normes_qualite','environnement') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_documents` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `implementation_date` date DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `priority` enum('low','medium','high','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `order` int NOT NULL DEFAULT '0' COMMENT 'Ordre d''affichage',
  `tags` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ethical_commitments`
--

INSERT INTO `ethical_commitments` (`id`, `title`, `category`, `description`, `reference_documents`, `implementation_date`, `review_date`, `is_active`, `priority`, `order`, `tags`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Respect de la dignité humaine', 'principes_humanitaires', 'Nous nous engageons à garantir le respect de la dignité de chaque personne dans toutes nos interventions, sans discrimination aucune. Chaque individu a le droit d\'être traité avec respect et considération.', 'Charte Humanitaire, Déclaration Universelle des Droits de l\'Homme', '2024-01-01', '2024-12-31', 1, 'critical', 1, '[\"dignité\", \"droits humains\", \"respect\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(2, 'Principe d\'Impartialité', 'principes_humanitaires', 'Nous ne faisons aucune discrimination fondée sur la nationalité, la race, la religion, la condition sociale ou les opinions politiques. Nous nous attachons uniquement à secourir les personnes en fonction de leurs besoins.', 'Principes Fondamentaux du Mouvement Croix-Rouge', '2024-01-01', '2025-06-30', 1, 'critical', 2, '[\"impartialité\", \"non-discrimination\", \"égalité\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(3, 'Neutralité dans les conflits', 'principes_humanitaires', 'Nous nous abstenons de prendre parti dans les hostilités ou de nous engager dans des controverses d\'ordre politique, racial, religieux ou idéologique.', 'Code de conduite CRF, Principes humanitaires', '2024-01-01', '2025-12-31', 0, 'critical', 3, '[\"neutralité\", \"indépendance\", \"impartialité\"]', '2026-01-10 13:22:27', '2026-01-10 18:08:50', NULL),
(4, 'Protection des enfants', 'safeguarding', 'Politique de tolérance zéro envers tout abus, négligence ou exploitation d\'enfants. Nous mettons en place des mécanismes de protection robustes dans tous nos programmes.', 'Child Safeguarding Policy, Normes CPMS', '2024-01-15', '2024-07-15', 1, 'critical', 4, '[\"enfants\", \"protection\", \"safeguarding\", \"abus\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(5, 'Prévention de l\'exploitation et des abus sexuels (PSEA)', 'safeguarding', 'Engagement ferme contre toute forme d\'exploitation et d\'abus sexuels par notre personnel ou nos partenaires. Formation obligatoire de tout le personnel.', 'PSEA Policy, Code de conduite du personnel', '2024-01-01', '2024-06-30', 1, 'critical', 5, '[\"PSEA\", \"exploitation\", \"abus\", \"protection\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(6, 'Code de conduite du personnel', 'code_conduite', 'Tous les membres du personnel, bénévoles et partenaires doivent respecter notre code de conduite qui définit les comportements attendus et interdits.', 'Code de conduite organisationnel, Charte éthique', '2024-01-01', '2025-12-31', 1, 'high', 6, '[\"conduite\", \"éthique\", \"comportement\", \"personnel\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(7, 'Lutte contre la corruption', 'code_conduite', 'Tolérance zéro pour toute forme de corruption, fraude ou détournement de fonds. Mécanismes de signalement confidentiels en place.', 'Politique anti-corruption, Procédures de signalement', '2024-01-01', '2024-12-31', 1, 'high', 7, '[\"corruption\", \"fraude\", \"transparence\", \"intégrité\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(8, 'Normes Sphere', 'normes_qualite', 'Nous nous engageons à respecter les normes minimales Sphere dans toutes nos interventions humanitaires pour garantir la qualité et la redevabilité.', 'Manuel Sphere, Standards humanitaires', '2024-02-01', '2025-02-01', 1, 'high', 8, '[\"sphere\", \"qualité\", \"standards\", \"redevabilité\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(9, 'Participation communautaire', 'protection', 'Les communautés bénéficiaires sont au cœur de nos interventions et participent activement aux décisions qui les concernent.', 'Guide de participation communautaire, Approche CBDRM', '2024-01-01', '2025-06-30', 1, 'medium', 9, '[\"participation\", \"communauté\", \"inclusion\", \"empowerment\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(10, 'Protection de l\'environnement', 'environnement', 'Nos interventions intègrent systématiquement la protection de l\'environnement et la promotion de pratiques durables.', 'Politique environnementale, Green Response', '2024-03-01', '2025-03-01', 1, 'medium', 10, '[\"environnement\", \"durabilité\", \"écologie\", \"climat\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(11, 'Gestion des plaintes et feedback', 'protection', 'Mécanisme transparent et accessible permettant aux bénéficiaires de formuler des plaintes ou du feedback sur nos interventions.', 'Procédure de gestion des plaintes, CHS Standard 5', '2024-01-15', '2024-07-15', 1, 'high', 11, '[\"plaintes\", \"feedback\", \"redevabilité\", \"transparence\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL),
(12, 'Do No Harm (Ne pas nuire)', 'principes_humanitaires', 'Toutes nos interventions sont analysées pour minimiser les risques de préjudice aux populations et maximiser les impacts positifs.', 'Principes Do No Harm, Analyse de conflit', '2024-01-01', '2025-12-31', 1, 'high', 12, '[\"do no harm\", \"protection\", \"analyse\", \"risques\"]', '2026-01-10 13:22:27', '2026-01-10 13:22:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `humanitarian_alerts`
--

CREATE TABLE `humanitarian_alerts` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alert_type` enum('natural_disaster','conflict','epidemic','food_insecurity','displacement','infrastructure','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `severity` enum('low','medium','high','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `affected_population` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `needs_identified` text COLLATE utf8mb4_unicode_ci,
  `response_actions` text COLLATE utf8mb4_unicode_ci,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `humanitarian_alerts`
--

INSERT INTO `humanitarian_alerts` (`id`, `title`, `alert_type`, `severity`, `location`, `affected_population`, `description`, `needs_identified`, `response_actions`, `contact_person`, `contact_phone`, `start_date`, `end_date`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Cyclone Batsirai - Côte Est', 'natural_disaster', 'critical', 'Toamasina, Mahanoro, Mananjary', '150,000 personnes', 'Le cyclone Batsirai a touché la côte est de Madagascar avec des vents violents dépassant 165 km/h. Des inondations massives ont été signalées dans plusieurs districts. De nombreuses habitations ont été détruites et les infrastructures sont gravement endommagées.', 'Abris d\'urgence, kits alimentaires, eau potable, couvertures, soins médicaux d\'urgence, réparation des toits, accès à l\'électricité.', 'Distribution de 5000 kits d\'urgence en cours. Mise en place de 15 centres d\'hébergement temporaires. Équipes médicales mobiles déployées. Évaluation des dégâts en cours avec les autorités locales.', 'Rakoto Jean-Pierre', '+261 34 12 345 67', '2026-01-07', NULL, 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(2, 'Sécheresse sévère - Sud Madagascar', 'food_insecurity', 'critical', 'Ambovombe, Bekily, Tsihombe', '1,200,000 personnes', 'La région sud fait face à une sécheresse sans précédent depuis 40 ans. Les récoltes ont échoué pour la troisième année consécutive. La malnutrition aiguë sévère touche plus de 30% des enfants de moins de 5 ans.', 'Aide alimentaire d\'urgence, eau potable, semences résistantes à la sécheresse, suppléments nutritionnels pour enfants, accès aux soins de santé.', 'Programme de distribution alimentaire pour 500,000 bénéficiaires. Installation de points d\'eau potable. Centres de nutrition thérapeutique opérationnels. Sensibilisation sur les pratiques agricoles résilientes.', 'Randrianasolo Marie', '+261 33 98 765 43', '2025-11-10', '2026-05-10', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(3, 'Épidémie de choléra - Région Analamanga', 'epidemic', 'high', 'Antananarivo, Ambohidratrimo', '25,000 personnes à risque', 'Une épidémie de choléra a été déclarée dans plusieurs quartiers de la capitale et ses environs. Plus de 500 cas confirmés et 15 décès signalés. La contamination de l\'eau est la principale cause.', 'Traitement médical, kits d\'hygiène, purification de l\'eau, sensibilisation à l\'hygiène, points de réhydratation orale.', 'Campagne de vaccination en cours (50,000 doses distribuées). Distribution de 10,000 kits d\'hygiène. Chloration des points d\'eau. Unités de traitement du choléra opérationnelles dans 5 centres de santé.', 'Dr. Andriamihaja Paul', '+261 32 45 678 90', '2025-12-26', '2026-02-09', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(4, 'Déplacement de population - Conflit foncier', 'displacement', 'medium', 'District de Morondava', '3,500 personnes déplacées', 'Des tensions foncières ont entraîné le déplacement forcé de plusieurs villages. Les familles ont fui vers des zones plus sûres mais manquent d\'abris et de moyens de subsistance.', 'Abris temporaires, assistance alimentaire, protection juridique, médiation communautaire, accès à l\'éducation pour les enfants.', 'Installation d\'un camp temporaire avec 200 tentes. Distribution alimentaire mensuelle. Sessions de médiation avec les autorités locales et les chefs traditionnels. Mise en place d\'une école temporaire.', 'Razafy Solofo', '+261 34 56 789 01', '2025-12-21', NULL, 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(5, 'Inondations - Vallée du Betsiboka', 'natural_disaster', 'high', 'Maevatanana, Kandreho', '45,000 personnes', 'Des pluies torrentielles ont provoqué le débordement de la rivière Betsiboka. Plusieurs villages sont sous les eaux. Les routes sont coupées, isolant les communautés.', 'Évacuation d\'urgence, bateaux de secours, nourriture, eau potable, abris temporaires, soins médicaux.', 'Évacuation de 5,000 personnes vers des zones plus élevées. Distribution de 3,000 kits alimentaires. Équipes de secouristes déployées avec bateaux. Évaluation rapide des besoins en cours.', 'Rasoamanana Luc', '+261 33 12 345 78', '2026-01-05', NULL, 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(6, 'Crise alimentaire - Région Atsimo Andrefana', 'food_insecurity', 'high', 'Toliara, Sakaraha, Betioky', '800,000 personnes', 'La période de soudure s\'aggrave avec l\'échec des dernières récoltes. Les taux de malnutrition augmentent de façon alarmante, particulièrement chez les enfants et les femmes enceintes.', 'Distributions alimentaires d\'urgence, supplémentation nutritionnelle, semences et outils agricoles, programme cash-for-work.', 'Distribution de vivres pour 250,000 personnes. Centres de nutrition thérapeutique dans 12 communes. Programme de cantines scolaires pour 30,000 enfants. Formation sur les techniques de conservation des aliments.', 'Raharijaona Hanta', '+261 34 87 654 32', '2025-11-26', '2026-04-10', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(7, 'Défaillance infrastructure - Effondrement pont', 'infrastructure', 'medium', 'Route Nationale 7, Antsirabe', '100,000 personnes affectées', 'L\'effondrement du pont principal a coupé l\'accès à plusieurs communes rurales. L\'approvisionnement en denrées et l\'accès aux services de santé sont gravement compromis.', 'Pont temporaire, transport d\'urgence pour les malades, approvisionnement en carburant et vivres, communication avec les communautés isolées.', 'Construction d\'un pont provisoire en cours (délai 15 jours). Mise en place d\'un service de bac pour le passage d\'urgence. Stocks de vivres pré-positionnés dans les communes isolées. Ambulance fluviale opérationnelle.', 'Rakotonirina Fidy', '+261 32 98 765 41', '2025-12-31', '2026-01-30', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(8, 'Invasion acridienne - Menace récoltes', 'natural_disaster', 'medium', 'Menabe, Melaky', '200,000 agriculteurs', 'Des essaims de criquets pèlerins menacent les cultures dans les régions du centre-ouest. Si rien n\'est fait, les récoltes pourraient être détruites à 70%.', 'Pesticides biologiques, équipements de pulvérisation, formation des agriculteurs, surveillance des essaims, aide alimentaire préventive.', 'Campagne de lutte antiacridienne avec drones et équipes terrestres. Distribution de 500 pulvérisateurs aux agriculteurs. Surveillance par satellite des mouvements d\'essaims. Sensibilisation communautaire active.', 'Andrianaivoarivelo Nirina', '+261 33 45 678 92', '2026-01-03', '2026-02-24', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(9, 'Éboulement de terrain - Route bloquée', 'infrastructure', 'low', 'RN2, Andasibe', '15,000 personnes', 'Un éboulement a bloqué la route nationale 2. Les travaux de déblayage sont en cours mais les déplacements sont perturbés.', 'Équipement de déblayage, itinéraire alternatif, communication aux usagers.', 'Équipes de déblayage mobilisées. Route alternative balisée. Information diffusée via radios locales. Travaux estimés à 3 jours.', 'Rakotondrabe Hery', '+261 34 23 456 78', '2026-01-08', '2026-01-13', 1, '2026-01-09 21:00:00', '2026-01-10 19:06:26', NULL),
(10, 'Tension communautaire - Conflit pastoral (RÉSOLU)', 'conflict', 'low', 'District d\'Ihosy', '5,000 personnes', 'Des tensions entre éleveurs et agriculteurs avaient éclaté suite à la divagation de troupeaux dans les champs cultivés. Situation résolue grâce à la médiation.', 'Médiation communautaire, accord de pâturage, sensibilisation.', 'Médiation réussie entre les parties. Accord de pâturage signé. Sessions de sensibilisation organisées. Comité de suivi mis en place.', 'Rabemananjara Michel', '+261 33 67 890 12', '2026-01-08', '2026-01-23', 1, '2026-01-09 21:00:00', '2026-01-10 19:28:12', NULL),
(11, 'tsunami', 'natural_disaster', 'high', 'Kinshasa', '5,000 personnes', 'nein', 'abri', 'distribution des nutritions', 'Rabemananjara Michel', '+261 33 67 890 12', '2026-01-20', '2026-01-22', 1, '2026-01-20 04:22:24', '2026-01-20 04:22:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `intervention_zones`
--

CREATE TABLE `intervention_zones` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('headquarters','branch','extension') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'extension',
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_established` year NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#2563EB',
  `description` text COLLATE utf8mb4_unicode_ci,
  `projects` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `intervention_zones`
--

INSERT INTO `intervention_zones` (`id`, `name`, `type`, `province`, `year_established`, `address`, `phone`, `email`, `latitude`, `longitude`, `color`, `description`, `projects`, `is_active`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Bukavu', 'headquarters', 'Sud-Kivu', '2006', 'Ibanda/Panzi, AV. Jean Miruho', '+243 995 948 132', 'aejtrdcongoa@gmail.com', -2.5085000, 28.8473000, '#DC2626', 'Siège national de l\'AEJT-RDC, centre de coordination de toutes les activités.', '[\"Protection de l\'enfance\", \"Éducation inclusive\", \"AVEC\", \"Santé communautaire\"]', 1, 1, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(2, 'Kavumu', 'extension', 'Sud-Kivu', '2023', 'Groupement Bugore, Village Mushunguri, AV. Karanda', NULL, NULL, -2.3167000, 28.7333000, '#2563EB', 'Extension récente axée sur l\'agriculture et l\'éducation.', '[\"Agriculture durable\", \"Alphabétisation\", \"AVEC\"]', 1, 2, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(3, 'Uvira', 'branch', 'Sud-Kivu', '2008', 'Commune Kavimvira, Quartier Kavimvira, AV. Mahi ya moto', NULL, NULL, -3.3915000, 29.1378000, '#059669', 'Antenne provinciale frontalière, active dans l\'éducation et le sport.', '[\"Éducation inclusive\", \"Agriculture\", \"Sport pour enfants\", \"Stop Choléra\"]', 1, 3, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(4, 'Goma', 'branch', 'Nord-Kivu', '2010', 'Quartier Katindo, AV. Masisi', NULL, NULL, -1.6792000, 29.2228000, '#7C3AED', 'Antenne provinciale dans la capitale du Nord-Kivu.', '[\"Protection\", \"Éducation\", \"Santé communautaire\"]', 1, 4, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(5, 'Idjwi', 'extension', 'Sud-Kivu', '2012', 'Groupement Nyakalengwa, Village Mugote, Chefferie Ntambuka', NULL, NULL, -2.1667000, 29.0333000, '#F59E0B', 'Zone insulaire axée sur l\'agriculture et l\'environnement.', '[\"Agriculture\", \"Environnement\", \"AVEC\"]', 1, 5, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(6, 'Kalemie', 'branch', 'Tanganyika', '2016', 'Commune Lukuga, Quartier Kahite, AV. Trico', NULL, NULL, -5.9475000, 29.1944000, '#10B981', 'Antenne provinciale dans la province du Tanganyika.', '[\"Protection\", \"Éducation\", \"Santé\"]', 1, 6, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(7, 'Moba', 'extension', 'Tanganyika', '2018', 'Quartier Regeza, AV. Songola', NULL, NULL, -7.0333000, 29.7333000, '#EC4899', 'Extension locale dans une zone rurale du Tanganyika.', '[\"Agriculture\", \"AVEC\", \"Protection de l\'enfance\"]', 1, 7, '2026-01-17 04:16:59', '2026-01-17 04:16:59'),
(8, 'Kinshasa', 'branch', 'Kinshasa', '2020', 'Commune de Lemba, Quartier Molo, AV. Kadjeke', NULL, NULL, -4.3276000, 15.3136000, '#8B5CF6', 'Représentation dans la capitale de la RDC.', '[\"Plaidoyer\", \"Protection\", \"Éducation\"]', 1, 8, '2026-01-17 04:16:59', '2026-01-17 04:16:59');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_offers`
--

CREATE TABLE `job_offers` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('CDI','CDD','Stage','Freelance') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CDI',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `responsibilities` text COLLATE utf8mb4_unicode_ci,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` enum('draft','published','closed','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `applications_count` int NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_offers`
--

INSERT INTO `job_offers` (`id`, `slug`, `title`, `type`, `location`, `department`, `description`, `requirements`, `responsibilities`, `duration`, `deadline`, `status`, `featured`, `views`, `applications_count`, `published_at`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'coordinateur-de-projet', 'Coordinateur de Projet', 'CDI', 'Kinshasa', 'Programmes', 'Nous recherchons un coordinateur expérimenté pour superviser nos projets de santé communautaire dans la région de Kinshasa. Le candidat idéal aura une solide expérience en gestion de projet dans le secteur humanitaire.', '[\"Dipl\\u00f4me universitaire en gestion de projet, sant\\u00e9 publique ou \\u00e9quivalent\",\"5 ans d\'exp\\u00e9rience minimum dans le secteur humanitaire\",\"Excellentes comp\\u00e9tences en communication et en leadership\",\"Ma\\u00eetrise du fran\\u00e7ais et de l\'anglais\",\"Capacit\\u00e9 \\u00e0 travailler sous pression\"]', '[\"Coordonner les activit\\u00e9s du projet et superviser l\'\\u00e9quipe\",\"G\\u00e9rer le budget et les ressources du projet\",\"Assurer le reporting r\\u00e9gulier aux bailleurs de fonds\",\"Maintenir les relations avec les partenaires locaux\",\"Garantir la qualit\\u00e9 et l\'impact des interventions\"]', NULL, '2026-03-04', 'published', 1, 45, 12, '2026-01-04 17:54:41', NULL, '2026-01-04 17:54:41', '2026-01-04 17:54:41'),
(2, 'assistant-communication', 'Assistant Communication', 'Stage', 'Kinshasa', 'Communication', 'Stage en communication pour accompagner nos actions de plaidoyer et sensibilisation. Une excellente opportunité pour les étudiants en communication de développer leurs compétences dans le secteur humanitaire.', '[\"\\u00c9tudiant en communication, marketing ou journalisme\",\"Ma\\u00eetrise des r\\u00e9seaux sociaux et outils digitaux\",\"Comp\\u00e9tences en cr\\u00e9ation de contenu (texte, photo, vid\\u00e9o)\",\"Excellente r\\u00e9daction en fran\\u00e7ais\",\"Cr\\u00e9ativit\\u00e9 et sens de l\'initiative\"]', '[\"Cr\\u00e9er du contenu pour les r\\u00e9seaux sociaux\",\"R\\u00e9diger des communiqu\\u00e9s de presse et articles\",\"Suivre les m\\u00e9dias et faire de la veille informationnelle\",\"Participer \\u00e0 l\'organisation d\'\\u00e9v\\u00e9nements\",\"Contribuer \\u00e0 la strat\\u00e9gie de communication digitale\"]', '6 mois', '2026-02-04', 'published', 0, 78, 23, '2026-01-04 17:54:41', NULL, '2026-01-04 17:54:41', '2026-01-04 17:54:41'),
(3, 'logisticien', 'Logisticien', 'CDD', 'Goma', 'Logistique', 'Gestion des approvisionnements et coordination logistique pour nos opérations sur le terrain dans la région de Goma. Le poste requiert une expérience en logistique humanitaire en zones difficiles.', '[\"Dipl\\u00f4me en logistique ou gestion des op\\u00e9rations\",\"3 ans d\'exp\\u00e9rience minimum en logistique humanitaire\",\"Connaissance des proc\\u00e9dures d\'achat et de gestion des stocks\",\"Capacit\\u00e9 \\u00e0 travailler en zone difficile\",\"Ma\\u00eetrise des outils informatiques (Excel, logiciels de gestion)\"]', '[\"G\\u00e9rer les approvisionnements et les achats locaux\",\"Coordonner les transports et la distribution\",\"Assurer la gestion des stocks et des inventaires\",\"Superviser l\'entretien des v\\u00e9hicules et \\u00e9quipements\",\"Garantir le respect des proc\\u00e9dures logistiques\"]', '12 mois', '2026-02-18', 'published', 1, 34, 8, '2026-01-04 17:54:41', NULL, '2026-01-04 17:54:41', '2026-01-04 17:54:41'),
(4, 'charge-de-suivi-evaluation', 'Chargé de Suivi-Évaluation', 'CDI', 'Lubumbashi', 'Programmes', 'Nous recherchons un chargé de suivi-évaluation pour nos projets dans la région de Lubumbashi. Le candidat sera responsable du système de suivi et de l\'évaluation de l\'impact de nos interventions.', '[\"Master en statistiques, d\\u00e9veloppement ou sciences sociales\",\"3 ans d\'exp\\u00e9rience en suivi-\\u00e9valuation dans le secteur humanitaire\",\"Ma\\u00eetrise des m\\u00e9thodologies quantitatives et qualitatives\",\"Comp\\u00e9tences en analyse de donn\\u00e9es (SPSS, R, Excel)\",\"Exp\\u00e9rience en r\\u00e9daction de rapports d\'\\u00e9valuation\"]', '[\"D\\u00e9velopper et mettre en \\u0153uvre le syst\\u00e8me de S&E\",\"Collecter et analyser les donn\\u00e9es de suivi\",\"Conduire des \\u00e9valuations d\'impact\",\"Former les \\u00e9quipes aux outils de S&E\",\"Produire des rapports d\'analyse et de recommandations\"]', NULL, '2026-03-11', 'published', 0, 28, 5, '2026-01-04 17:54:41', NULL, '2026-01-04 17:54:41', '2026-01-04 18:23:27'),
(5, 'responsable-ressources-humaines', 'Responsable Ressources Humaines', 'CDI', 'Kinshasa', 'Administration', 'Nous recherchons un Responsable RH pour gérer l\'ensemble des aspects liés aux ressources humaines de l\'organisation. Le candidat sera responsable du recrutement, de la formation et du développement des collaborateurs.', '[\"Dipl\\u00f4me universitaire en gestion des ressources humaines\",\"5 ans d\'exp\\u00e9rience en gestion RH, id\\u00e9alement dans le secteur ONG\",\"Connaissance du droit du travail congolais\",\"Excellentes comp\\u00e9tences en communication et n\\u00e9gociation\",\"Ma\\u00eetrise des logiciels RH\"]', '[\"G\\u00e9rer le processus de recrutement\",\"D\\u00e9velopper et mettre en \\u0153uvre la politique RH\",\"Organiser les formations et le d\\u00e9veloppement des comp\\u00e9tences\",\"G\\u00e9rer les relations sociales et le climat de travail\",\"Assurer la conformit\\u00e9 avec la l\\u00e9gislation du travail\"]', NULL, NULL, 'published', 0, 0, 0, '2026-01-04 18:20:07', NULL, '2026-01-04 17:54:41', '2026-01-04 18:20:07');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(12, '0001_01_01_000000_create_users_table', 1),
(13, '0001_01_01_000001_create_cache_table', 1),
(14, '0001_01_01_000002_create_jobs_table', 1),
(15, '2025_01_02_create_news_table', 1),
(16, '2025_11_13_140953_create_comments_table', 1),
(17, '2025_11_19_074740_create_personal_access_tokens_table', 1),
(18, '2025_11_22_093831_add_role_to_users_table', 1),
(19, '2025_11_22_111629_add_images_and_category_to_news_table', 1),
(20, '2025_11_22_112444_add_role_to_users_table', 1),
(21, '2025_12_10_105941_skip_duplicate_user_id_in_comments', 1),
(22, '2025_12_10_112529_create_domains_table', 1),
(23, '2025_12_11_172852_create_partners_table', 2),
(24, '2025_12_28_210259_create_projects_table', 3),
(25, '2025_01_11_create_volunteers_table', 4),
(26, '2026_01_04_205248_create_job_offers_table', 5),
(27, '2026_01_04_221938_change_user_table', 6),
(28, '2026_01_06_223422_remove_unique_constraint_from_volunteers_email', 7),
(29, '2025_01_04_create_team_members_table', 8),
(30, '2025_01_12_create_ethical_commitments_table', 9),
(31, 'ethic', 10),
(32, 'violation_report', 11),
(33, 'humanitarian_alert', 12),
(34, '2025_01_15_create_advocacy_campaigns_table', 13),
(35, 'ethic_commitments', 14),
(36, '2026_01_17_070503_create_intervention_zones_table', 15);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` json DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `published_at` timestamp NULL DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `views` int UNSIGNED NOT NULL DEFAULT '0',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `slug`, `title`, `excerpt`, `content`, `image`, `images`, `category`, `published_at`, `author`, `tags`, `status`, `views`, `featured`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'nouvelle-initiative-pour-la-protection-de-lenfance-en-rdc-KL40Pq', 'Nouvelle initiative pour la protection de l\'enfance en RDC', 'L\'AEJT-RDC lance un programme ambitieux de sensibilisation et de prise en charge des enfants vulnérables dans trois provinces.', 'L\'Association des Enfants et Jeunes Travailleurs de la RDC (AEJT-RDC) annonce le lancement d\'une nouvelle initiative majeure pour renforcer la protection de l\'enfance dans le pays. Ce programme, qui sera déployé dans les provinces du Nord-Kivu, du Sud-Kivu et du Kasaï, vise à sensibiliser les communautés locales sur les droits des enfants et à offrir un soutien direct aux enfants en situation de vulnérabilité.\n\nLe programme comprend trois volets principaux : la sensibilisation communautaire, l\'accompagnement psychosocial et la réinsertion scolaire. Plus de 5000 enfants devraient bénéficier de ce programme au cours des 24 prochains mois.\n\nSelon Mme Jeanne Mukendi, Directrice des Programmes, \'Cette initiative répond à un besoin urgent identifié lors de nos consultations avec les communautés. Nous travaillerons en étroite collaboration avec les autorités locales, les chefs coutumiers et les organisations partenaires pour garantir un impact durable.\'', 'news/1765405592_image-enfant.webp', NULL, 'general', '2025-12-05 08:28:52', 'Rédaction AEJT-RDC', '[\"Protection\", \"Enfance\", \"Droits\"]', 'published', 262, 1, '2025-12-10 08:28:52', '2026-01-16 18:16:55', NULL),
(2, 'education-acceleree-rattrapage-scolaire-pour-1500-enfants-BOIiEC', 'Éducation accélérée : rattrapage scolaire pour 1500 enfants', 'Un programme d\'éducation accélérée permet aux enfants ayant quitté l\'école de rattraper leur retard scolaire.', 'Dans le cadre de son engagement pour l\'éducation pour tous, l\'AEJT-RDC met en œuvre un programme d\'éducation accélérée qui a déjà permis à plus de 1500 enfants de reprendre leur parcours scolaire.\n\nCe dispositif innovant offre un cursus condensé permettant aux enfants ayant abandonné l\'école de rattraper plusieurs années en un temps réduit. Les cours sont adaptés à l\'âge et au niveau des apprenants, avec un accent particulier sur les matières fondamentales.\n\nJean-Paul Kasongo, coordinateur du programme, explique : \'Nous travaillons avec des enseignants spécialement formés à la pédagogie accélérée. Les résultats sont encourageants : 85% des enfants ayant terminé le cycle réintègrent avec succès le système scolaire classique.\'', 'news/1765405686_news-2.jpeg', NULL, 'general', '2025-11-28 08:28:52', 'Équipe Programmes', '[\"Éducation\", \"Réinsertion\"]', 'published', 194, 0, '2025-12-10 08:28:52', '2026-01-17 04:50:05', NULL),
(3, 'formation-professionnelle-200-jeunes-formes-aux-metiers-porteurs-CH8csH', 'Formation professionnelle : 200 jeunes formés aux métiers porteurs', 'L\'AEJT-RDC clôture une session de formation professionnelle ayant bénéficié à 200 jeunes dans plusieurs filières.', 'L\'AEJT-RDC a célébré la fin d\'une session de formation professionnelle qui a permis à 200 jeunes d\'acquérir des compétences dans des métiers porteurs tels que la couture, la menuiserie, la plomberie et l\'électricité.\n\nCes formations, d\'une durée de 6 mois, combinent apprentissage théorique et stages pratiques en entreprise. À l\'issue du programme, chaque participant reçoit un kit de démarrage pour faciliter son insertion professionnelle.\n\nParmi les bénéficiaires, Marie Kalala, 22 ans, témoigne : \'Cette formation a changé ma vie. J\'ai non seulement appris un métier, mais j\'ai aussi gagné en confiance. Aujourd\'hui, je peux subvenir à mes besoins et aider ma famille.\'', 'news/1765405767_news-3.jpg', NULL, 'general', '2025-11-20 08:28:52', 'Service Communication', '[\"Formation\", \"Jeunesse\", \"Employabilité\"]', 'published', 317, 1, '2025-12-10 08:28:52', '2026-01-16 18:16:50', NULL),
(4, 'campagne-de-sensibilisation-contre-le-travail-des-enfants-d5mYPP', 'Campagne de sensibilisation contre le travail des enfants', 'Une vaste campagne de sensibilisation est lancée dans 15 communes de Kinshasa pour lutter contre le travail des enfants.', 'L\'AEJT-RDC, en partenariat avec plusieurs organisations locales, lance une campagne de sensibilisation d\'envergure contre le travail des enfants dans la capitale congolaise.\n\nCette campagne, qui durera trois mois, utilisera divers canaux de communication : émissions radio, affiches, théâtre de rue et visites de porte-à-porte. L\'objectif est de toucher au moins 50 000 familles.\n\nLes messages clés portent sur les droits de l\'enfant, les dangers du travail précoce et les alternatives disponibles. Des comités de veille communautaires seront également mis en place pour identifier et orienter les enfants travailleurs vers les services appropriés.', 'news/1765407959_afrique.webp', NULL, 'general', '2025-11-10 08:28:52', 'Département Advocacy', '[\"Sensibilisation\", \"Travail des enfants\", \"Advocacy\"]', 'published', 159, 0, '2025-12-10 08:28:52', '2026-01-16 18:16:53', NULL),
(5, 'nouveau-partenariat-avec-lunicef-pour-la-sante-scolaire-abggUE', 'Nouveau partenariat avec l\'UNICEF pour la santé scolaire', 'Un accord de partenariat avec l\'UNICEF permettra d\'améliorer la santé et la nutrition de 10 000 élèves.', 'L\'AEJT-RDC et l\'UNICEF ont signé un accord de partenariat visant à améliorer la santé et la nutrition des enfants scolarisés dans les zones d\'intervention de l\'organisation.\n\nCe programme comprend la distribution de kits d\'hygiène, l\'installation de points d\'eau potable dans les écoles, des séances de déparasitage et des cantines scolaires.\n\nDr. Emmanuel Mbuyi, coordonnateur du volet santé, précise : \'La malnutrition et les maladies parasitaires sont des obstacles majeurs à l\'apprentissage. En améliorant l\'état de santé des enfants, nous améliorons aussi leurs performances scolaires.\'', 'news/1765407974_activity-1.webp', NULL, 'general', '2025-10-26 08:28:52', 'Direction Partenariats', '[\"Partenariat\", \"Santé\", \"Nutrition\"]', 'published', 213, 0, '2025-12-10 08:28:52', '2026-01-20 20:35:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `type` enum('national','international','local','gouvernemental','prive','ong') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ong',
  `status` enum('active','inactive','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `social_links` json DEFAULT NULL,
  `partnership_start` date DEFAULT NULL,
  `partnership_end` date DEFAULT NULL,
  `partnership_details` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `slug`, `name`, `description`, `logo`, `website`, `email`, `phone`, `address`, `type`, `status`, `featured`, `order`, `social_links`, `partnership_start`, `partnership_end`, `partnership_details`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'onu-femmes', 'ONU FEMMES', 'Entité des Nations Unies pour l\'égalité des sexes et l\'autonomisation des femmes', 'partners/66jCbFJvk2GQ0vmI8Wfv6ef2Dh35yfexsvgSR7cY.jpg', 'https://www.unwomen.org', NULL, '+261328087787', 'Antanimasaja', 'international', 'active', 1, 1, NULL, '2025-12-12', '2025-12-04', 'jyjg', '2025-12-11 14:32:39', '2025-12-11 15:12:38', NULL),
(2, 'rfegl', 'RFEGL', 'Réseau des Femmes pour la Gouvernance et le Leadership', 'partners/66T1eV68RURP5a7NffEiymOe5iB2zLYN2t7tmkkc.png', NULL, NULL, NULL, NULL, 'national', 'active', 1, 2, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-12 14:11:10', NULL),
(3, 'unhcr', 'UNHCR', 'Haut Commissariat des Nations Unies pour les réfugiés', 'partners/9Eqj9NnuqZd66uA7qbRfC5NSpiGOdflasBhQ9c77.png', 'https://www.unhcr.org', NULL, NULL, NULL, 'international', 'active', 1, 3, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-12 14:11:43', NULL),
(4, 'care', 'CARE', 'Organisation humanitaire de lutte contre la pauvreté', 'partners/f8fYK5duLQ19V6BKOmjdJTAWoyXR6AST2ZBnuTwD.jpg', 'https://www.care.org', NULL, NULL, NULL, 'international', 'active', 1, 4, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-12 14:12:12', NULL),
(5, 'unicef', 'UNICEF', 'Fonds des Nations Unies pour l\'enfance', 'partners/0MkN9Adg8LJd4yQLlX8UrxAUNCFkBBiwaKmGhRNZ.jpg', 'https://www.unicef.org', NULL, NULL, NULL, 'international', 'active', 1, 5, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-12 14:12:41', NULL),
(6, 'ifp', 'IFP', 'Institut de Formation Professionnelle', 'partners/ifp.png', NULL, NULL, NULL, NULL, 'local', 'active', 0, 6, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-11 14:32:39', NULL),
(7, 'conafohd', 'CONAFOHD', 'Conseil National des Femmes pour le Développement', 'partners/conafohd.png', NULL, NULL, NULL, NULL, 'national', 'active', 0, 7, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2025-12-11 14:32:39', NULL),
(8, 'maejt', 'MAEJT', 'Mouvement Africain des Enfants et Jeunes Travailleurs', 'partners/Lh7u3KjVEQfYq1pt69Ld7aoKICm3BXBViIjTpSLP.png', NULL, NULL, NULL, NULL, 'international', 'active', 0, 8, NULL, NULL, NULL, NULL, '2025-12-11 14:32:39', '2026-01-08 05:30:12', NULL),
(9, 'harena-heritiana-ratovoarison', 'Harena Heritiana RATOVOARISON', NULL, 'partners/885YXUlCvJPX4ZYKmsQ3iV0sLmYeTs2KopP66oA7.png', NULL, 'harenaheritiana@gmail.com', '+261328087787', 'Antanimasaja', 'ong', 'active', 1, 1, NULL, NULL, NULL, NULL, '2025-12-11 15:15:52', '2025-12-11 15:16:42', '2025-12-11 15:16:42'),
(10, 'rohnal-rdc', 'ROHNAL-RDC', NULL, 'partners/04Zq9D0vmLXiCUh3KcQGUiOqDlvkPRbgwNozAevj.jpg', NULL, NULL, NULL, NULL, 'ong', 'active', 1, 1, NULL, NULL, NULL, NULL, '2026-01-08 05:34:19', '2026-01-08 05:34:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 2, 'auth_token', '1f8a9902dded4f28667405984d4436c5c43d0f58f9f1e302855041fb72b4190b', '[\"*\"]', '2025-12-10 10:23:04', NULL, '2025-12-10 10:22:32', '2025-12-10 10:23:04'),
(14, 'App\\Models\\User', 2, 'auth_token', '12a0aa70ba0ff99cbb20e952a66d7561b2106a1eb285913ec01b932d734ea471', '[\"*\"]', '2025-12-15 19:19:41', NULL, '2025-12-15 18:50:38', '2025-12-15 19:19:41'),
(16, 'App\\Models\\User', 2, 'auth_token', '5c1d48655494c35c0b6dbddf599cc1cd3df1904c384482f6988a17787336e041', '[\"*\"]', '2025-12-24 04:21:00', NULL, '2025-12-17 18:05:03', '2025-12-24 04:21:00'),
(18, 'App\\Models\\User', 2, 'auth_token', 'b53e59dda313ebde4b55d8681b827fc3aae8fcb07ee4e74c0496b493bd8550a3', '[\"*\"]', '2025-12-24 04:45:28', NULL, '2025-12-24 04:41:37', '2025-12-24 04:45:28'),
(26, 'App\\Models\\User', 2, 'auth_token', '6f2152a6113a106a64506d0f7fb43ffd71e047b2b726842c5c32a6c2521a8786', '[\"*\"]', '2026-01-03 17:23:54', NULL, '2026-01-02 14:51:33', '2026-01-03 17:23:54'),
(28, 'App\\Models\\User', 2, 'auth_token', '43d1ba89a23634457c9554954221786b38355cc16fed29a8679af7bb58a61f18', '[\"*\"]', NULL, NULL, '2026-01-04 09:01:49', '2026-01-04 09:01:49'),
(29, 'App\\Models\\User', 2, 'auth_token', '7f56db7680b45ff6bfa853b63ffd8aa98ffd459ee6bc38554158f54edcf3fa32', '[\"*\"]', '2026-01-04 18:32:48', NULL, '2026-01-04 09:01:56', '2026-01-04 18:32:48'),
(32, 'App\\Models\\User', 2, 'auth_token', 'a0ca9a1f30ee9fd056cf6db88c84203df12252ca710a39060d1d6cab048cd041', '[\"*\"]', NULL, NULL, '2026-01-05 10:13:35', '2026-01-05 10:13:35'),
(34, 'App\\Models\\User', 3, 'auth_token', '20e89b436d3c69a53a1c2bc047d55e893b5ba0503529cdcb8dac73058108777a', '[\"*\"]', '2026-01-06 13:56:38', NULL, '2026-01-05 10:16:26', '2026-01-06 13:56:38'),
(38, 'App\\Models\\User', 3, 'auth_token', '4290ad256bbe8e03b72f078c73b18835cef3f33c2159514a35b177ced7e43cdf', '[\"*\"]', '2026-01-06 19:03:14', NULL, '2026-01-06 18:18:11', '2026-01-06 19:03:14'),
(41, 'App\\Models\\User', 2, 'auth_token', '8beb2ffbbe2c20f284040bfbe1692d398d6d72918ce8d52f69a21e3e1d6d6a02', '[\"*\"]', '2026-01-07 17:16:50', NULL, '2026-01-07 05:52:01', '2026-01-07 17:16:50'),
(42, 'App\\Models\\User', 2, 'auth_token', 'fe34cb6f41e8a2842edd219f92c2ab2114b928f57a05d72a7016e8531580de19', '[\"*\"]', '2026-01-08 04:32:55', NULL, '2026-01-07 18:16:32', '2026-01-08 04:32:55'),
(48, 'App\\Models\\User', 1, 'admin-token', 'd9a7a060a3fe14d96d16328af467b7a1d91e1eee312acccd67a46212a5b459ef', '[\"*\"]', '2026-01-22 05:42:21', NULL, '2026-01-08 10:51:12', '2026-01-22 05:42:21'),
(49, 'App\\Models\\User', 2, 'auth_token', 'b60492827aa644bcd3b42f76abbbf122281f2fba833cda09b8b0b82b8745ca2d', '[\"*\"]', NULL, NULL, '2026-01-09 02:36:44', '2026-01-09 02:36:44'),
(50, 'App\\Models\\User', 2, 'auth_token', 'ea17a06b5354d0938fd9215fd613a240aec94d7cadd111e1f32a2c4883e6d9e2', '[\"*\"]', '2026-01-09 16:53:17', NULL, '2026-01-09 02:36:53', '2026-01-09 16:53:17'),
(51, 'App\\Models\\User', 2, 'auth_token', '80be29e78bcce7681f8244b8c88600011692a21d379fad43000d31c314b6778f', '[\"*\"]', '2026-01-11 18:54:28', NULL, '2026-01-11 18:32:05', '2026-01-11 18:54:28'),
(52, 'App\\Models\\User', 2, 'auth_token', '232e95066025cda00ff1c1ea3ce5a010e50da83e89c6b11cd75e0cf0f3269d65', '[\"*\"]', NULL, NULL, '2026-01-14 04:26:12', '2026-01-14 04:26:12'),
(53, 'App\\Models\\User', 2, 'auth_token', '74aaa92ace1f14b6e137387c9978abe7658174ec3f1da73b1c24e81009229121', '[\"*\"]', '2026-01-14 04:55:34', NULL, '2026-01-14 04:26:18', '2026-01-14 04:55:34'),
(54, 'App\\Models\\User', 2, 'auth_token', '2578a5c8d65394d4032ce61c7eb20063d2f33c74fe25dadae1fca0ca8df7a965', '[\"*\"]', NULL, NULL, '2026-01-14 04:57:49', '2026-01-14 04:57:49'),
(57, 'App\\Models\\User', 2, 'auth_token', '3bcc99e0cc4092f4fc8977686618c4de618a7236abd52aeaebed09649c526a0f', '[\"*\"]', NULL, NULL, '2026-01-16 03:55:35', '2026-01-16 03:55:35'),
(58, 'App\\Models\\User', 2, 'auth_token', '09ca212bc7b424084d1c190d10185084af0e901a0d13a879cfa34b980fc4f0dc', '[\"*\"]', '2026-01-16 09:16:15', NULL, '2026-01-16 03:56:02', '2026-01-16 09:16:15'),
(59, 'App\\Models\\User', 2, 'auth_token', 'd54c64ffcb2e4f06f0c28d65ae4aa72c30cde4b88a974ef0f0d417967e7204c0', '[\"*\"]', '2026-01-16 18:34:11', NULL, '2026-01-16 18:00:37', '2026-01-16 18:34:11'),
(60, 'App\\Models\\User', 2, 'auth_token', 'b84ad2659f6a7161c2a3c3d4bc06938b16e8ecfb0a05cfbea383536f8193c11e', '[\"*\"]', NULL, NULL, '2026-01-17 04:26:38', '2026-01-17 04:26:38'),
(61, 'App\\Models\\User', 2, 'auth_token', '39f7aa6047ef8a9162aa76e8c40dd5168b275835801db813311a85a362bf7260', '[\"*\"]', '2026-01-17 04:45:48', NULL, '2026-01-17 04:29:28', '2026-01-17 04:45:48'),
(64, 'App\\Models\\User', 4, 'auth_token', 'cba73c9dc2e3123e4aaa1a9780271187ed9e2d11e74f591cf0c42523833d7c4d', '[\"*\"]', '2026-01-22 09:13:05', NULL, '2026-01-18 20:01:23', '2026-01-22 09:13:05');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `objective` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `execution_zone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('planning','ongoing','completed','suspended') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'planning',
  `results` json DEFAULT NULL,
  `indicators` json DEFAULT NULL,
  `testimonials` json DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` json DEFAULT NULL,
  `domain_id` bigint UNSIGNED DEFAULT NULL,
  `partners` json DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT NULL,
  `beneficiaries_count` int NOT NULL DEFAULT '0',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `slug`, `title`, `excerpt`, `objective`, `execution_zone`, `start_date`, `end_date`, `status`, `results`, `indicators`, `testimonials`, `image`, `images`, `domain_id`, `partners`, `budget`, `beneficiaries_count`, `featured`, `views`, `order`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'programme-deducation-acceleree-dans-le-nord-kivu-KJVk08', 'Programme d\'éducation accélérée dans le Nord-Kivu', 'Offrir une seconde chance de scolarisation aux enfants déscolarisés dans 15 écoles partenaires.', 'Permettre à 1500 enfants âgés de 9 à 14 ans ayant quitté l\'école de rattraper leur retard scolaire et de réintégrer le système éducatif formel. Le programme vise également à former 60 enseignants aux méthodes d\'éducation accélérée et à sensibiliser 500 familles sur l\'importance de la scolarisation.', 'Nord-Kivu (Goma, Rutshuru, Masisi)', '2024-01-15', '2026-06-30', 'ongoing', '[\"1245 enfants réinscrits dans le programme depuis janvier 2024\", \"58 enseignants formés à la pédagogie accélérée\", \"420 familles sensibilisées sur les droits à l\'éducation\", \"Taux de rétention de 87% après 6 mois de programme\", \"85% des enfants ayant terminé le cycle ont réintégré l\'école classique\"]', '[{\"unit\": \"enfants\", \"label\": \"Enfants bénéficiaires\", \"value\": \"1245 / 1500\"}, {\"unit\": \"enseignants\", \"label\": \"Enseignants formés\", \"value\": \"58 / 60\"}, {\"unit\": \"%\", \"label\": \"Taux de rétention\", \"value\": \"87\"}, {\"unit\": \"%\", \"label\": \"Taux de réussite\", \"value\": \"78\"}, {\"unit\": \"USD\", \"label\": \"Budget utilisé\", \"value\": \"145000\"}]', '[{\"name\": \"Marie Kavira\", \"role\": \"Mère d\'élève, Goma\", \"photo\": \"testimonials/marie-kavira.jpg\", \"message\": \"Ma fille avait abandonné l\'école depuis 3 ans. Grâce à ce programme, elle a pu reprendre ses études et elle vient de réussir son examen. Je suis très reconnaissante à l\'AEJT-RDC.\"}, {\"name\": \"Jean Mukendi\", \"role\": \"Enseignant formé, Rutshuru\", \"photo\": \"testimonials/jean-mukendi.jpg\", \"message\": \"La formation que j\'ai reçue a complètement changé ma façon d\'enseigner. Je comprends mieux les besoins des enfants qui ont manqué plusieurs années d\'école.\"}]', 'projects/1766962408_6951b4e86a7cc.jpg', '[\"projects/1768832453_696e3dc53e216.jpg\", \"projects/1768832453_696e3dc54d519.jpg\"]', 2, '[\"UNICEF\", \"Save the Children\", \"Ministère de l\'EPST\"]', 180000.00, 1500, 1, 361, 0, '2025-12-28 18:17:04', '2026-01-20 04:10:28', NULL),
(2, 'protection-des-enfants-vulnerables-au-kasai-9sZXcA', 'Protection des enfants vulnérables au Kasaï', 'Programme de prise en charge psychosociale et de réinsertion familiale pour les enfants en situation de rue.', 'Identifier, protéger et réinsérer 800 enfants en situation de rue dans trois villes du Kasaï. Le projet vise à offrir un accompagnement psychosocial, une médiation familiale, une formation professionnelle et un suivi post-réinsertion pour assurer une réintégration durable.', 'Kasaï (Kananga, Tshikapa, Mbuji-Mayi)', '2024-03-01', '2025-12-31', 'ongoing', '[\"567 enfants identifiés et enregistrés dans le programme\", \"312 enfants réinsérés dans leurs familles avec succès\", \"45 médiations familiales réalisées\", \"89 enfants placés en formation professionnelle\", \"Création de 12 comités de protection communautaire\"]', '[{\"unit\": \"enfants\", \"label\": \"Enfants identifiés\", \"value\": \"567 / 800\"}, {\"unit\": \"enfants\", \"label\": \"Réinsertions familiales\", \"value\": \"312\"}, {\"unit\": \"%\", \"label\": \"Taux de réussite\", \"value\": \"91\"}, {\"unit\": \"comités\", \"label\": \"Comités créés\", \"value\": \"12\"}, {\"unit\": \"%\", \"label\": \"Suivi à 6 mois\", \"value\": \"85\"}]', '[{\"name\": \"Pascal Tshombe\", \"role\": \"Bénéficiaire, 16 ans, Kananga\", \"photo\": \"testimonials/pascal-tshombe.jpg\", \"message\": \"J\'ai vécu 4 ans dans la rue. Aujourd\'hui, je suis retourné chez mes parents et j\'apprends la menuiserie. Ma vie a complètement changé.\"}, {\"name\": \"Maman Celestine\", \"role\": \"Mère, Tshikapa\", \"photo\": \"testimonials/celestine-kasongo.jpg\", \"message\": \"Mon fils est revenu à la maison grâce à l\'équipe de l\'AEJT. Nous avons eu des séances de médiation qui nous ont aidés à nous réconcilier.\"}]', 'projects/1766964852_6951be74c4fd0.jpg', '[\"projects/protection-kasai-1.jpg\", \"projects/protection-kasai-2.jpg\"]', NULL, '[\"Plan International\", \"Caritas Congo\", \"Division Provinciale des Affaires Sociales\"]', 220000.00, 800, 1, 283, 0, '2025-12-28 18:17:04', '2025-12-28 20:34:45', NULL),
(3, 'sante-et-nutrition-scolaire-dans-le-sud-kivu-5tH0Rx', 'Santé et nutrition scolaire dans le Sud-Kivu', 'Amélioration de la santé et de la nutrition des élèves dans 30 écoles primaires.', 'Améliorer l\'état nutritionnel et sanitaire de 10 000 élèves dans 30 écoles du Sud-Kivu par la mise en place de cantines scolaires, des séances de déparasitage, l\'installation de points d\'eau potable et la formation des enseignants aux bonnes pratiques d\'hygiène.', 'Sud-Kivu (Bukavu, Uvira, Walungu)', '2024-09-01', '2027-08-31', 'ongoing', '[\"8 cantines scolaires opérationnelles servant 3200 repas/jour\", \"7500 enfants déparasités lors de la première campagne\", \"15 points d\'eau potable installés\", \"90 enseignants formés à l\'éducation nutritionnelle\", \"Réduction de 34% de l\'absentéisme pour cause de maladie\"]', '[{\"unit\": \"repas\", \"label\": \"Repas servis/jour\", \"value\": \"3200\"}, {\"unit\": \"enfants\", \"label\": \"Enfants déparasités\", \"value\": \"7500 / 10000\"}, {\"unit\": \"points\", \"label\": \"Points d\'eau installés\", \"value\": \"15 / 30\"}, {\"unit\": \"%\", \"label\": \"Réduction absentéisme\", \"value\": \"34\"}, {\"unit\": \"%\", \"label\": \"Amélioration état nutritionnel\", \"value\": \"28\"}]', '[{\"name\": \"Directeur Mushagalusa\", \"role\": \"Directeur d\'école, Bukavu\", \"photo\": \"testimonials/mushagalusa.jpg\", \"message\": \"Depuis que nous avons la cantine scolaire, les résultats des élèves se sont nettement améliorés. Les enfants sont plus concentrés et plus assidus en classe.\"}]', 'projects/1767937113_69609459a8d5f.png', '[\"projects/sante-sud-kivu-1.jpg\", \"projects/sante-sud-kivu-2.jpg\", \"projects/sante-sud-kivu-3.jpg\"]', NULL, '[\"UNICEF\", \"PAM\", \"Ministère de la Santé\", \"OMS\"]', 450000.00, 10000, 1, 198, 0, '2025-12-28 18:17:04', '2026-01-09 02:38:33', NULL),
(4, 'formation-professionnelle-pour-jeunes-descolarises-MqI8I9', 'Formation professionnelle pour jeunes déscolarisés', 'Programme de formation aux métiers porteurs pour 300 jeunes de Kinshasa.', 'Former 300 jeunes déscolarisés de 16 à 25 ans aux métiers de la couture, menuiserie, plomberie, électricité et coiffure. Chaque bénéficiaire reçoit 6 mois de formation théorique et pratique, un kit de démarrage et un accompagnement à l\'insertion professionnelle.', 'Kinshasa (Communes de Masina, Ndjili, Kimbanseke)', '2024-02-01', '2024-08-31', 'completed', '[\"310 jeunes formés (103% de l\'objectif)\", \"285 kits de démarrage distribués\", \"187 jeunes en activité 3 mois après la formation\", \"45 coopératives de jeunes créées\", \"Taux d\'insertion professionnelle de 78%\"]', '[{\"unit\": \"jeunes\", \"label\": \"Jeunes formés\", \"value\": \"310 / 300\"}, {\"unit\": \"%\", \"label\": \"Taux de réussite\", \"value\": \"92\"}, {\"unit\": \"%\", \"label\": \"Insertion à 3 mois\", \"value\": \"78\"}, {\"unit\": \"coopératives\", \"label\": \"Coopératives créées\", \"value\": \"45\"}, {\"unit\": \"%\", \"label\": \"Satisfaction\", \"value\": \"94\"}]', '[{\"name\": \"Grace Mbuyi\", \"role\": \"Bénéficiaire, couturière, 22 ans\", \"photo\": \"testimonials/grace-mbuyi.jpg\", \"message\": \"Grâce à cette formation, j\'ai ouvert mon propre atelier de couture. Je peux maintenant subvenir à mes besoins et aider ma famille. Je suis fière de moi.\"}, {\"name\": \"Patrick Mukendi\", \"role\": \"Bénéficiaire, menuisier, 24 ans\", \"photo\": \"testimonials/patrick-mukendi.jpg\", \"message\": \"J\'ai appris un métier que j\'aime. Maintenant je fabrique des meubles et j\'ai déjà plusieurs clients. Cette formation a changé ma vie.\"}]', 'projects/1767879045_695fb1857057b.jpg', '[\"projects/formation-pro-kinshasa-1.jpg\", \"projects/formation-pro-kinshasa-2.jpg\"]', NULL, '[\"BIT\", \"PNUD\", \"Chambre des Métiers\"]', 85000.00, 310, 0, 146, 0, '2025-12-28 18:17:04', '2026-01-08 10:30:45', NULL),
(5, 'activites-de-levaluation-sur-la-campagne-de-sensibilisation', 'Activités de l\'évaluation sur la campagne de sensibilisation', 'Activités de l\'évaluation sur la campagne de sensibilisation d\'un environnement sain \"stop choléra\" pour sa première phase et la planification de la deuxième phase', 'Analyser le niveau de connaissance, d’attitudes et de pratiques (CAP) des populations cibles sur les mesures d’hygiène et de prévention du choléra après la première phase de la campagne.\n\nIdentifier les forces, faiblesses et défis rencontrés lors de la mise en œuvre de la première phase de la campagne de sensibilisation « Stop Choléra ».\n\nDéfinir des stratégies améliorées et adaptées pour la deuxième phase de la campagne, en tenant compte des résultats de l’évaluation et des besoins réels des communautés.', 'Nord-Kivu (Goma, Rutshuru, Masisi)', '2026-01-01', '2026-01-02', 'planning', '[\"50 enfants guérris\"]', '[{\"unit\": \"enfants\", \"label\": \"Enfants bénéficiaire\", \"value\": \"200\"}]', '[]', 'projects/1768779989_696d70d5eb33f.jpeg', '[\"projects/1768890315_696f1fcb96db1.jpg\"]', 12, '[\"UNICEF\", \"PAM\", \"Ministère de la Santé\", \"OMS\"]', 100000.00, 49, 1, 4, 0, '2026-01-18 20:46:24', '2026-01-20 04:07:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint UNSIGNED NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('conseil_administration','coordination') COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `social_links` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `full_name`, `category`, `position`, `role`, `email`, `phone`, `bio`, `photo`, `display_order`, `is_active`, `social_links`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Dr. KYOMBA AMIMU AKILI', 'conseil_administration', 'Président', NULL, 'kyombaakili140@gmail.com', '+243971677460', 'Président du conseil d\'administration de CEFOD', 'team/jPtfUPd606PAGBQDFxGHv5B3vSovGi9G35VnCjch.png', 1, 1, NULL, '2026-01-07 17:55:15', '2026-01-08 11:05:59', NULL),
(2, 'Carine MWANYANGE', 'conseil_administration', 'Vice-présidente', NULL, 'carine.mwanyange@cefod.org', NULL, 'Vice-présidente du conseil d\'administration', NULL, 2, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(3, 'BICWAHEBWA MAKELELE JERK', 'conseil_administration', 'Membre', 'Chargé de l\'éducation', 'makejerck@gmail.com', '+243970256146', 'Chargé de l\'éducation au conseil d\'administration', NULL, 3, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(4, 'AKONKWA ZIHINDULA JULIEN', 'conseil_administration', 'Membre', 'Chargé des coopératives', 'akonkwazihindulaju@gmail.com', NULL, 'Chargé des coopératives au conseil d\'administration', NULL, 4, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(5, 'ISHARA MULWALA ANDRE', 'conseil_administration', 'Membre', NULL, 'isharaandrea@gmail.com', NULL, 'Membre du conseil d\'administration', NULL, 5, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(6, 'MATONA NURU Emmanuel', 'coordination', 'Coordonnateur', NULL, 'nurmatona@gmail.com', '+243995948132', 'Coordonnateur de CEFOD', NULL, 1, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(7, 'MWIBELECA TUSAMBE CESAR', 'coordination', 'Directeur de programme et projet', NULL, 'cesar.tusambe@cefod.org', NULL, 'Directeur de programme et projet', NULL, 2, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(8, 'ALIMASI SHABANI JACQUES', 'coordination', 'Directeur administratif et financier', NULL, 'jacques.alimasi@cefod.org', NULL, 'Directeur administratif et financier', NULL, 3, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(9, 'USHINDI BUCHAGUZI John', 'coordination', 'Comptable', NULL, 'john.ushindi@cefod.org', NULL, 'Comptable de CEFOD', NULL, 4, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(10, 'CHUMA CHIRHUZA PROSPERE', 'coordination', 'Logisticien et agro-pastoral', NULL, 'chumacirhuzaprospere89@gmail.com', NULL, 'Logisticien et responsable agro-pastoral', NULL, 5, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(11, 'MUGOLI', 'coordination', 'Trésorière', NULL, 'mugoli@cefod.org', NULL, 'Trésorière de CEFOD', NULL, 6, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL),
(12, 'KASHESHA Alain', 'coordination', 'Chargé de protection', NULL, 'alain.kashesha@cefod.org', NULL, 'Chargé de protection', NULL, 7, 1, NULL, '2026-01-07 17:55:15', '2026-01-07 17:55:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `avatar`, `phone`, `bio`, `location`, `role`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur', 'admin@soscongo.org', NULL, '$2y$12$.DuPpREgLils2sxmtpEfKeV2YWKnMq.HnqoapnhGl6sKf9wkf0iJ.', NULL, NULL, NULL, NULL, 'admin', 1, NULL, '2025-12-10 08:28:53', '2025-12-10 08:28:53'),
(2, 'Harena Heritiana RATOVOARISON', 'harenaheritiana@gmail.com', NULL, '$2y$12$VVG.z3DRXNECn2O3bq0wI.wUDKSppIxfrIDS//EJpeigeQ.1Q1rbC', 'avatars/dYbfKAvfn8OHRzdpSQ2XWwxuYhKQr1aZy00wQhaX.jpg', '+261345648512', 'Passionnée de développement et de nouvelles technologies. J’aime créer des solutions utiles et évoluer chaque jour.💛💛', 'Mahajanga, Boeny, Madagascar', 'user', 1, NULL, '2025-12-10 10:22:32', '2026-01-09 02:46:37'),
(3, 'Neric Ben Nirina', 'nericbenirina@gmail.com', NULL, '$2y$12$mrkwN4WFKtUGOTBb9.hi7.ntN64sREou9pIjIkeseqLKQbI.93/.a', 'avatars/cqX49RRtLTT1tOfLsywnlbTJBraefoZwYXZK0yc5.jpg', '+261322727457', 'Passionné de technologie moderne', 'Mahajanga, Boeny, Madagascar', 'user', 1, NULL, '2026-01-05 10:16:26', '2026-01-05 10:17:41'),
(4, 'MALALANYAINA Sandy Watzou', 'watzou@gmail.com', NULL, '$2y$12$913NFxf.vGNcagHlQ3Yq8.hLQhL9/T1g9nMjStkgFb.ctGebS8ZIS', 'avatars/9Z2iVAkXnpeoaQbp5X7LhO2ex6OTHh7jIlRDNmi3.jpg', '0329320134', 'Passionné de Tik Tok 🤗❤️', 'Mahajanga', 'user', 1, NULL, '2026-01-18 19:42:29', '2026-01-18 19:54:01');

-- --------------------------------------------------------

--
-- Table structure for table `violation_reports`
--

CREATE TABLE `violation_reports` (
  `id` bigint UNSIGNED NOT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('safeguarding','corruption','discrimination','harassment','fraud','misconduct','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reporter_type` enum('anonymous','staff','beneficiary','partner','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reporter_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `incident_date` date NOT NULL,
  `reported_date` date NOT NULL,
  `status` enum('pending','investigating','resolved','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `priority` enum('low','medium','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `assigned_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actions_taken` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `violation_reports`
--

INSERT INTO `violation_reports` (`id`, `reference`, `category`, `title`, `description`, `reporter_type`, `reporter_info`, `location`, `incident_date`, `reported_date`, `status`, `priority`, `assigned_to`, `actions_taken`, `notes`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'VR-2024-001', 'safeguarding', 'Suspicion d\'abus sur mineur dans un centre d\'accueil', 'Une famille a signalé des comportements inappropriés d\'un membre du personnel envers son enfant lors des activités éducatives du samedi. L\'enfant présente des signes de détresse émotionnelle et refuse de retourner au centre. Les parents demandent une enquête immédiate.', 'beneficiary', 'Famille anonyme - Contact établi via hotline', 'Centre d\'accueil de Kinshasa, Quartier Lemba', '2026-01-07', '2026-01-08', 'investigating', 'urgent', 'Dr. Marie Kalala - Responsable Safeguarding', 'Suspension immédiate du membre du personnel concerné. Entretiens confidentiels avec la famille et l\'enfant prévus. Coordinateur protection de l\'enfance informé. Investigation en cours avec protocole Child Protection.', 'URGENT - Respecter strictement la confidentialité. Suivi psychologique de l\'enfant assuré. Rapport au coordinateur protection dans 48h.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(2, 'VR-2024-002', 'corruption', 'Détournement de fonds dans un projet communautaire', 'Un audit interne a révélé des incohérences dans les dépenses du projet d\'approvisionnement en eau potable. Des factures gonflées et des paiements à des fournisseurs fictifs ont été identifiés. Montant estimé du détournement : 8 500 USD.', 'staff', 'Équipe d\'audit interne', 'Projet Eau Potable - Province du Kasaï', '2025-11-10', '2025-12-31', 'investigating', 'high', 'Unité Conformité & Audit', 'Gel temporaire des décaissements du projet. Saisine de l\'unité anti-fraude. Collection de toutes les pièces justificatives et factures. Entretiens avec le gestionnaire de projet et les fournisseurs.', 'Collaboration avec les autorités locales en cours. Documentation complète nécessaire pour procédures légales.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(3, 'VR-2024-003', 'discrimination', 'Discrimination ethnique dans le recrutement', 'Plusieurs candidats qualifiés issus de minorités ethniques ont été systématiquement écartés lors des derniers recrutements pour des postes de terrain. Les critères de sélection semblent biaisés en faveur d\'un groupe ethnique spécifique.', 'staff', 'Personnel RH anonyme', 'Bureau de Goma - Province du Nord-Kivu', '2025-11-26', '2025-12-26', 'pending', 'medium', NULL, NULL, 'Nécessite investigation par RH et Direction. Révision des processus de recrutement recommandée.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(4, 'VR-2024-004', 'harassment', 'Harcèlement sexuel au travail', 'Une employée a rapporté des avances répétées et non désirées de la part de son superviseur direct, incluant des commentaires déplacés, des invitations insistantes et des messages inappropriés via WhatsApp. La situation crée un environnement de travail hostile.', 'staff', 'Employée - Identité protégée', 'Bureau régional de Lubumbashi', '2025-11-11', '2026-01-05', 'investigating', 'high', 'Cellule Genre & Protection', 'Réaffectation temporaire de l\'employée pour garantir sa sécurité. Entretien confidentiel réalisé. Convocation du superviseur pour audition. Mesures conservatoires appliquées.', 'CONFIDENTIEL - Protection de la victime prioritaire. Possibilité de sanctions disciplinaires graves.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(5, 'VR-2024-005', 'fraud', 'Falsification de documents administratifs', 'Des certificats de formation professionnelle falsifiés ont été découverts parmi les documents de qualification de certains bénéficiaires du programme de renforcement des capacités. Cela remet en question l\'intégrité du processus de sélection.', 'partner', 'ONG partenaire locale - ASBL Tumaini', 'Programme formation - Bukavu', '2025-12-21', '2026-01-02', 'pending', 'medium', NULL, NULL, 'Vérification de tous les dossiers de candidature nécessaire. Révision des critères d\'éligibilité.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(6, 'VR-2024-006', 'misconduct', 'Utilisation inappropriée des véhicules de l\'organisation', 'Des véhicules de service ont été utilisés à des fins personnelles le week-end, notamment pour des déplacements familiaux et des activités commerciales privées. Le carburant est imputé au budget de l\'organisation.', 'staff', 'Équipe logistique', 'Bureau de Kisangani', '2025-12-11', '2025-12-29', 'resolved', 'low', 'Responsable Logistique', 'Rappel à l\'ordre des conducteurs concernés. Mise en place d\'un système de suivi GPS sur les véhicules. Révision du règlement intérieur sur l\'utilisation des biens de l\'organisation. Remboursement du carburant exigé.', 'Problème résolu. Monitoring renforcé. Aucune récidive constatée depuis 15 jours.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(7, 'VR-2024-007', 'safeguarding', 'Travail des enfants dans un projet agricole partenaire', 'Des enfants de moins de 15 ans ont été observés effectuant des travaux agricoles lourds dans une ferme soutenue par l\'organisation. Violation claire des politiques de protection de l\'enfance et des conventions internationales.', 'staff', 'Agent de suivi terrain', 'Projet agricole - Territoire de Mwenga', '2025-12-10', '2025-12-16', 'resolved', 'urgent', 'Coordinateur Protection', 'Suspension immédiate du partenariat avec la ferme concernée. Retrait des enfants et scolarisation assurée. Sensibilisation communautaire sur les droits de l\'enfant réalisée. Nouveau protocole de monitoring des partenaires instauré.', 'Cas résolu. Les 7 enfants sont désormais scolarisés. Suivi trimestriel mis en place. Partenaire radié définitivement.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(8, 'VR-2024-008', 'discrimination', 'Exclusion de personnes handicapées des activités', 'Les personnes à mobilité réduite sont régulièrement exclues des formations et activités communautaires en raison de l\'inaccessibilité des locaux. Absence de rampes d\'accès et de toilettes adaptées.', 'beneficiary', 'Association des personnes handicapées de Matadi', 'Centre communautaire - Matadi', '2025-10-10', '2025-12-23', 'investigating', 'low', 'Responsable Inclusion', 'Audit d\'accessibilité du centre en cours. Consultations avec des associations de personnes handicapées. Budget pour travaux d\'aménagement en cours de validation.', 'Plan d\'action inclusif en préparation. Délai estimé : 3 mois pour travaux.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(9, 'VR-2024-009', 'corruption', 'Extorsion de pots-de-vin pour l\'accès aux services', 'Des bénéficiaires ont rapporté que certains membres du personnel exigent des paiements illégaux pour accélérer l\'accès aux distributions alimentaires et aux soins de santé. Montants variant entre 5 et 20 USD.', 'beneficiary', 'Groupe de bénéficiaires - Témoignages anonymes', 'Centre de distribution - Camp de Nyarugusu', '2025-12-31', '2026-01-07', 'pending', 'urgent', NULL, NULL, 'Investigation urgente requise. Suspicion sur 3 membres du personnel. Mise en place d\'un système de plainte anonyme recommandé.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(10, 'VR-2024-010', 'harassment', 'Harcèlement moral et intimidation par un supérieur', 'Un coordinateur de programme a été accusé de comportement intimidant, de critiques humiliantes publiques, et de menaces de licenciement abusif envers plusieurs membres de son équipe.', 'staff', '3 employés - Plainte collective', 'Bureau de Kananga', '2025-09-10', '2025-10-10', 'closed', 'medium', 'Direction RH', 'Enquête interne menée avec entretiens de 8 membres de l\'équipe. Formation sur le leadership bienveillant imposée au coordinateur. Plan d\'amélioration comportementale de 6 mois avec suivi RH mensuel. Avertissement formel inscrit au dossier.', 'Cas clos. Amélioration constatée après 3 mois de suivi. Aucune nouvelle plainte.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(11, 'VR-2024-011', 'other', 'Non-respect des normes de sécurité sur chantier', 'Les ouvriers travaillant sur la construction d\'un centre de santé ne disposent pas d\'équipements de protection individuelle (casques, gants, harnais). Risques d\'accidents graves.', 'partner', 'Superviseur de chantier - Entreprise BATIMEX', 'Chantier Centre de Santé - Uvira', '2026-01-03', '2026-01-06', 'investigating', 'medium', 'Responsable Sécurité', 'Arrêt temporaire des travaux. Commande d\'équipements de protection en urgence. Formation sécurité obligatoire pour tous les ouvriers prévue cette semaine.', 'Reprise des travaux conditionnée à la conformité totale aux normes de sécurité.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(12, 'VR-2024-012', 'safeguarding', 'Négligence dans la supervision d\'enfants lors d\'une sortie', 'Lors d\'une excursion éducative, 3 enfants se sont éloignés du groupe sans que le personnel ne s\'en aperçoive pendant plus de 30 minutes. Les enfants ont été retrouvés près d\'une zone dangereuse. Protocole de supervision non respecté.', 'staff', 'Coordinateur éducation', 'Programme éducatif - Kolwezi', '2025-12-27', '2025-12-28', 'resolved', 'high', 'Responsable Safeguarding', 'Rappel immédiat des protocoles de sécurité à tout le personnel. Formation obligatoire sur la supervision des enfants. Ratio adulte/enfant augmenté pour toutes les activités. Politique de sorties révisée et approuvée.', 'Heureusement aucun incident grave. Procédures renforcées. Pas de récidive depuis.', '2026-01-10 18:32:31', '2026-01-10 18:32:31', NULL),
(13, 'VR-2026-013', 'safeguarding', 'travail enfant', 'sfes', 'anonymous', NULL, 'Kinshasa', '2026-01-14', '2026-01-16', 'pending', 'high', NULL, NULL, NULL, '2026-01-16 18:21:40', '2026-01-16 18:21:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Congo',
  `interest_domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skills` text COLLATE utf8mb4_unicode_ci,
  `availability` enum('full_time','part_time','weekends','flexible') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'flexible',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','accepted','rejected','in_progress') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`id`, `first_name`, `last_name`, `email`, `phone`, `address`, `city`, `country`, `interest_domain`, `skills`, `availability`, `message`, `cv_path`, `status`, `admin_notes`, `created_at`, `updated_at`, `deleted_at`) VALUES
(9, 'Harena Heritiana', 'RATOVOARISON', 'harenaheritiana@gmail.com', '+261328087787', 'Antanimasaja', 'Mahajanga', 'Congo', 'Communication', 'qsdsq', 'full_time', 'RÉSUMÉ (en français et en anglais) en ½ page, en un seul paragraphe et interligne =1', 'volunteers/cv/YnIQ9cPlwcE2WOGfn7ZAzim0RcpAOHp8jweZul9B.pdf', 'accepted', 'pas mal', '2026-01-06 19:51:50', '2026-01-14 04:26:41', NULL),
(11, 'Harena Heritiana', 'RATOVOARISON', 'harenaheritiana@gmail.com', '+261328087787', 'Antanimasaja', 'Mahajanga', 'Congo', 'Protection de l\'Enfance', 'sqds', 'flexible', 'RÉSUMÉ (en français et en anglais) en ½ page, en un seul paragraphe et interligne =1', 'volunteers/cv/pvUS9y0PGA9WFs4StalwjXpkYepqUnG1FQlhEUqw.pdf', 'pending', NULL, '2026-01-06 19:56:37', '2026-01-07 07:02:03', '2026-01-07 07:02:03'),
(12, 'Harena', 'Heritiana RATOVOARISON', 'harenaheritiana@gmail.com', '+261345648512', '0208AX0022 Tsararano Ambony', 'Mahajanga', 'Congo', 'Communication', 'fdsf', 'flexible', 'La page indiquant le titre de « Partie » ne doit pas être paginée mais comptée dans le nombre \r\nde page du livre. Cette page ne doit pas contenir de l\'Introduction Partielle laquelle devrait \r\nêtre placée dans la page suivante, c\'est-à-dire juste au-dessus du premier chapitre de la Partie.', 'volunteers/cv/EWkjggz0XSx3kgqGLgmnIbPNS239RcWONlhRZnQt.pdf', 'pending', NULL, '2026-01-14 05:21:55', '2026-01-14 05:21:55', NULL),
(13, 'MALALANYAINA', 'Sandy Watzou', 'watzou@gmail.com', '0329320134', '0208AX0022 Tsararano Ambony', 'Mahajanga', 'Madagascar', 'Logistique', 'Gestionnaire', 'flexible', 'Cecahierdeschargesdéfinitlesattentestechniquesetfonctionnellespourledéveloppe\r\nment du site web de l’organisation humanitaire.', 'volunteers/cv/Yetn9DC9ZF1yCtsnWxJOe37WEDmVGlSxvwuDkxk0.pdf', 'pending', NULL, '2026-01-20 03:38:53', '2026-01-20 03:38:53', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advocacy_campaigns`
--
ALTER TABLE `advocacy_campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_news_id_status_index` (`news_id`,`status`),
  ADD KEY `comments_parent_id_index` (`parent_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `domains_slug_unique` (`slug`);

--
-- Indexes for table `ethical_commitments`
--
ALTER TABLE `ethical_commitments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ethical_commitments_category_index` (`category`),
  ADD KEY `ethical_commitments_is_active_index` (`is_active`),
  ADD KEY `ethical_commitments_priority_index` (`priority`),
  ADD KEY `ethical_commitments_order_created_at_index` (`order`,`created_at`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `humanitarian_alerts`
--
ALTER TABLE `humanitarian_alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intervention_zones`
--
ALTER TABLE `intervention_zones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_offers`
--
ALTER TABLE `job_offers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_offers_slug_unique` (`slug`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `news_slug_unique` (`slug`),
  ADD KEY `news_status_index` (`status`),
  ADD KEY `news_category_index` (`category`),
  ADD KEY `news_published_at_index` (`published_at`),
  ADD KEY `news_featured_index` (`featured`),
  ADD KEY `news_status_published_at_index` (`status`,`published_at`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `partners_slug_unique` (`slug`),
  ADD KEY `partners_status_index` (`status`),
  ADD KEY `partners_type_index` (`type`),
  ADD KEY `partners_featured_index` (`featured`),
  ADD KEY `partners_order_index` (`order`),
  ADD KEY `partners_status_featured_index` (`status`,`featured`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`),
  ADD KEY `projects_status_index` (`status`),
  ADD KEY `projects_domain_id_index` (`domain_id`),
  ADD KEY `projects_featured_index` (`featured`),
  ADD KEY `projects_order_index` (`order`),
  ADD KEY `projects_status_featured_index` (`status`,`featured`),
  ADD KEY `projects_start_date_index` (`start_date`),
  ADD KEY `projects_end_date_index` (`end_date`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_members_email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `violation_reports`
--
ALTER TABLE `violation_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `violation_reports_reference_unique` (`reference`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advocacy_campaigns`
--
ALTER TABLE `advocacy_campaigns`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ethical_commitments`
--
ALTER TABLE `ethical_commitments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `humanitarian_alerts`
--
ALTER TABLE `humanitarian_alerts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `intervention_zones`
--
ALTER TABLE `intervention_zones`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_offers`
--
ALTER TABLE `job_offers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `violation_reports`
--
ALTER TABLE `violation_reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_news_id_foreign` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_domain_id_foreign` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
