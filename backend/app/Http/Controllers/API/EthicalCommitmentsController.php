<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EthicalCommitment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EthicalCommitmentsController extends Controller
{
    // =========================================
    // ROUTES PUBLIQUES (Frontend)
    // =========================================

    /**
     * GET /api/ethical-commitments
     * Liste des engagements actifs (PUBLIC)
     */
    public function index(Request $request)
    {
        try {
            $query = EthicalCommitment::where('is_active', true)
                ->orderBy('order', 'asc')
                ->orderBy('created_at', 'desc');

            // Filtrer par catégorie si spécifié
            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            $commitments = $query->get();

            return response()->json([
                'success' => true,
                'data' => $commitments,
                'total' => $commitments->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des engagements',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * GET /api/ethical-commitments/{id}
     * Détail d'un engagement (PUBLIC)
     */
    public function show($id)
    {
        try {
            $commitment = EthicalCommitment::where('is_active', true)->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $commitment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Engagement non trouvé'
            ], 404);
        }
    }

    // =========================================
    // ROUTES ADMIN (Dashboard - CRUD)
    // =========================================

    /**
     * GET /api/admin/ethical-commitments
     * Liste TOUS les engagements (ADMIN)
     */
    public function adminIndex(Request $request)
    {
        try {
            $query = EthicalCommitment::query();

            // Filtrer par catégorie
            if ($request->has('category') && $request->category !== 'all') {
                $query->where('category', $request->category);
            }

            // Filtrer par statut
            if ($request->has('status')) {
                $isActive = $request->status === 'active';
                $query->where('is_active', $isActive);
            }

            // Recherche
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            $commitments = $query->orderBy('order', 'asc')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $commitments,
                'total' => $commitments->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * POST /api/admin/ethical-commitments
     * Créer un engagement (ADMIN)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|in:principes_humanitaires,protection,safeguarding,code_conduite,normes_qualite,environnement',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'reference_documents' => 'nullable|string|max:500',
            'implementation_date' => 'nullable|date',
            'review_date' => 'nullable|date|after:implementation_date',
            'is_active' => 'boolean',
            'order' => 'integer|min:0'
        ], [
            'title.required' => 'Le titre est obligatoire',
            'category.required' => 'La catégorie est obligatoire',
            'description.required' => 'La description est obligatoire',
            'review_date.after' => 'La date de révision doit être après la date de mise en œuvre'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->all();
            
            // Si aucun ordre n'est spécifié, mettre en dernier
            if (!isset($data['order'])) {
                $data['order'] = EthicalCommitment::max('order') + 1;
            }

            $commitment = EthicalCommitment::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Engagement créé avec succès',
                'data' => $commitment
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * PUT /api/admin/ethical-commitments/{id}
     * Mettre à jour un engagement (ADMIN)
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|in:principes_humanitaires,protection,safeguarding,code_conduite,normes_qualite,environnement',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,critical',
            'reference_documents' => 'nullable|string|max:500',
            'implementation_date' => 'nullable|date',
            'review_date' => 'nullable|date|after:implementation_date',
            'is_active' => 'boolean',
            'order' => 'integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $commitment = EthicalCommitment::findOrFail($id);
            $commitment->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Engagement mis à jour avec succès',
                'data' => $commitment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * DELETE /api/admin/ethical-commitments/{id}
     * Supprimer un engagement (ADMIN)
     */
    public function destroy($id)
    {
        try {
            $commitment = EthicalCommitment::findOrFail($id);
            $commitment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Engagement supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * PATCH /api/admin/ethical-commitments/{id}/toggle-status
     * Activer/Désactiver un engagement (ADMIN)
     */
    public function toggleStatus($id)
    {
        try {
            $commitment = EthicalCommitment::findOrFail($id);
            $commitment->is_active = !$commitment->is_active;
            $commitment->save();

            return response()->json([
                'success' => true,
                'message' => $commitment->is_active 
                    ? 'Engagement activé avec succès' 
                    : 'Engagement désactivé avec succès',
                'data' => $commitment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du statut',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * POST /api/admin/ethical-commitments/reorder
     * Réorganiser l'ordre des engagements (ADMIN)
     */
    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'commitments' => 'required|array',
            'commitments.*.id' => 'required|exists:ethical_commitments,id',
            'commitments.*.order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            foreach ($request->commitments as $item) {
                EthicalCommitment::where('id', $item['id'])
                    ->update(['order' => $item['order']]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Ordre mis à jour avec succès'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la réorganisation',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * GET /api/admin/ethical-commitments/stats
     * Statistiques des engagements (ADMIN)
     */
    public function getStats()
    {
        try {
            $stats = [
                'total' => EthicalCommitment::count(),
                'active' => EthicalCommitment::where('is_active', true)->count(),
                'inactive' => EthicalCommitment::where('is_active', false)->count(),
                'by_category' => EthicalCommitment::select('category', DB::raw('count(*) as total'))
                    ->groupBy('category')
                    ->get()
                    ->map(function($item) {
                        return [
                            'category' => $item->category,
                            'total' => $item->total
                        ];
                    }),
                'by_priority' => EthicalCommitment::select('priority', DB::raw('count(*) as total'))
                    ->groupBy('priority')
                    ->get()
                    ->map(function($item) {
                        return [
                            'priority' => $item->priority,
                            'total' => $item->total
                        ];
                    }),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des statistiques',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * GET /api/admin/ethical-commitments/{id}
     * Détail d'un engagement pour l'admin (ADMIN)
     */
    public function adminShow($id)
    {
        try {
            $commitment = EthicalCommitment::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $commitment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Engagement non trouvé'
            ], 404);
        }
    }
}