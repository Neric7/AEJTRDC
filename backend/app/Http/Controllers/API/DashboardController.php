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
                'volunteers' => Volunteer::count(), // ✅ Total de tous les bénévoles
                'volunteers_pending' => Volunteer::where('status', 'pending')->count(),
                'volunteers_accepted' => Volunteer::where('status', 'accepted')->count(),
                'volunteers_rejected' => Volunteer::where('status', 'rejected')->count(),
                'volunteers_in_progress' => Volunteer::where('status', 'in_progress')->count(),
                'partners' => Partner::count(),
                'donations' => $this->getDonationsThisMonth(),
                'activeAlerts' => 0,
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
                    'description' => "Nouvelle candidature : {$volunteer->full_name} ({$volunteer->interest_domain})",
                    'time' => $this->getTimeAgo($volunteer->created_at),
                    'type' => 'volunteer',
                    'status' => $volunteer->status
                ];
            }

            // Derniers domaines créés
            $recentDomains = Domain::latest()->take(2)->get();
            foreach ($recentDomains as $domain) {
                $activities[] = [
                    'description' => "Nouveau domaine créé : {$domain->name}",
                    'time' => $this->getTimeAgo($domain->created_at),
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
                    'time' => $this->getTimeAgo($news->created_at),
                    'type' => 'news'
                ];
            }

            // Derniers projets mis à jour
            $recentProjects = Project::latest('updated_at')->take(2)->get();
            foreach ($recentProjects as $project) {
                $activities[] = [
                    'description' => "Projet mis à jour : {$project->title}",
                    'time' => $this->getTimeAgo($project->updated_at),
                    'type' => 'project'
                ];
            }

            // Derniers partenaires ajoutés
            $recentPartners = Partner::latest()->take(1)->get();
            foreach ($recentPartners as $partner) {
                $activities[] = [
                    'description' => "Nouveau partenaire : {$partner->name}",
                    'time' => $this->getTimeAgo($partner->created_at),
                    'type' => 'partner'
                ];
            }

            // Trier par date (les plus récents en premier)
            usort($activities, function($a, $b) {
                // On ne peut pas vraiment trier par "2 heures" vs "1 jour"
                // Donc on garde l'ordre d'insertion qui est déjà chronologique
                return 0;
            });

            // Limiter à 5 activités
            $activities = array_slice($activities, 0, 5);

            return response()->json($activities);
        } catch (\Exception $e) {
            \Log::error('Error in getRecentActivities: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir le montant des dons du mois en cours
     * À implémenter quand vous aurez un modèle Donation
     */
    private function getDonationsThisMonth()
    {
        // Option 1 : Si vous avez un modèle Donation
        // return \App\Models\Donation::whereMonth('created_at', Carbon::now()->month)
        //     ->whereYear('created_at', Carbon::now()->year)
        //     ->sum('amount');

        // Option 2 : Valeur temporaire (à remplacer)
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

    /**
     * Obtenir les statistiques détaillées par période
     */
    public function getDetailedStats(Request $request)
    {
        try {
            $period = $request->input('period', 'month'); // day, week, month, year

            $startDate = match($period) {
                'day' => Carbon::today(),
                'week' => Carbon::now()->startOfWeek(),
                'month' => Carbon::now()->startOfMonth(),
                'year' => Carbon::now()->startOfYear(),
                default => Carbon::now()->startOfMonth(),
            };

            $stats = [
                'volunteers' => [
                    'total' => Volunteer::count(),
                    'new' => Volunteer::where('created_at', '>=', $startDate)->count(),
                    'pending' => Volunteer::where('status', 'pending')->count(),
                    'accepted' => Volunteer::where('status', 'accepted')->count(),
                    'rejected' => Volunteer::where('status', 'rejected')->count(),
                    'in_progress' => Volunteer::where('status', 'in_progress')->count(),
                ],
                'projects' => [
                    'total' => Project::count(),
                    'new' => Project::where('created_at', '>=', $startDate)->count(),
                    'active' => Project::where('status', 'active')->count(),
                ],
                'domains' => [
                    'total' => Domain::count(),
                    'new' => Domain::where('created_at', '>=', $startDate)->count(),
                ],
                'news' => [
                    'total' => News::count(),
                    'published' => News::where('status', 'published')->count(),
                    'draft' => News::where('status', 'draft')->count(),
                    'new' => News::where('created_at', '>=', $startDate)->count(),
                ],
                'partners' => [
                    'total' => Partner::count(),
                    'new' => Partner::where('created_at', '>=', $startDate)->count(),
                ],
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            \Log::error('Error in getDetailedStats: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir les statistiques des bénévoles par domaine d'intérêt
     */
    public function getVolunteersByDomain()
    {
        try {
            $volunteersByDomain = Volunteer::select('interest_domain', DB::raw('count(*) as total'))
                ->groupBy('interest_domain')
                ->orderBy('total', 'desc')
                ->get();

            return response()->json($volunteersByDomain);
        } catch (\Exception $e) {
            \Log::error('Error in getVolunteersByDomain: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir les bénévoles récents en attente de traitement
     */
    public function getPendingVolunteers()
    {
        try {
            $pendingVolunteers = Volunteer::where('status', 'pending')
                ->latest()
                ->take(10)
                ->get();

            return response()->json([
                'total' => Volunteer::where('status', 'pending')->count(),
                'volunteers' => $pendingVolunteers
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getPendingVolunteers: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}