#!/bin/bash

# Script de déploiement pour SiteCongo
# Usage: ./scripts/deploy.sh [environment]

set -e

# Configuration
ENVIRONMENT=${1:-production}
BACKUP_DIR="/var/backups/sitecongo"
PROJECT_DIR="/var/www/sitecongo"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Fonction de sauvegarde
backup_database() {
    echo "💾 Sauvegarde de la base de données..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/database_backup_$TIMESTAMP.sql"
    
    mkdir -p $BACKUP_DIR
    
    mysqldump -u root -p sitecongo > $BACKUP_FILE
    
    print_status "Sauvegarde créée: $BACKUP_FILE"
}

# Déploiement du backend
deploy_backend() {
    echo "🔧 Déploiement du backend Laravel..."
    
    cd $PROJECT_DIR/backend
    
    # Mettre à jour le code
    git pull origin main
    
    # Installer les dépendances
    composer install --no-dev --optimize-autoloader
    
    # Migrations
    php artisan migrate --force
    
    # Cache optimization
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    # Permissions
    chmod -R 755 storage bootstrap/cache
    
    print_status "Backend déployé"
}

# Déploiement du frontend
deploy_frontend() {
    echo "🎨 Déploiement du frontend React..."
    
    cd $PROJECT_DIR/frontend
    
    # Mettre à jour le code
    git pull origin main
    
    # Installer les dépendances
    npm ci --production
    
    # Build de production
    npm run build
    
    print_status "Frontend déployé"
}

# Déploiement de l'admin
deploy_admin() {
    echo "👨‍💼 Déploiement de l'admin dashboard..."
    
    cd $PROJECT_DIR/admin
    
    # Mettre à jour le code
    git pull origin main
    
    # Installer les dépendances
    npm ci --production
    
    # Build de production
    npm run build
    
    print_status "Admin dashboard déployé"
}

# Redémarrage des services
restart_services() {
    echo "🔄 Redémarrage des services..."
    
    # Redémarrer Nginx
    systemctl restart nginx
    
    # Redémarrer PHP-FPM
    systemctl restart php8.1-fpm
    
    print_status "Services redémarrés"
}

# Vérification de la santé
health_check() {
    echo "🏥 Vérification de la santé de l'application..."
    
    # Vérifier le backend
    if curl -f http://localhost:8000/api/v1/health > /dev/null 2>&1; then
        print_status "Backend API opérationnel"
    else
        print_error "Backend API non accessible"
        exit 1
    fi
    
    # Vérifier le frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "Frontend opérationnel"
    else
        print_error "Frontend non accessible"
        exit 1
    fi
    
    print_status "Tous les services sont opérationnels"
}

# Fonction principale
main() {
    echo "🚀 Déploiement de SiteCongo sur $ENVIRONMENT"
    echo ""
    
    if [ "$ENVIRONMENT" = "production" ]; then
        print_warning "Déploiement en production détecté"
        read -p "Êtes-vous sûr de vouloir continuer ? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Déploiement annulé"
            exit 1
        fi
        
        backup_database
        echo ""
    fi
    
    deploy_backend
    echo ""
    
    deploy_frontend
    echo ""
    
    deploy_admin
    echo ""
    
    restart_services
    echo ""
    
    health_check
    echo ""
    
    print_status "Déploiement terminé avec succès !"
    echo ""
    echo "🌐 Applications disponibles :"
    echo "   Frontend: https://sitecongo.org"
    echo "   Admin:    https://admin.sitecongo.org"
    echo "   API:      https://api.sitecongo.org"
}

# Exécuter le script
main

