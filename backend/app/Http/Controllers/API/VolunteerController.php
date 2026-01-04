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
     * Store a newly created volunteer application (PUBLIC)
     */
    public function store(VolunteerRequest $request)
    {
        try {
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