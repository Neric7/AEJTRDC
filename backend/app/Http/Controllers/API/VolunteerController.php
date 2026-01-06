<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\VolunteerRequest;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VolunteerController extends Controller
{
    /**
     * Display a listing of volunteers (PUBLIC - pour frontend)
     */
    public function index(Request $request)
    {
        try {
            $query = Volunteer::query();

            // Filtrer par statut
            if ($request->has('status')) {
                $query->status($request->status);
            }

            // Recherche
            if ($request->has('search')) {
                $query->search($request->search);
            }

            $volunteers = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json($volunteers);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du chargement des bénévoles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🆕 Récupérer toutes les candidatures de l'utilisateur connecté
     */
    public function myApplications()
    {
        try {
            $user = auth()->user();
            
            $applications = Volunteer::where('email', $user->email)
                ->whereNull('deleted_at')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'count' => $applications->count(),
                'applications' => $applications,
                'can_apply' => $applications->count() < 5
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du chargement des candidatures',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🆕 Récupérer toutes les candidatures d'un email
     */
    public function getUserApplications(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $applications = Volunteer::where('email', $request->email)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'count' => $applications->count(),
            'applications' => $applications,
            'can_apply' => $applications->count() < 5 // Max 5 candidatures actives
        ]);
    }

    /**
     * Store a newly created volunteer application (PUBLIC)
     */
    public function store(VolunteerRequest $request)
    {
        try {
            // 🔥 VÉRIFIER LE NOMBRE DE CANDIDATURES ACTIVES
            $activeApplicationsCount = Volunteer::where('email', $request->email)
                ->whereNull('deleted_at')
                ->count();
            
            // Limiter à 5 candidatures actives maximum
            if ($activeApplicationsCount >= 5) {
                return response()->json([
                    'message' => 'Vous avez atteint le nombre maximum de candidatures actives (5). Veuillez attendre qu\'une de vos candidatures soit traitée.',
                    'active_count' => $activeApplicationsCount
                ], 422);
            }

            // 🔥 VÉRIFIER SI UNE CANDIDATURE IDENTIQUE EXISTE DÉJÀ
            // (même email + même domaine d'intérêt + statut pending)
            $duplicateApplication = Volunteer::where('email', $request->email)
                ->where('interest_domain', $request->interest_domain)
                ->where('status', 'pending')
                ->whereNull('deleted_at')
                ->first();

            if ($duplicateApplication) {
                return response()->json([
                    'message' => 'Vous avez déjà une candidature en attente pour ce domaine.',
                    'application' => $duplicateApplication
                ], 422);
            }

            $data = $request->validated();

            // Upload du CV si fourni
            if ($request->hasFile('cv')) {
                $cvPath = $request->file('cv')->store('volunteers/cv', 'public');
                $data['cv_path'] = $cvPath;
            }

            $volunteer = Volunteer::create($data);

            // TODO: Envoyer un email de confirmation au bénévole
            // TODO: Envoyer une notification aux admins

            return response()->json([
                'message' => 'Votre candidature a été envoyée avec succès !',
                'data' => $volunteer
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'envoi de la candidature',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified volunteer
     */
    public function show($id)
    {
        try {
            $volunteer = Volunteer::findOrFail($id);
            return response()->json($volunteer);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Bénévole non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update volunteer (ADMIN ONLY)
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected,in_progress',
            'admin_notes' => 'nullable|string',
            'response_message' => 'nullable|string'
        ]);

        try {
            $volunteer = Volunteer::findOrFail($id);
            
            // Sauvegarder l'ancien statut pour détecter le changement
            $oldStatus = $volunteer->status;
            
            // Mettre à jour les données
            $volunteer->update([
                'status' => $request->status,
                'admin_notes' => $request->admin_notes,
                'response_message' => $request->response_message
            ]);

            // TODO: Envoyer un email au bénévole si le statut a changé
            // if ($oldStatus !== $request->status) {
            //     Mail::to($volunteer->email)->send(new VolunteerStatusChanged($volunteer));
            // }

            return response()->json([
                'message' => 'Candidature mise à jour avec succès',
                'data' => $volunteer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update volunteer status (ADMIN ONLY)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected,in_progress',
            'admin_notes' => 'nullable|string'
        ]);

        try {
            $volunteer = Volunteer::findOrFail($id);
            
            $volunteer->update([
                'status' => $request->status,
                'admin_notes' => $request->admin_notes
            ]);

            // TODO: Envoyer un email au bénévole pour l'informer du changement de statut

            return response()->json([
                'message' => 'Statut mis à jour avec succès',
                'data' => $volunteer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified volunteer
     */
    public function destroy($id)
    {
        try {
            $volunteer = Volunteer::findOrFail($id);

            // Supprimer le CV si il existe
            if ($volunteer->cv_path) {
                Storage::disk('public')->delete($volunteer->cv_path);
            }

            $volunteer->delete();

            return response()->json([
                'message' => 'Candidature supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get volunteer statistics (ADMIN)
     */
    public function stats()
    {
        try {
            $stats = [
                'total' => Volunteer::count(),
                'pending' => Volunteer::where('status', 'pending')->count(),
                'accepted' => Volunteer::where('status', 'accepted')->count(),
                'rejected' => Volunteer::where('status', 'rejected')->count(),
                'in_progress' => Volunteer::where('status', 'in_progress')->count(),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du chargement des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}