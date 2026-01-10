<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ViolationReport;
use App\Models\HumanitarianAlert;
use App\Models\AdvocacyCampaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HumanitarianController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | VIOLATIONS - Routes Publiques
    |--------------------------------------------------------------------------
    */

    /**
     * Soumettre un signalement de violation (PUBLIC)
     * POST /api/humanitarian/violations/report
     */
    public function reportViolation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|in:safeguarding,corruption,discrimination,harassment,fraud,misconduct,other',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'reporter_type' => 'required|in:anonymous,staff,beneficiary,partner,other',
            'reporter_info' => 'nullable|string',
            'location' => 'required|string|max:255',
            'incident_date' => 'required|date',
            'priority' => 'nullable|in:low,medium,high,urgent'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $violation = ViolationReport::create([
                'category' => $request->category,
                'title' => $request->title,
                'description' => $request->description,
                'reporter_type' => $request->reporter_type,
                'reporter_info' => $request->reporter_info,
                'location' => $request->location,
                'incident_date' => $request->incident_date,
                'reported_date' => now(),
                'status' => 'pending',
                'priority' => $request->priority ?? 'medium'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Signalement enregistré avec succès. Référence: ' . $violation->reference,
                'data' => [
                    'reference' => $violation->reference,
                    'id' => $violation->id
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement du signalement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | VIOLATIONS - Routes Admin (Protégées)
    |--------------------------------------------------------------------------
    */

    /**
     * Récupérer tous les signalements (ADMIN)
     * GET /api/admin/humanitarian/violations
     */
    public function getViolations(Request $request)
    {
        try {
            $query = ViolationReport::query();

            // Filtrer par catégorie
            if ($request->has('category') && $request->category !== 'all') {
                $query->byCategory($request->category);
            }

            // Filtrer par statut
            if ($request->has('status') && $request->status !== 'all') {
                $query->byStatus($request->status);
            }

            // Filtrer par priorité
            if ($request->has('priority')) {
                $query->where('priority', $request->priority);
            }

            // Trier par date de création (plus récent en premier)
            $violations = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $violations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des signalements',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer un signalement spécifique (ADMIN)
     * GET /api/admin/humanitarian/violations/{id}
     */
    public function getViolation($id)
    {
        try {
            $violation = ViolationReport::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $violation
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Signalement non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Mettre à jour le statut d'un signalement (ADMIN)
     * PUT /api/admin/humanitarian/violations/{id}/status
     */
    public function updateViolationStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,investigating,resolved,closed',
            'assigned_to' => 'nullable|string',
            'actions_taken' => 'nullable|string',
            'notes' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high,urgent'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $violation = ViolationReport::findOrFail($id);

            $violation->update([
                'status' => $request->status,
                'assigned_to' => $request->assigned_to ?? $violation->assigned_to,
                'actions_taken' => $request->actions_taken ?? $violation->actions_taken,
                'notes' => $request->notes ?? $violation->notes,
                'priority' => $request->priority ?? $violation->priority
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Statut mis à jour avec succès',
                'data' => $violation
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
     * Supprimer un signalement (ADMIN)
     * DELETE /api/admin/humanitarian/violations/{id}
     */
    public function deleteViolation($id)
    {
        try {
            $violation = ViolationReport::findOrFail($id);
            $violation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Signalement supprimé avec succès'
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
     * Statistiques des violations (ADMIN)
     * GET /api/admin/humanitarian/violations/stats
     */
    public function getViolationStats()
    {
        try {
            $stats = [
                'total' => ViolationReport::count(),
                'pending' => ViolationReport::where('status', 'pending')->count(),
                'investigating' => ViolationReport::where('status', 'investigating')->count(),
                'resolved' => ViolationReport::where('status', 'resolved')->count(),
                'closed' => ViolationReport::where('status', 'closed')->count(),
                'urgent' => ViolationReport::where('priority', 'urgent')->count(),
                'by_category' => ViolationReport::selectRaw('category, COUNT(*) as count')
                    ->groupBy('category')
                    ->pluck('count', 'category'),
                'recent' => ViolationReport::where('created_at', '>=', now()->subDays(30))->count()
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

    /*
    |--------------------------------------------------------------------------
    | ALERTES HUMANITAIRES
    |--------------------------------------------------------------------------
    */

    /**
     * Récupérer toutes les alertes
     * GET /api/humanitarian/alerts (PUBLIC - actives uniquement)
     * GET /api/admin/humanitarian/alerts (ADMIN - toutes)
     */
    public function getAlerts(Request $request)
    {
        try {
            $query = HumanitarianAlert::query();

            // Si route publique (non admin), ne montrer que les alertes actives
            $isAdmin = $request->is('api/admin/*');
            if (!$isAdmin) {
                $query->where('is_active', true);
            }

            // Filtrer par type d'alerte
            if ($request->has('alert_type') && $request->alert_type !== 'all') {
                $query->byType($request->alert_type);
            }

            // Filtrer par sévérité
            if ($request->has('severity') && $request->severity !== 'all') {
                $query->bySeverity($request->severity);
            }

            // Filtrer par statut actif (admin uniquement)
            if ($isAdmin && $request->has('is_active')) {
                $query->where('is_active', $request->is_active);
            }

            // Trier : critiques d'abord, puis par date
            $alerts = $query->orderByRaw("FIELD(severity, 'critical', 'high', 'medium', 'low')")
                           ->orderBy('created_at', 'desc')
                           ->get();

            return response()->json([
                'success' => true,
                'data' => $alerts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des alertes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer une alerte spécifique
     * GET /api/humanitarian/alerts/{id}
     * GET /api/admin/humanitarian/alerts/{id}
     */
    public function getAlert($id)
    {
        try {
            $alert = HumanitarianAlert::findOrFail($id);

            // Si route publique, vérifier que l'alerte est active
            $isAdmin = request()->is('api/admin/*');
            if (!$isAdmin && !$alert->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Alerte non disponible'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $alert
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Alerte non trouvée',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Créer une nouvelle alerte (ADMIN)
     * POST /api/admin/humanitarian/alerts
     */
    public function createAlert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'alert_type' => 'required|in:natural_disaster,conflict,epidemic,food_insecurity,displacement,infrastructure,other',
            'severity' => 'required|in:low,medium,high,critical',
            'location' => 'required|string|max:255',
            'affected_population' => 'nullable|string',
            'description' => 'required|string',
            'needs_identified' => 'nullable|string',
            'response_actions' => 'nullable|string',
            'contact_person' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $alert = HumanitarianAlert::create([
                'title' => $request->title,
                'alert_type' => $request->alert_type,
                'severity' => $request->severity,
                'location' => $request->location,
                'affected_population' => $request->affected_population,
                'description' => $request->description,
                'needs_identified' => $request->needs_identified,
                'response_actions' => $request->response_actions,
                'contact_person' => $request->contact_person,
                'contact_phone' => $request->contact_phone,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'is_active' => $request->is_active ?? true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Alerte créée avec succès',
                'data' => $alert
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'alerte',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une alerte (ADMIN)
     * PUT /api/admin/humanitarian/alerts/{id}
     */
    public function updateAlert(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'alert_type' => 'sometimes|required|in:natural_disaster,conflict,epidemic,food_insecurity,displacement,infrastructure,other',
            'severity' => 'sometimes|required|in:low,medium,high,critical',
            'location' => 'sometimes|required|string|max:255',
            'affected_population' => 'nullable|string',
            'description' => 'sometimes|required|string',
            'needs_identified' => 'nullable|string',
            'response_actions' => 'nullable|string',
            'contact_person' => 'sometimes|required|string|max:255',
            'contact_phone' => 'sometimes|required|string|max:20',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $alert = HumanitarianAlert::findOrFail($id);
            $alert->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Alerte mise à jour avec succès',
                'data' => $alert->fresh()
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
     * Supprimer une alerte (ADMIN)
     * DELETE /api/admin/humanitarian/alerts/{id}
     */
    public function deleteAlert($id)
    {
        try {
            $alert = HumanitarianAlert::findOrFail($id);
            $alert->delete();

            return response()->json([
                'success' => true,
                'message' => 'Alerte supprimée avec succès'
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
     * Activer une alerte (ADMIN)
     * PATCH /api/admin/humanitarian/alerts/{id}/activate
     */
    public function activateAlert($id)
    {
        try {
            $alert = HumanitarianAlert::findOrFail($id);
            $alert->update(['is_active' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Alerte activée avec succès',
                'data' => $alert->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'activation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Désactiver une alerte (ADMIN)
     * PATCH /api/admin/humanitarian/alerts/{id}/deactivate
     */
    public function deactivateAlert($id)
    {
        try {
            $alert = HumanitarianAlert::findOrFail($id);
            $alert->update(['is_active' => false]);

            return response()->json([
                'success' => true,
                'message' => 'Alerte désactivée avec succès',
                'data' => $alert->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la désactivation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Statistiques des alertes (ADMIN)
     * GET /api/admin/humanitarian/alerts/stats
     */
    public function getAlertsStats()
    {
        try {
            $stats = [
                'total' => HumanitarianAlert::count(),
                'active' => HumanitarianAlert::active()->count(),
                'inactive' => HumanitarianAlert::where('is_active', false)->count(),
                'critical' => HumanitarianAlert::active()->critical()->count(),
                'by_severity' => [
                    'critical' => HumanitarianAlert::active()->where('severity', 'critical')->count(),
                    'high' => HumanitarianAlert::active()->where('severity', 'high')->count(),
                    'medium' => HumanitarianAlert::active()->where('severity', 'medium')->count(),
                    'low' => HumanitarianAlert::active()->where('severity', 'low')->count()
                ],
                'by_type' => HumanitarianAlert::selectRaw('alert_type, COUNT(*) as count')
                    ->where('is_active', true)
                    ->groupBy('alert_type')
                    ->pluck('count', 'alert_type'),
                'recent' => HumanitarianAlert::where('created_at', '>=', now()->subDays(30))->count()
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

    /*
    |--------------------------------------------------------------------------
    | PLAIDOYER / ADVOCACY CAMPAIGNS
    |--------------------------------------------------------------------------
    */

    /**
     * Récupérer toutes les campagnes de plaidoyer
     * GET /api/humanitarian/advocacy (PUBLIC - actives uniquement)
     * GET /api/admin/humanitarian/advocacy (ADMIN - toutes)
     */
    public function getAdvocacyActions(Request $request)
    {
        try {
            $query = AdvocacyCampaign::query();

            // Si route publique (non admin), ne montrer que les campagnes actives
            $isAdmin = $request->is('api/admin/*');
            if (!$isAdmin) {
                $query->where('is_active', true);
            }

            // Filtrer par thème
            if ($request->has('theme') && $request->theme !== 'all') {
                $query->byTheme($request->theme);
            }

            // Filtrer par statut
            if ($request->has('status') && $request->status !== 'all') {
                $query->byStatus($request->status);
            }

            // Filtrer par statut actif (admin uniquement)
            if ($isAdmin && $request->has('is_active')) {
                $query->where('is_active', $request->is_active);
            }

            // Trier par date de création (plus récent en premier)
            $campaigns = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $campaigns
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du chargement des campagnes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer une campagne spécifique
     * GET /api/humanitarian/advocacy/{id}
     * GET /api/admin/humanitarian/advocacy/{id}
     */
    public function getAdvocacyAction($id)
    {
        try {
            $campaign = AdvocacyCampaign::findOrFail($id);

            // Si route publique, vérifier que la campagne est active
            $isAdmin = request()->is('api/admin/*');
            if (!$isAdmin && !$campaign->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Campagne non disponible'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $campaign
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Campagne non trouvée',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Créer une nouvelle campagne de plaidoyer (ADMIN)
     * POST /api/admin/humanitarian/advocacy
     */
    public function createAdvocacy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'theme' => 'required|in:protection,education,health,nutrition,wash,livelihoods,climate,governance',
            'objective' => 'required|string',
            'target_audience' => 'required|string|max:255',
            'key_messages' => 'nullable|string',
            'activities' => 'nullable|string',
            'timeline' => 'nullable|string',
            'budget' => 'nullable|string',
            'partners' => 'nullable|string',
            'indicators' => 'nullable|string',
            'progress' => 'nullable|integer|min:0|max:100',
            'status' => 'required|in:planning,ongoing,completed,on_hold',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $campaign = AdvocacyCampaign::create([
                'title' => $request->title,
                'theme' => $request->theme,
                'objective' => $request->objective,
                'target_audience' => $request->target_audience,
                'key_messages' => $request->key_messages,
                'activities' => $request->activities,
                'timeline' => $request->timeline,
                'budget' => $request->budget,
                'partners' => $request->partners,
                'indicators' => $request->indicators,
                'progress' => $request->progress ?? 0,
                'status' => $request->status,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'is_active' => $request->is_active ?? true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Campagne créée avec succès',
                'data' => $campaign
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la campagne',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une campagne (ADMIN)
     * PUT /api/admin/humanitarian/advocacy/{id}
     */
    public function updateAdvocacy(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'theme' => 'sometimes|required|in:protection,education,health,nutrition,wash,livelihoods,climate,governance',
            'objective' => 'sometimes|required|string',
            'target_audience' => 'sometimes|required|string|max:255',
            'key_messages' => 'nullable|string',
            'activities' => 'nullable|string',
            'timeline' => 'nullable|string',
            'budget' => 'nullable|string',
            'partners' => 'nullable|string',
            'indicators' => 'nullable|string',
            'progress' => 'nullable|integer|min:0|max:100',
            'status' => 'sometimes|required|in:planning,ongoing,completed,on_hold',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $campaign = AdvocacyCampaign::findOrFail($id);
            $campaign->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Campagne mise à jour avec succès',
                'data' => $campaign->fresh()
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
     * Supprimer une campagne (ADMIN)
     * DELETE /api/admin/humanitarian/advocacy/{id}
     */
    public function deleteAdvocacy($id)
    {
        try {
            $campaign = AdvocacyCampaign::findOrFail($id);
            $campaign->delete();

            return response()->json([
                'success' => true,
                'message' => 'Campagne supprimée avec succès'
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
     * Statistiques des campagnes (ADMIN)
     * GET /api/admin/humanitarian/advocacy/stats
     */
    public function getAdvocacyStats()
    {
        try {
            $stats = [
                'total' => AdvocacyCampaign::count(),
                'active' => AdvocacyCampaign::active()->count(),
                'inactive' => AdvocacyCampaign::where('is_active', false)->count(),
                'ongoing' => AdvocacyCampaign::where('status', 'ongoing')->count(),
                'completed' => AdvocacyCampaign::where('status', 'completed')->count(),
                'planning' => AdvocacyCampaign::where('status', 'planning')->count(),
                'on_hold' => AdvocacyCampaign::where('status', 'on_hold')->count(),
                'by_theme' => AdvocacyCampaign::selectRaw('theme, COUNT(*) as count')
                    ->where('is_active', true)
                    ->groupBy('theme')
                    ->pluck('count', 'theme'),
                'avg_progress' => AdvocacyCampaign::where('is_active', true)->avg('progress') ?? 0
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