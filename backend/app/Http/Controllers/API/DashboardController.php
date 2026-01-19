<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use App\Models\Partner;
use App\Models\Project;
use App\Models\News;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            $stats = [
                'domains' => Domain::count(),
                'projects' => Project::count(),
                'news' => News::where('status', 'published')->count(),
                'volunteers' => Volunteer::count(),
                'volunteers_pending' => Volunteer::where('status', 'pending')->count(),
                'volunteers_accepted' => Volunteer::where('status', 'accepted')->count(),
                'volunteers_rejected' => Volunteer::where('status', 'rejected')->count(),
                'volunteers_in_progress' => Volunteer::where('status', 'in_progress')->count(),
                'partners' => Partner::count(),
                'donations' => $this->getDonationsThisMonth(),
                'activeAlerts' => $this->countActiveAlerts(),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            \Log::error('Error in DashboardController@getStats: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRecentActivities()
    {
        try {
            $activities = [];

            // Dernières candidatures de bénévoles
            $recentVolunteers = Volunteer::latest()->take(2)->get();
            foreach ($recentVolunteers as $volunteer) {
                $activities[] = [
                    'description' => "Nouvelle candidature : {$volunteer->first_name} {$volunteer->last_name} ({$volunteer->interest_domain})",
                    'created_at' => $volunteer->created_at,
                    'type' => 'volunteer',
                    'status' => $volunteer->status
                ];
            }

            // Derniers domaines créés
            $recentDomains = Domain::latest()->take(2)->get();
            foreach ($recentDomains as $domain) {
                $activities[] = [
                    'description' => "Nouveau domaine créé : {$domain->name}",
                    'created_at' => $domain->created_at,
                    'type' => 'domain'
                ];
            }

            // Dernières actualités publiées
            $recentNews = News::where('status', 'published')
                ->latest()
                ->take(2)
                ->get();
            foreach ($recentNews as $news) {
                $activities[] = [
                    'description' => "Actualité publiée : {$news->title}",
                    'created_at' => $news->created_at,
                    'type' => 'news'
                ];
            }

            // Derniers projets
            $recentProjects = Project::latest('updated_at')->take(2)->get();
            foreach ($recentProjects as $project) {
                $activities[] = [
                    'description' => "Projet mis à jour : {$project->title}",
                    'created_at' => $project->updated_at,
                    'type' => 'project'
                ];
            }

            // Derniers partenaires
            $recentPartners = Partner::latest()->take(1)->get();
            foreach ($recentPartners as $partner) {
                $activities[] = [
                    'description' => "Nouveau partenaire : {$partner->name}",
                    'created_at' => $partner->created_at,
                    'type' => 'partner'
                ];
            }

            // Trier par date
            usort($activities, function($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });

            // Limiter à 8 activités
            $activities = array_slice($activities, 0, 8);

            return response()->json($activities);
        } catch (\Exception $e) {
            \Log::error('Error in getRecentActivities: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ NOUVELLE MÉTHODE : Obtenir les alertes actives
     */
    public function getActiveAlerts()
    {
        try {
            $alerts = [];

            // Candidatures en attente
            $pendingVolunteers = Volunteer::where('status', 'pending')->count();
            if ($pendingVolunteers > 0) {
                $alerts[] = [
                    'id' => 'pending_volunteers',
                    'severity' => 'warning',
                    'title' => "{$pendingVolunteers} candidature" . ($pendingVolunteers > 1 ? 's' : '') . " en attente",
                    'description' => "Des candidatures de bénévoles nécessitent votre attention",
                    'created_at' => Volunteer::where('status', 'pending')->latest()->first()->created_at ?? now(),
                    'action_url' => '/admin/volunteers?status=pending'
                ];
            }

            // Actualités en brouillon depuis longtemps
            $oldDrafts = News::where('status', 'draft')
                ->where('created_at', '<', Carbon::now()->subDays(7))
                ->count();
            if ($oldDrafts > 0) {
                $alerts[] = [
                    'id' => 'old_drafts',
                    'severity' => 'info',
                    'title' => "{$oldDrafts} brouillon" . ($oldDrafts > 1 ? 's' : '') . " en attente",
                    'description' => "Des actualités sont en brouillon depuis plus de 7 jours",
                    'created_at' => News::where('status', 'draft')
                        ->where('created_at', '<', Carbon::now()->subDays(7))
                        ->latest()
                        ->first()
                        ->created_at ?? now(),
                    'action_url' => '/admin/news?status=draft'
                ];
            }

            // Projets sans mise à jour récente
            $staleProjects = Project::where('updated_at', '<', Carbon::now()->subDays(30))
                ->where('status', 'active')
                ->count();
            if ($staleProjects > 0) {
                $alerts[] = [
                    'id' => 'stale_projects',
                    'severity' => 'info',
                    'title' => "{$staleProjects} projet" . ($staleProjects > 1 ? 's' : '') . " non mis à jour",
                    'description' => "Des projets actifs n'ont pas été mis à jour depuis 30 jours",
                    'created_at' => now()->subDays(30),
                    'action_url' => '/admin/projects?filter=stale'
                ];
            }

            // Trier par date
            usort($alerts, function($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });

            return response()->json($alerts);
        } catch (\Exception $e) {
            \Log::error('Error in getActiveAlerts: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Compter le nombre total d'alertes actives
     */
    private function countActiveAlerts()
    {
        $count = 0;

        // Candidatures en attente
        $count += Volunteer::where('status', 'pending')->count() > 0 ? 1 : 0;

        // Actualités en brouillon depuis longtemps
        $count += News::where('status', 'draft')
            ->where('created_at', '<', Carbon::now()->subDays(7))
            ->count() > 0 ? 1 : 0;

        // Projets sans mise à jour
        $count += Project::where('updated_at', '<', Carbon::now()->subDays(30))
            ->where('status', 'active')
            ->count() > 0 ? 1 : 0;

        return $count;
    }

    /**
     * Obtenir le montant des dons du mois en cours
     */
    private function getDonationsThisMonth()
    {
        // Temporaire - remplacer quand vous aurez le modèle Donation
        return 15420;
    }

    /**
     * Calculer le temps écoulé depuis une date
     */
    private function getTimeAgo($date)
    {
        $carbon = Carbon::parse($date);
        $now = Carbon::now();

        $diffInMinutes = $carbon->diffInMinutes($now);
        $diffInHours = $carbon->diffInHours($now);
        $diffInDays = $carbon->diffInDays($now);

        if ($diffInMinutes < 60) {
            return $diffInMinutes . ' minute' . ($diffInMinutes > 1 ? 's' : '');
        } elseif ($diffInHours < 24) {
            return $diffInHours . ' heure' . ($diffInHours > 1 ? 's' : '');
        } elseif ($diffInDays < 30) {
            return $diffInDays . ' jour' . ($diffInDays > 1 ? 's' : '');
        } else {
            $diffInMonths = $carbon->diffInMonths($now);
            return $diffInMonths . ' mois';
        }
    }
}