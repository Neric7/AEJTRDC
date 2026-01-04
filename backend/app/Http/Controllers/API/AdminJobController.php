<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AdminJobController extends Controller
{
    /**
     * Liste toutes les offres d'emploi (Admin)
     */
    public function index(Request $request)
    {
        try {
            $pageSize = (int) $request->input('pageSize', 10);
            $status = $request->input('status');
            $type = $request->input('type');
            $search = $request->input('search');
            $sort = $request->input('sort', 'created_at');
            $order = $request->input('order', 'desc');

            $allowedSortColumns = ['created_at', 'published_at', 'deadline', 'views', 'applications_count', 'title'];
            if (!in_array($sort, $allowedSortColumns, true)) {
                $sort = 'created_at';
            }

            $query = JobOffer::query();

            if ($status) {
                $query->where('status', $status);
            }

            if ($type) {
                $query->where('type', $type);
            }

            if ($search) {
                $query->search($search);
            }

            $jobs = $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc')
                          ->paginate($pageSize);

            return response()->json($jobs);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des offres',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir une offre par ID
     */
    public function show($id)
    {
        try {
            $job = JobOffer::findOrFail($id);
            return response()->json($job);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@show: ' . $e->getMessage());
            return response()->json([
                'message' => 'Offre introuvable',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 404);
        }
    }

    /**
     * Créer une nouvelle offre
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'type' => 'required|in:CDI,CDD,Stage,Freelance',
                'location' => 'required|string|max:255',
                'department' => 'required|string|max:255',
                'description' => 'required|string',
                'requirements' => 'nullable|array',
                'responsibilities' => 'nullable|array',
                'duration' => 'nullable|string|max:100',
                'deadline' => 'nullable|date',
                'status' => 'nullable|in:draft,published,closed,archived',
                'featured' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->all();
            
            // Si le statut est "published" et qu'il n'y a pas de date de publication, on la définit
            if ($data['status'] === 'published' && empty($data['published_at'])) {
                $data['published_at'] = now();
            }

            $job = JobOffer::create($data);

            return response()->json([
                'message' => 'Offre créée avec succès',
                'data' => $job
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@store: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Mettre à jour une offre
     */
    public function update(Request $request, $id)
    {
        try {
            $job = JobOffer::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'type' => 'sometimes|required|in:CDI,CDD,Stage,Freelance',
                'location' => 'sometimes|required|string|max:255',
                'department' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'requirements' => 'nullable|array',
                'responsibilities' => 'nullable|array',
                'duration' => 'nullable|string|max:100',
                'deadline' => 'nullable|date',
                'status' => 'nullable|in:draft,published,closed,archived',
                'featured' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->all();
            
            // Si on passe à "published" et qu'il n'y a pas de date de publication
            if (isset($data['status']) && $data['status'] === 'published' && !$job->published_at) {
                $data['published_at'] = now();
            }

            $job->update($data);

            return response()->json([
                'message' => 'Offre mise à jour avec succès',
                'data' => $job
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@update: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Supprimer une offre
     */
    public function destroy($id)
    {
        try {
            $job = JobOffer::findOrFail($id);
            $job->delete();

            return response()->json([
                'message' => 'Offre supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@destroy: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Publier une offre
     */
    public function publish($id)
    {
        try {
            $job = JobOffer::findOrFail($id);
            
            $job->update([
                'status' => 'published',
                'published_at' => $job->published_at ?? now()
            ]);

            return response()->json([
                'message' => 'Offre publiée avec succès',
                'data' => $job
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@publish: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la publication de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Fermer une offre (plus de candidatures acceptées)
     */
    public function close($id)
    {
        try {
            $job = JobOffer::findOrFail($id);
            
            $job->update([
                'status' => 'closed'
            ]);

            return response()->json([
                'message' => 'Offre fermée avec succès',
                'data' => $job
            ]);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@close: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la fermeture de l\'offre',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir des statistiques sur les offres
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => JobOffer::count(),
                'published' => JobOffer::where('status', 'published')->count(),
                'draft' => JobOffer::where('status', 'draft')->count(),
                'closed' => JobOffer::where('status', 'closed')->count(),
                'open' => JobOffer::open()->count(),
                'total_applications' => JobOffer::sum('applications_count'),
                'total_views' => JobOffer::sum('views'),
                'by_type' => [
                    'CDI' => JobOffer::where('type', 'CDI')->count(),
                    'CDD' => JobOffer::where('type', 'CDD')->count(),
                    'Stage' => JobOffer::where('type', 'Stage')->count(),
                    'Freelance' => JobOffer::where('type', 'Freelance')->count(),
                ],
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            Log::error('Error in AdminJobController@statistics: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des statistiques',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}