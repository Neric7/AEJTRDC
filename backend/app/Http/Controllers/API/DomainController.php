<?php
// backend/app/Http/Controllers/API/DomainController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DomainController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | ROUTES PUBLIQUES (Frontend)
    |--------------------------------------------------------------------------
    */

    /**
     * Récupérer tous les domaines actifs (Frontend)
     */
    public function index()
    {
        $domains = Domain::actif()
            ->ordered()
            ->get()
            ->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name' => $domain->titre,  // ✅ Alias pour compatibilité frontend
                    'titre' => $domain->titre,
                    'slug' => $domain->slug,
                    'image' => $domain->image_url,
                    'description_courte' => $domain->description_courte,
                    'description' => $domain->description_courte,  // ✅ Alias
                    'icon' => $domain->icon,
                    'ordre' => $domain->ordre,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $domains
        ]);
    }

    /**
     * Récupérer un domaine spécifique par ID (Frontend)
     */
    public function show($id)
    {
        $domain = Domain::actif()->find($id);

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $domain->id,
                'name' => $domain->titre,  // ✅ Alias
                'titre' => $domain->titre,
                'slug' => $domain->slug,
                'image' => $domain->image_url,
                'description_courte' => $domain->description_courte,
                'description' => $domain->description_courte,  // ✅ Alias
                'contenu' => $domain->contenu,
                'icon' => $domain->icon,
            ]
        ]);
    }

    /**
     * Récupérer un domaine par son slug (Frontend)
     */
    public function showBySlug($slug)
    {
        $domain = Domain::actif()->where('slug', $slug)->first();

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $domain->id,
                'name' => $domain->titre,  // ✅ Alias
                'titre' => $domain->titre,
                'slug' => $domain->slug,
                'image' => $domain->image_url,
                'description_courte' => $domain->description_courte,
                'description' => $domain->description_courte,  // ✅ Alias
                'contenu' => $domain->contenu,
                'icon' => $domain->icon,
            ]
        ]);
    }

    /**
     * Récupérer les autres domaines (Frontend)
     */
    public function others($id)
    {
        $domains = Domain::actif()
            ->where('id', '!=', $id)
            ->ordered()
            ->get()
            ->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name' => $domain->titre,  // ✅ Alias
                    'titre' => $domain->titre,
                    'slug' => $domain->slug,
                    'icon' => $domain->icon,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $domains
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ROUTES ADMIN (BackOffice)
    |--------------------------------------------------------------------------
    */

    /**
     * 🔐 ADMIN - Récupérer tous les domaines (actifs ET inactifs)
     */
    public function adminIndex()
    {
        $domains = Domain::orderBy('ordre', 'asc')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name' => $domain->titre,  // ✅ Alias
                    'titre' => $domain->titre,
                    'slug' => $domain->slug,
                    'image' => $domain->image_url,
                    'description_courte' => $domain->description_courte,
                    'description' => $domain->description_courte,  // ✅ Alias
                    'contenu' => $domain->contenu,
                    'icon' => $domain->icon,
                    'ordre' => $domain->ordre,
                    'actif' => $domain->actif,
                    'created_at' => $domain->created_at,
                    'updated_at' => $domain->updated_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $domains
        ]);
    }

    /**
     * 🔐 ADMIN - Récupérer un domaine par ID
     */
    public function adminShow($id)
    {
        $domain = Domain::find($id);

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $domain->id,
                'name' => $domain->titre,  // ✅ Alias
                'titre' => $domain->titre,
                'slug' => $domain->slug,
                'image' => $domain->image_url,
                'description_courte' => $domain->description_courte,
                'description' => $domain->description_courte,  // ✅ Alias
                'contenu' => $domain->contenu,
                'icon' => $domain->icon,
                'ordre' => $domain->ordre,
                'actif' => $domain->actif,
            ]
        ]);
    }

    /**
     * 🔐 ADMIN - Créer un nouveau domaine
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:domains,slug',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'description_courte' => 'required|string',
            'contenu' => 'required|array',
            'contenu.*' => 'string',
            'icon' => 'nullable|string',
            'ordre' => 'nullable|integer',
            'actif' => 'nullable',
        ]);

        // Générer le slug automatiquement si absent
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['titre']);
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('domains', 'public');
            $validated['image'] = $imagePath;
        }

        // Convertir actif en boolean
        $validated['actif'] = filter_var($request->input('actif', true), FILTER_VALIDATE_BOOLEAN);

        $domain = Domain::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Domaine créé avec succès',
            'data' => [
                'id' => $domain->id,
                'name' => $domain->titre,  // ✅ Alias
                'titre' => $domain->titre,
                'slug' => $domain->slug,
                'icon' => $domain->icon,
            ]
        ], 201);
    }

    /**
     * 🔐 ADMIN - Mettre à jour un domaine
     */
    public function update(Request $request, $id)
    {
        $domain = Domain::find($id);

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:domains,slug,' . $id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'description_courte' => 'sometimes|string',
            'contenu' => 'sometimes|array',
            'contenu.*' => 'string',
            'icon' => 'nullable|string',
            'ordre' => 'nullable|integer',
            'actif' => 'nullable',
        ]);

        // Gérer l'upload de la nouvelle image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            if ($domain->image) {
                Storage::disk('public')->delete($domain->image);
            }
            
            $imagePath = $request->file('image')->store('domains', 'public');
            $validated['image'] = $imagePath;
        }

        // Convertir actif en boolean si présent
        if ($request->has('actif')) {
            $validated['actif'] = filter_var($request->input('actif'), FILTER_VALIDATE_BOOLEAN);
        }

        $domain->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Domaine mis à jour avec succès',
            'data' => [
                'id' => $domain->id,
                'name' => $domain->titre,  // ✅ Alias
                'titre' => $domain->titre,
                'slug' => $domain->slug,
                'icon' => $domain->icon,
            ]
        ]);
    }

    /**
     * 🔐 ADMIN - Supprimer un domaine
     */
    public function destroy($id)
    {
        $domain = Domain::find($id);

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        // Supprimer l'image
        if ($domain->image) {
            Storage::disk('public')->delete($domain->image);
        }

        $domain->delete();

        return response()->json([
            'success' => true,
            'message' => 'Domaine supprimé avec succès'
        ]);
    }

    /**
     * 🔐 ADMIN - Toggle le statut actif/inactif
     */
    public function toggleStatus($id)
    {
        $domain = Domain::find($id);

        if (!$domain) {
            return response()->json([
                'success' => false,
                'message' => 'Domaine non trouvé'
            ], 404);
        }

        $domain->actif = !$domain->actif;
        $domain->save();

        return response()->json([
            'success' => true,
            'message' => 'Statut mis à jour avec succès',
            'data' => [
                'actif' => $domain->actif
            ]
        ]);
    }
}