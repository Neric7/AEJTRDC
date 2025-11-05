# SiteCongo - Plateforme Humanitaire

SiteCongo est une plateforme complète dédiée à l'action humanitaire, composée de trois applications principales : un site web public, une API backend, et un dashboard d'administration.

## 🏗️ Architecture

```
SiteCongo/
├── frontend/          # Application React (Site public)
├── backend/           # API Laravel (Backend)
├── admin/            # Dashboard React (Administration)
├── docs/             # Documentation
├── scripts/          # Scripts utilitaires
├── docker/           # Configuration Docker
└── .github/          # CI/CD GitHub Actions
```

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- PHP 8.1+
- Composer
- MySQL 8.0+
- Docker (optionnel)

### Installation automatique

```bash
# Cloner le projet
git clone https://github.com/votre-org/sitecongo.git
cd sitecongo

# Exécuter le script de configuration
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Installation manuelle

#### 1. Backend Laravel
```bash
cd backend
composer install
cp env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

#### 2. Frontend React
```bash
cd frontend
npm install
npm run dev
```

#### 3. Admin Dashboard
```bash
cd admin
npm install
npm run dev
```

## 🐳 Développement avec Docker

```bash
# Démarrer tous les services
docker-compose -f docker/docker-compose.yml up -d

# Voir les logs
docker-compose -f docker/docker-compose.yml logs -f

# Arrêter les services
docker-compose -f docker/docker-compose.yml down
```

### URLs de développement

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Admin Dashboard** : http://localhost:3001
- **Mailpit** : http://localhost:8025

## 📁 Structure détaillée

### Frontend (React + Vite)
- **Technologie** : React 18, Vite, Tailwind CSS
- **Port** : 3000
- **Fonctionnalités** :
  - Site web public responsive
  - Gestion des projets humanitaires
  - Système de dons
  - Actualités et témoignages

### Backend (Laravel API)
- **Technologie** : Laravel 10, PHP 8.1+
- **Port** : 8000
- **Fonctionnalités** :
  - API REST complète
  - Authentification (Sanctum)
  - Gestion des paiements (Stripe)
  - Upload de fichiers
  - Notifications email

### Admin (React Dashboard)
- **Technologie** : React 18, Vite
- **Port** : 3001
- **Fonctionnalités** :
  - Gestion de contenu
  - Modération des dons
  - Statistiques
  - Gestion des utilisateurs

## 🛠️ Scripts disponibles

### Configuration
```bash
# Configuration initiale complète
./scripts/setup.sh

# Déploiement en production
./scripts/deploy.sh production

# Sauvegarde de la base de données
./scripts/backup.sh
```

### Développement
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && php artisan serve

# Admin
cd admin && npm run dev

# Tests
cd backend && php artisan test
cd frontend && npm test
```

## 🧪 Tests

### Backend (Laravel)
```bash
cd backend
php artisan test
php artisan test --coverage
```

### Frontend (React)
```bash
cd frontend
npm test
npm run test:e2e
```

### Tests d'accessibilité
```bash
cd frontend
npm run test:a11y
```

## 🚀 Déploiement

### Développement
```bash
./scripts/setup.sh
```

### Staging
```bash
./scripts/deploy.sh staging
```

### Production
```bash
./scripts/deploy.sh production
```

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [User Guide](docs/USER_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security](docs/SECURITY.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code

- **PHP** : PSR-12, Laravel conventions
- **JavaScript** : ESLint, Prettier
- **CSS** : Tailwind CSS
- **Tests** : Minimum 80% de couverture

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

- **Documentation** : [docs/](docs/)
- **Issues** : [GitHub Issues](https://github.com/votre-org/sitecongo/issues)
- **Email** : support@sitecongo.org

## 🙏 Remerciements

- Laravel Framework
- React Community
- Tailwind CSS
- Vite
- Tous les contributeurs

---

**SiteCongo** - Faire la différence, une action à la fois. 🌍❤️