<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PartnerController extends Controller
{
    /**
     * Liste tous les partenaires avec pagination
     */
    public function index(Request $request)
    {
        try {
            $pageSize = (int) $request->input('pageSize', 10);
            $limit = (int) $request->input('limit', 0);
            $type = $request->input('type');
            $search = $request->input('search');
            $featured = $request->input('featured');
            $status = $request->input('status', 'active');

            // Si un paramètre limit est fourni, on l'utilise comme taille de page
            if ($limit > 0) {
                $pageSize = $limit;
            }

            $query = Partner::query();

            // Filtrer par statut
            if ($status) {
                $query->where('status', $status);
            }

            // Filtrer par type
            if ($type) {
                $query->where('type', $type);
            }

            // Filtrer par recherche
            if ($search) {
                $query->search($search);
            }

            // Filtrer les partenaires mis en avant
            if (!is_null($featured)) {
                $query->where('featured', filter_var($featured, FILTER_VALIDATE_BOOLEAN));
            }

            $partners = $query->ordered()->paginate($pageSize);

            return response()->json($partners);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des partenaires',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir un partenaire par ID ou slug
     */
    public function show($identifier)
    {
        try {
            $partner = ctype_digit((string) $identifier)
                ? Partner::where('id', $identifier)->first()
                : Partner::where('slug', $identifier)->first();

            if (!$partner) {
                return response()->json([
                    'message' => 'Partenaire introuvable.'
                ], 404);
            }

            return response()->json($partner);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@show: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement du partenaire',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Créer un nouveau partenaire
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'website' => 'nullable|url',
                'email' => 'nullable|email',
                'phone' => 'nullable|string',
                'address' => 'nullable|string',
                'type' => 'required|in:national,international,local,gouvernemental,prive,ong',
                'status' => 'required|in:active,inactive,pending',
                'featured' => 'boolean',
                'order' => 'integer',
                'social_links' => 'nullable|array',
                'partnership_start' => 'nullable|date',
                'partnership_end' => 'nullable|date',
                'partnership_details' => 'nullable|string',
            ]);

            // Générer le slug
            $validated['slug'] = Str::slug($validated['name']);

            // Vérifier l'unicité du slug
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Partner::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count;
                $count++;
            }

            $partner = Partner::create($validated);

            return response()->json([
                'message' => 'Partenaire créé avec succès',
                'data' => $partner
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@store: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création du partenaire',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Mettre à jour un partenaire
     */
    public function update(Request $request, $id)
    {
        try {
            $partner = Partner::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'website' => 'nullable|url',
                'email' => 'nullable|email',
                'phone' => 'nullable|string',
                'address' => 'nullable|string',
                'type' => 'sometimes|required|in:national,international,local,gouvernemental,prive,ong',
                'status' => 'sometimes|required|in:active,inactive,pending',
                'featured' => 'boolean',
                'order' => 'integer',
                'social_links' => 'nullable|array',
                'partnership_start' => 'nullable|date',
                'partnership_end' => 'nullable|date',
                'partnership_details' => 'nullable|string',
            ]);

            // Mettre à jour le slug si le nom change
            if (isset($validated['name']) && $validated['name'] !== $partner->name) {
                $validated['slug'] = Str::slug($validated['name']);
                
                // Vérifier l'unicité du slug
                $originalSlug = $validated['slug'];
                $count = 1;
                while (Partner::where('slug', $validated['slug'])
                                ->where('id', '!=', $id)
                                ->exists()) {
                    $validated['slug'] = $originalSlug . '-' . $count;
                    $count++;
                }
            }

            $partner->update($validated);

            return response()->json([
                'message' => 'Partenaire mis à jour avec succès',
                'data' => $partner->fresh()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@update: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du partenaire',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Supprimer un partenaire
     */
    public function destroy($id)
    {
        try {
            $partner = Partner::findOrFail($id);

            // Supprimer le logo si existe
            if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
                Storage::disk('public')->delete($partner->logo);
            }

            $partner->delete();

            return response()->json([
                'message' => 'Partenaire supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@destroy: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression du partenaire',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Upload du logo
     */
    public function uploadLogo(Request $request, $id)
    {
        try {
            $partner = Partner::findOrFail($id);

            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
            ]);

            // Supprimer l'ancien logo si existe
            if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
                Storage::disk('public')->delete($partner->logo);
            }

            // Uploader le nouveau logo
            $path = $request->file('logo')->store('partners', 'public');
            $partner->update(['logo' => $path]);

            return response()->json([
                'message' => 'Logo uploadé avec succès',
                'logo_url' => $partner->logo_url
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@uploadLogo: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de l\'upload du logo',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtenir les types de partenaires disponibles
     */
    public function types()
    {
        try {
            $types = [
                'national' => 'National',
                'international' => 'International',
                'local' => 'Local',
                'gouvernemental' => 'Gouvernemental',
                'prive' => 'Privé',
                'ong' => 'ONG'
            ];

            return response()->json(['types' => $types]);
        } catch (\Exception $e) {
            \Log::error('Error in PartnerController@types: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors du chargement des types',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}