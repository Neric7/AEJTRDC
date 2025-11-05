#!/bin/bash

# Script de configuration initiale pour SiteCongo
# Usage: ./scripts/setup.sh

echo "🚀 Configuration initiale de SiteCongo..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier les prérequis
check_requirements() {
    echo "📋 Vérification des prérequis..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    if ! command -v php &> /dev/null; then
        print_error "PHP n'est pas installé"
        exit 1
    fi
    
    if ! command -v composer &> /dev/null; then
        print_error "Composer n'est pas installé"
        exit 1
    fi
    
    print_status "Tous les prérequis sont installés"
}

# Configuration du backend Laravel
setup_backend() {
    echo "🔧 Configuration du backend Laravel..."
    
    cd backend
    
    # Installer les dépendances Composer
    composer install
    
    # Copier le fichier d'environnement
    if [ ! -f .env ]; then
        cp env.example .env
        print_status "Fichier .env créé"
    fi
    
    # Générer la clé d'application
    php artisan key:generate
    
    # Créer le lien symbolique pour le stockage
    php artisan storage:link
    
    print_status "Backend configuré"
    
    cd ..
}

# Configuration du frontend
setup_frontend() {
    echo "🎨 Configuration du frontend React..."
    
    cd frontend
    
    # Installer les dépendances npm
    npm install
    
    # Copier le fichier d'environnement
    if [ ! -f .env ]; then
        cp .env.example .env 2>/dev/null || echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
        print_status "Fichier .env créé"
    fi
    
    print_status "Frontend configuré"
    
    cd ..
}

# Configuration de l'admin
setup_admin() {
    echo "👨‍💼 Configuration de l'admin dashboard..."
    
    cd admin
    
    # Installer les dépendances npm
    npm install
    
    # Copier le fichier d'environnement
    if [ ! -f .env ]; then
        echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
        print_status "Fichier .env créé"
    fi
    
    print_status "Admin dashboard configuré"
    
    cd ..
}

# Configuration de la base de données
setup_database() {
    echo "🗄️ Configuration de la base de données..."
    
    cd backend
    
    # Créer la base de données
    php artisan migrate:fresh --seed
    
    print_status "Base de données configurée avec les données de test"
    
    cd ..
}

# Fonction principale
main() {
    echo "🌟 Bienvenue dans la configuration de SiteCongo !"
    echo ""
    
    check_requirements
    echo ""
    
    setup_backend
    echo ""
    
    setup_frontend
    echo ""
    
    setup_admin
    echo ""
    
    setup_database
    echo ""
    
    print_status "Configuration terminée avec succès !"
    echo ""
    echo "🚀 Pour démarrer le projet :"
    echo "   Backend:  cd backend && php artisan serve"
    echo "   Frontend: cd frontend && npm run dev"
    echo "   Admin:    cd admin && npm run dev"
    echo ""
    echo "📚 Consultez docs/README.md pour plus d'informations"
}

# Exécuter le script
main

