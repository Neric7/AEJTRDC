<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{
    /**
     * Liste toutes les offres publiées (Frontend)
     */
    public function index(Request $request)
    {
        try {
            $pageSize = (int) $request->input('pageSize', 10);
            $type = $request->input('type');
            $location = $request->input('location');
            $department = $request->input('department');
            $search = $request->input('search');
            $featured = $request->input('featured');

            $query = JobOffer::published();

            // Filtrer par type
            if ($type) {
                $query->where('type', $type);
            }

            // Filtrer par localisation
            if ($location) {
                $query->where('location', 'like', "%{$location}%");
            }

            // Filtrer par département
            if ($department) {
                $query->where('department', 'like', "%{$department}%");
            }

            // Recherche
            if ($search) {
                $query->search($search);
            }

            // Filtrer les offres en vedette
            if (!is_null($featured)) {
                $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN));
            }

            $jobs = $query->orderBy('published_at', 'desc')
                          ->paginate($pageSize);

            return response()->json($jobs);
        } catch (\Exception $e) {
            Log::error('Error in JobController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des offres',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir une offre par ID ou slug
     */
    public function show($identifier)
    {
        try {
            $job = ctype_digit((string) $identifier)
                ? JobOffer::published()->where('id', $identifier)->first()
                : JobOffer::published()->where('slug', $identifier)->first();

            if (!$job) {
                return response()->json([
                    'message' => 'Offre introuvable ou non publiée.'
                ], 404);
            }

            // Incrémenter le compteur de vues
            $job->incrementViews();

            return response()->json($job);
        } catch (\Exception $e) {
            Log::error('Error in JobController@show: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les offres en vedette
     */
    public function featured()
    {
        try {
            $jobs = JobOffer::published()
                           ->featured()
                           ->orderBy('published_at', 'desc')
                           ->limit(6)
                           ->get();

            return response()->json($jobs);
        } catch (\Exception $e) {
            Log::error('Error in JobController@featured: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des offres en vedette',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les types de contrats disponibles
     */
    public function types()
    {
        try {
            $types = JobOffer::published()
                            ->distinct()
                            ->pluck('type');

            return response()->json(['types' => $types]);
        } catch (\Exception $e) {
            Log::error('Error in JobController@types: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des types',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir uniquement les offres ouvertes (non expirées)
     */
    public function open()
    {
        try {
            $jobs = JobOffer::open()
                           ->orderBy('published_at', 'desc')
                           ->paginate(10);

            return response()->json($jobs);
        } catch (\Exception $e) {
            Log::error('Error in JobController@open: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des offres ouvertes',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}