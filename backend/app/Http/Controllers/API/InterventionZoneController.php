<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\InterventionZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InterventionZoneController extends Controller
{
    /**
     * Récupérer toutes les zones (PUBLIC)
     * GET /api/intervention-zones
     */
    public function index(Request $request)
    {
        try {
            $query = InterventionZone::query();

            // Filtrer par province
            if ($request->has('province')) {
                $query->where('province', $request->province);
            }

            // Filtrer par type
            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            // Route publique : afficher uniquement les zones actives
            if (!$request->is('api/admin/*')) {
                $query->active();
            }

            $zones = $query->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $zones
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des zones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer une zone spécifique (PUBLIC)
     * GET /api/intervention-zones/{id}
     */
    public function show($id)
    {
        try {
            $zone = InterventionZone::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $zone
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Zone non trouvée'
            ], 404);
        }
    }

    /**
     * Créer une nouvelle zone (ADMIN)
     * POST /api/admin/intervention-zones
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:headquarters,branch,extension',
            'province' => 'required|string|max:255',
            'year_established' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string',
            'projects' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $zone = InterventionZone::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Zone créée avec succès',
                'data' => $zone
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une zone (ADMIN)
     * PUT /api/admin/intervention-zones/{id}
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|in:headquarters,branch,extension',
            'province' => 'sometimes|required|string|max:255',
            'year_established' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 1),
            'address' => 'sometimes|required|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string',
            'projects' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $zone = InterventionZone::findOrFail($id);
            $zone->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Zone mise à jour avec succès',
                'data' => $zone->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une zone (ADMIN)
     * DELETE /api/admin/intervention-zones/{id}
     */
    public function destroy($id)
    {
        try {
            $zone = InterventionZone::findOrFail($id);
            $zone->delete();

            return response()->json([
                'success' => true,
                'message' => 'Zone supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Activer/Désactiver une zone (ADMIN)
     * PATCH /api/admin/intervention-zones/{id}/toggle-status
     */
    public function toggleStatus($id)
    {
        try {
            $zone = InterventionZone::findOrFail($id);
            $zone->is_active = !$zone->is_active;
            $zone->save();

            return response()->json([
                'success' => true,
                'message' => 'Statut modifié avec succès',
                'data' => $zone
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du changement de statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Réorganiser les zones (ADMIN)
     * POST /api/admin/intervention-zones/reorder
     */
    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'zones' => 'required|array',
            'zones.*.id' => 'required|exists:intervention_zones,id',
            'zones.*.order' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            foreach ($request->zones as $zoneData) {
                InterventionZone::where('id', $zoneData['id'])
                    ->update(['order' => $zoneData['order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Ordre mis à jour avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la réorganisation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Statistiques des zones (ADMIN)
     * GET /api/admin/intervention-zones/stats
     */
    public function stats()
    {
        try {
            $stats = [
                'total' => InterventionZone::count(),
                'active' => InterventionZone::active()->count(),
                'inactive' => InterventionZone::where('is_active', false)->count(),
                'headquarters' => InterventionZone::where('type', 'headquarters')->count(),
                'branches' => InterventionZone::where('type', 'branch')->count(),
                'extensions' => InterventionZone::where('type', 'extension')->count(),
                'by_province' => InterventionZone::selectRaw('province, COUNT(*) as count')
                    ->where('is_active', true)
                    ->groupBy('province')
                    ->pluck('count', 'province')
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
}