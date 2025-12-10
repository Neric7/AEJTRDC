<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use App\Models\News;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Récupérer les statistiques du dashboard
     */
    public function getStats()
    {
        try {
            $stats = [
                'domains' => Domain::count(), // ✅ Nombre total de domaines
                'projects' => 12, // À remplacer par Project::count() si vous avez le modèle
                'news' => News::where('status', 'published')->count(), // ✅ Actualités publiées
                'volunteers' => 87, // À adapter selon votre modèle
                'donations' => 15420, // À adapter selon votre modèle
                'activeAlerts' => 0, // À adapter selon votre modèle
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les activités récentes
     */
    public function getRecentActivities()
    {
        try {
            // Pour l'instant, données de démonstration
            // Plus tard, vous pourrez créer un modèle Activity pour tracker les actions
            $activities = [
                [
                    'description' => 'Nouveau domaine créé',
                    'time' => '2 heures'
                ],
                [
                    'description' => 'Actualité publiée',
                    'time' => '5 heures'
                ],
                [
                    'description' => 'Projet mis à jour',
                    'time' => '1 jour'
                ],
                [
                    'description' => 'Nouvel utilisateur inscrit',
                    'time' => '2 jours'
                ],
                [
                    'description' => 'Don reçu: 500€',
                    'time' => '3 jours'
                ],
            ];

            return response()->json([
                'success' => true,
                'data' => $activities
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des activités',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}