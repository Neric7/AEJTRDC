<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TeamMemberController extends Controller
{
    // ========================================
    // PUBLIC ENDPOINTS
    // ========================================
    
    public function index(Request $request)
    {
        $query = TeamMember::active()->ordered();

        if ($request->has('category')) {
            $query->category($request->category);
        }

        $members = $query->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'category' => $member->category,
                'position' => $member->position,
                'role' => $member->role,
                'email' => $member->email,
                'phone' => $member->phone,
                'bio' => $member->bio,
                'photo' => $member->photo_url,
                'social_links' => $member->social_links,
                'display_order' => $member->display_order,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $members
        ]);
    }

    public function show($id)
    {
        $member = TeamMember::active()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'category' => $member->category,
                'position' => $member->position,
                'role' => $member->role,
                'email' => $member->email,
                'phone' => $member->phone,
                'bio' => $member->bio,
                'photo' => $member->photo_url,
                'social_links' => $member->social_links,
            ]
        ]);
    }

    // ========================================
    // ADMIN ENDPOINTS
    // ========================================
    
    public function adminIndex(Request $request)
    {
        $query = TeamMember::query();

        // Filtre par catégorie
        if ($request->has('category') && $request->category !== 'all') {
            $query->category($request->category);
        }

        // Filtre par statut
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Recherche
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%");
            });
        }

        $members = $query->ordered()->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'category' => $member->category,
                'position' => $member->position,
                'role' => $member->role,
                'email' => $member->email,
                'phone' => $member->phone,
                'bio' => $member->bio,
                'photo' => $member->photo_url,
                'social_links' => $member->social_links,
                'display_order' => $member->display_order,
                'is_active' => $member->is_active,
                'created_at' => $member->created_at,
                'updated_at' => $member->updated_at,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $members,
            'total' => $members->count()
        ]);
    }

    public function adminShow($id)
    {
        $member = TeamMember::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'category' => $member->category,
                'position' => $member->position,
                'role' => $member->role,
                'email' => $member->email,
                'phone' => $member->phone,
                'bio' => $member->bio,
                'photo' => $member->photo_url,
                'social_links' => $member->social_links,
                'display_order' => $member->display_order,
                'is_active' => $member->is_active,
                'created_at' => $member->created_at,
                'updated_at' => $member->updated_at,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'category' => 'required|in:conseil_administration,coordination',
            'position' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'email' => 'required|email|unique:team_members,email',
            'phone' => 'nullable|string|max:50',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'social_links' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Parse social_links if it's a JSON string
        if (isset($data['social_links']) && is_string($data['social_links'])) {
            $data['social_links'] = json_decode($data['social_links'], true);
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team', 'public');
            $data['photo'] = $path;
        }

        // Set default display_order if not provided
        if (!isset($data['display_order'])) {
            $maxOrder = TeamMember::where('category', $data['category'])->max('display_order');
            $data['display_order'] = ($maxOrder ?? 0) + 1;
        }

        $member = TeamMember::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Membre ajouté avec succès',
            'data' => $member
        ], 201);
    }

    public function update(Request $request, $id)
{
    $member = TeamMember::findOrFail($id);

    // Préparer les données en retirant les champs vides pour utiliser 'sometimes'
    $requestData = $request->all();
    
    // Retirer les champs vides sauf ceux qui peuvent être vides
    $fieldsToKeep = ['role', 'phone', 'bio', 'social_links', 'display_order', 'is_active'];
    foreach ($requestData as $key => $value) {
        if (!in_array($key, $fieldsToKeep) && $value === '') {
            unset($requestData[$key]);
        }
    }

    $validator = Validator::make($requestData, [
        'full_name' => 'sometimes|required|string|max:255',
        'category' => 'sometimes|required|in:conseil_administration,coordination',
        'position' => 'sometimes|required|string|max:255',
        'role' => 'nullable|string|max:255',
        'email' => 'sometimes|required|email|unique:team_members,email,' . $id,
        'phone' => 'nullable|string|max:50',
        'bio' => 'nullable|string',
        'photo' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        'display_order' => 'nullable|integer',
        'is_active' => 'nullable|boolean',
        'social_links' => 'nullable|json',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    // Parse social_links if it's a JSON string
    if (isset($data['social_links']) && is_string($data['social_links'])) {
        $socialLinks = json_decode($data['social_links'], true);
        $data['social_links'] = $socialLinks ?: [];
    }

    // Handle photo upload
    if ($request->hasFile('photo')) {
        // Delete old photo
        if ($member->photo) {
            Storage::disk('public')->delete($member->photo);
        }
        $path = $request->file('photo')->store('team', 'public');
        $data['photo'] = $path;
    }

    $member->update($data);

    return response()->json([
        'success' => true,
        'message' => 'Membre mis à jour avec succès',
        'data' => [
            'id' => $member->id,
            'full_name' => $member->full_name,
            'category' => $member->category,
            'position' => $member->position,
            'role' => $member->role,
            'email' => $member->email,
            'phone' => $member->phone,
            'bio' => $member->bio,
            'photo' => $member->photo_url,
            'social_links' => $member->social_links,
            'display_order' => $member->display_order,
            'is_active' => $member->is_active,
        ]
    ]);
}

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        
        // Delete photo
        if ($member->photo) {
            Storage::disk('public')->delete($member->photo);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membre supprimé avec succès'
        ]);
    }

    public function toggleStatus($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->is_active = !$member->is_active;
        $member->save();

        return response()->json([
            'success' => true,
            'message' => 'Statut mis à jour avec succès',
            'data' => [
                'id' => $member->id,
                'is_active' => $member->is_active
            ]
        ]);
    }

    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'members' => 'required|array',
            'members.*.id' => 'required|exists:team_members,id',
            'members.*.display_order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->members as $memberData) {
            TeamMember::where('id', $memberData['id'])
                ->update(['display_order' => $memberData['display_order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Ordre mis à jour avec succès'
        ]);
    }

    public function uploadPhoto(Request $request, $id)
    {
        $member = TeamMember::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'photo' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        // Delete old photo
        if ($member->photo) {
            Storage::disk('public')->delete($member->photo);
        }

        // Upload new photo
        $path = $request->file('photo')->store('team', 'public');
        $member->photo = $path;
        $member->save();

        return response()->json([
            'success' => true,
            'message' => 'Photo mise à jour avec succès',
            'data' => [
                'photo' => $member->photo_url
            ]
        ]);
    }

    public function deletePhoto($id)
    {
        $member = TeamMember::findOrFail($id);

        if ($member->photo) {
            Storage::disk('public')->delete($member->photo);
            $member->photo = null;
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Photo supprimée avec succès'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Aucune photo à supprimer'
        ], 404);
    }

    public function statistics()
    {
        $totalMembers = TeamMember::count();
        $activeMembers = TeamMember::where('is_active', true)->count();
        $conseilMembers = TeamMember::where('category', 'conseil_administration')->count();
        $coordinationMembers = TeamMember::where('category', 'coordination')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $totalMembers,
                'active' => $activeMembers,
                'inactive' => $totalMembers - $activeMembers,
                'conseil_administration' => $conseilMembers,
                'coordination' => $coordinationMembers,
                'by_category' => [
                    [
                        'category' => 'Conseil d\'Administration',
                        'count' => $conseilMembers,
                        'active' => TeamMember::where('category', 'conseil_administration')
                            ->where('is_active', true)->count()
                    ],
                    [
                        'category' => 'Coordination',
                        'count' => $coordinationMembers,
                        'active' => TeamMember::where('category', 'coordination')
                            ->where('is_active', true)->count()
                    ]
                ]
            ]
        ]);
    }
}