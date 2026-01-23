# Modélisation UML - SiteCongo

Ce dossier contient les diagrammes UML du système SiteCongo.

## Fichiers disponibles

1. **SiteCongo_UML_Model.xmi** - Fichier au format XMI (XML Metadata Interchange) standard UML 2.1
   - ⚠️ **Note** : Ce fichier peut nécessiter une mise à jour manuelle. Le fichier PlantUML est la référence la plus à jour.
2. **SiteCongo_UML_Model.puml** - Fichier PlantUML (format texte lisible) - **RECOMMANDÉ** ✅
   - Ce fichier contient les corrections les plus récentes basées sur l'analyse des routes API

## Import dans Visual Paradigm

### Option 1 : Import XMI (Recommandé)

1. Ouvrir Visual Paradigm
2. Aller dans **File > Import > Import XMI...**
3. Sélectionner le fichier `SiteCongo_UML_Model.xmi`
4. Choisir le format **UML 2.1 XMI**
5. Cliquer sur **Import**

**Note :** Si l'import XMI ne fonctionne pas parfaitement, vous pouvez recréer les diagrammes manuellement en vous basant sur les descriptions ci-dessous.

### Option 2 : Utiliser PlantUML

1. Installer PlantUML (http://plantuml.com/)
2. Installer le plugin PlantUML dans Visual Paradigm (si disponible)
3. Ou utiliser un outil en ligne comme http://www.plantuml.com/plantuml/uml/ pour visualiser
4. Copier-coller le contenu du fichier `.puml` dans l'éditeur

### Option 3 : Création manuelle

Créer les diagrammes manuellement dans Visual Paradigm en suivant les descriptions ci-dessous.

---

## 1. Diagramme de Cas d'Utilisation

### Acteurs
- **Visiteur** : Utilisateur non authentifié
- **Utilisateur** : Utilisateur authentifié (rôle: user)
- **Administrateur** : Utilisateur avec droits admin (rôle: admin)

### Cas d'utilisation - Visiteur (Routes PUBLIQUES)
⚠️ **IMPORTANT** : Les visiteurs n'ont **PAS** accès aux actualités, projets et offres d'emploi (routes protégées par `auth:sanctum`)

- Consulter les domaines d'intervention (`/api/domains/*`)
- Consulter les partenaires (`/api/partners/*`)
- Consulter l'équipe (`/api/team/*`)
- Consulter les alertes humanitaires (`/api/humanitarian/alerts/*`)
- Consulter les engagements éthiques (`/api/humanitarian/ethical-commitments/*`)
- Consulter les zones d'intervention (`/api/intervention-zones/*`)
- Consulter les commentaires (lecture seule) (`/api/news/{id}/comments`)
- S'inscrire (`POST /api/register`)
- Se connecter (`POST /api/login`)
- Contacter l'organisation
- Dénoncer une violation (`POST /api/humanitarian/violations/report`)

### Cas d'utilisation - Utilisateur (Routes PROTÉGÉES - `auth:sanctum`)
🔒 **Nécessite authentification** : Toutes ces fonctionnalités nécessitent un compte utilisateur connecté

- **Consulter les actualités** (`GET /api/news/*`) ⚠️ PROTÉGÉ
- **Consulter les projets** (`GET /api/projects/*`) ⚠️ PROTÉGÉ
- **Consulter les offres d'emploi** (`GET /api/jobs/*`) ⚠️ PROTÉGÉ
- Commenter une actualité (`POST /api/news/{id}/comments`)
- Modifier son commentaire (`PUT /api/comments/{id}`)
- Supprimer son commentaire (`DELETE /api/comments/{id}`)
- Postuler comme bénévole (`POST /api/user/volunteers`)
- Consulter mes candidatures (`GET /api/user/volunteers/my-applications`)
- Gérer son profil (`PUT /api/user/profile`, `POST /api/user/avatar`, etc.)
- Se déconnecter (`POST /api/logout`)

### Cas d'utilisation - Administrateur
- Gérer les actualités (CRUD)
- Gérer les projets (CRUD)
- Gérer les domaines (CRUD)
- Gérer les partenaires (CRUD)
- Gérer l'équipe (CRUD)
- Gérer les offres d'emploi (CRUD)
- Modérer les commentaires
- Gérer les bénévoles
- Gérer les alertes humanitaires
- Gérer les violations
- Gérer les engagements éthiques
- Gérer les zones d'intervention
- Consulter le tableau de bord
- Se connecter (Admin)

---

## 2. Diagramme de Classes

### Classes principales

#### User
- Attributs : id, name, email, password, avatar, phone, bio, location, role, is_active
- Méthodes : isAdmin(), comments()

#### News
- Attributs : id, slug, title, excerpt, content, image, images, category, published_at, author, tags, status, views, featured
- Méthodes : comments(), incrementViews()

#### Comment
- Attributs : id, news_id, parent_id, author_name, author_email, content, status, user_id
- Méthodes : news(), user(), parent(), replies()

#### Project
- Attributs : id, slug, title, excerpt, objective, execution_zone, start_date, end_date, status, results, indicators, testimonials, image, images, domain_id, partners, budget, beneficiaries_count, featured, views
- Méthodes : domain(), incrementViews()

#### Domain
- Attributs : id, titre, slug, image, description_courte, contenu, icon, ordre, actif
- Méthodes : projects()

#### Partner
- Attributs : id, name, slug, type, logo, description, website, contact_email, contact_phone, is_active

#### TeamMember
- Attributs : id, name, position, photo, bio, email, phone, order, is_active

#### JobOffer
- Attributs : id, slug, title, type, location, department, description, requirements, responsibilities, duration, deadline, status, featured, views, applications_count, published_at
- Méthodes : isExpired(), isOpen()

#### Volunteer
- Attributs : id, first_name, last_name, email, phone, address, city, country, interest_domain, skills, availability, message, cv_path, status, admin_notes

#### HumanitarianAlert
- Attributs : id, title, alert_type, severity, location, affected_population, description, needs_identified, response_actions, contact_person, contact_phone, start_date, end_date, is_active

#### ViolationReport
- Attributs : id, reporter_name, reporter_email, reporter_phone, violation_type, location, date_occurred, description, evidence, status, admin_notes

#### EthicalCommitment
- Attributs : id, title, description, category, order, is_active

#### InterventionZone
- Attributs : id, name, location, coordinates, description, order, is_active

#### AdvocacyCampaign
- Attributs : id, title, description, objective, status, start_date, end_date

### Relations
- **User 1..* → Comment** : Un utilisateur peut écrire plusieurs commentaires
- **News 1 → Comment 0..*** : Une actualité peut avoir plusieurs commentaires
- **Comment 0..1 → Comment 0..*** : Un commentaire peut répondre à un autre (relation parent-enfant)
- **Domain 1 → Project 0..*** : Un domaine peut contenir plusieurs projets
- **Project 0..* → Domain 0..1** : Un projet appartient à un domaine

---

## 3. Diagramme de Séquences

### Séquence 1 : Connexion Utilisateur
1. Utilisateur saisit email/password dans Frontend
2. Frontend envoie POST /api/login à Backend
3. Backend vérifie les credentials dans la base de données
4. Backend crée un token via Laravel Sanctum
5. Backend retourne token et données utilisateur
6. Frontend stocke le token et redirige l'utilisateur

### Séquence 2 : Créer une actualité (Admin)
1. Admin remplit le formulaire dans Admin Dashboard
2. Admin Dashboard envoie POST /api/admin/news avec données et image
3. Backend valide les données
4. Backend upload l'image dans Storage
5. Backend sauvegarde l'actualité dans la base de données
6. Backend retourne l'actualité créée
7. Admin Dashboard affiche la confirmation

### Séquence 3 : Commenter une actualité
1. Utilisateur authentifié ajoute un commentaire
2. Frontend envoie POST /api/news/{id}/comments avec token
3. Backend vérifie le token (middleware auth:sanctum)
4. Backend extrait user_id du token
5. Backend sauvegarde le commentaire avec status='pending'
6. Backend retourne le commentaire créé
7. Frontend affiche le commentaire

---

## 4. Diagramme de Déploiement

### Architecture de déploiement

```
Internet
  ↓
Nginx (Reverse Proxy)
  ├─→ Frontend Container (React + Vite) - Port 3000
  ├─→ Admin Container (React + Vite) - Port 3001
  └─→ Backend Container (Laravel API) - Port 8000
        ├─→ MySQL Container - Port 3306
        ├─→ Redis Container - Port 6379
        ├─→ Storage (Files)
        └─→ Mailpit Container - Ports 1025, 8025
```

### Composants

1. **Nginx** : Reverse proxy et serveur web
   - Port 80 (HTTP)
   - Port 443 (HTTPS)

2. **Frontend Container** : Application React publique
   - Port 3000
   - Technologies : React, Vite, TailwindCSS

3. **Admin Container** : Dashboard administrateur
   - Port 3001
   - Technologies : React, Vite, TailwindCSS

4. **Backend Container** : API Laravel
   - Port 8000
   - Technologies : Laravel, PHP, Sanctum

5. **MySQL Container** : Base de données
   - Port 3306
   - Version : MySQL 8.0

6. **Redis Container** : Cache
   - Port 6379

7. **Mailpit Container** : Service email (développement)
   - Port 1025 (SMTP)
   - Port 8025 (Web UI)

### Communication
- Frontend ↔ Backend : Appels API REST (/api/v1/*)
- Admin ↔ Backend : Appels API REST (/api/v1/admin/*)
- Backend ↔ MySQL : Connexion PDO
- Backend ↔ Redis : Connexion cache
- Backend ↔ Storage : Système de fichiers Laravel
- Backend ↔ Mailpit : Envoi d'emails SMTP

---

## Notes importantes

- Tous les diagrammes sont basés sur l'architecture actuelle du projet SiteCongo
- Les relations entre classes reflètent les relations Eloquent définies dans les modèles Laravel
- Les cas d'utilisation correspondent aux routes API définies dans `backend/routes/api.php`
- L'architecture de déploiement correspond à la configuration Docker dans `docker/docker-compose.yml`

### ⚠️ CORRECTION IMPORTANTE - Routes protégées

**Les routes suivantes sont PROTÉGÉES par le middleware `auth:sanctum`** (lignes 68-114 de `backend/routes/api.php`) :

- `/api/news/*` - **TOUTES** les routes actualités nécessitent une authentification
- `/api/projects/*` - **TOUTES** les routes projets nécessitent une authentification  
- `/api/jobs/*` - **TOUTES** les routes offres d'emploi nécessitent une authentification

**Conséquence UML** : 
- Les visiteurs (non authentifiés) **NE PEUVENT PAS** consulter les actualités, projets ou offres d'emploi
- Seuls les utilisateurs authentifiés peuvent accéder à ces ressources
- Les visiteurs peuvent uniquement consulter : domaines, partenaires, équipe, alertes humanitaires, engagements éthiques, zones d'intervention, et lire les commentaires (sans pouvoir en créer)

Cette correction a été appliquée dans le diagramme de cas d'utilisation pour refléter fidèlement l'architecture réelle du système.

---

## Outils recommandés

- **Visual Paradigm** : Pour l'édition et la visualisation des diagrammes UML
- **PlantUML** : Pour visualiser le fichier .puml
- **Draw.io / diagrams.net** : Alternative gratuite pour créer des diagrammes

---

## Mise à jour

Ces diagrammes doivent être mis à jour lorsque :
- De nouveaux modèles sont ajoutés
- De nouvelles routes API sont créées
- L'architecture de déploiement change
- De nouveaux cas d'utilisation sont identifiés
