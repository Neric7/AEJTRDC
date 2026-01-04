<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use App\Models\Partner;
use App\Models\Project;
use App\Models\News;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            $stats = [
                'domains' => Domain::count(),
                'projects' => Project::count(),
                'news' => News::where('status', 'published')->count(),
                'volunteers' => 87,
                'partners' => Partner::count(),
                'donations' => 15420,
                'activeAlerts' => 0,
            ];

            // Retournez directement les stats, pas dans un wrapper
            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRecentActivities()
    {
        try {
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

            // Retournez directement les activités
            return response()->json($activities);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}