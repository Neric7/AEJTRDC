# Architecture du Projet SiteCongo

## Vue d'ensemble

SiteCongo est une plateforme humanitaire complète composée de trois applications principales :

### 1. Frontend (React + Vite)
- **Technologie** : React 18, Vite, Tailwind CSS
- **Responsabilité** : Interface utilisateur publique
- **Port** : 5173 (développement)

### 2. Backend (Laravel API)
- **Technologie** : Laravel 10, PHP 8.1+
- **Responsabilité** : API REST, gestion des données, logique métier
- **Port** : 8000 (développement)

### 3. Admin (React Dashboard)
- **Technologie** : React 18, Vite
- **Responsabilité** : Interface d'administration CMS
- **Port** : 3001 (développement)

## Structure des données

### Base de données
- **Moteur** : MySQL 8.0+
- **Migration** : Laravel Migrations
- **Seeders** : Données de test et initiales

### Modèles principaux
- Projects (Projets humanitaires)
- News (Actualités)
- TeamMembers (Équipe)
- Partners (Partenaires)
- Donations (Dons)
- Volunteers (Bénévoles)

## Communication entre services

### API REST
- **Format** : JSON
- **Authentification** : Laravel Sanctum
- **Versioning** : v1 (/api/v1/)

### CORS
- Configuration pour permettre les requêtes cross-origin
- Domains autorisés : localhost:3000, localhost:3001

## Sécurité

### Authentification
- Laravel Sanctum pour l'API
- Sessions pour l'admin
- JWT tokens pour les clients

### Validation
- Laravel Form Requests
- Validation côté client avec React Hook Form
- Sanitisation des entrées

## Déploiement

### Environnements
- **Développement** : Docker Compose
- **Staging** : VPS avec Docker
- **Production** : Serveur dédié

### CI/CD
- GitHub Actions
- Tests automatiques
- Déploiement automatique

## Monitoring

### Logs
- Laravel Log
- Application monitoring
- Error tracking

### Performance
- Cache Redis
- Image optimization
- CDN pour les assets statiques

