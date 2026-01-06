<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VolunteerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Accessible à tous
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            
            // ✅ EMAIL : Permet les doublons, mais on vérifie dans le contrôleur
            'email' => 'required|email|max:255',
            
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            
            'interest_domain' => 'nullable|string|max:100',
            'skills' => 'nullable|string|max:1000',
            'availability' => 'required|in:full_time,part_time,weekends,flexible',
            
            'message' => 'required|string|min:50|max:2000',
            
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ];
    }

    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'Le prénom est obligatoire.',
            'last_name.required' => 'Le nom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'phone.required' => 'Le téléphone est obligatoire.',
            'availability.required' => 'La disponibilité est obligatoire.',
            'availability.in' => 'La disponibilité sélectionnée n\'est pas valide.',
            'message.required' => 'Le message de motivation est obligatoire.',
            'message.min' => 'Le message doit contenir au moins 50 caractères.',
            'message.max' => 'Le message ne doit pas dépasser 2000 caractères.',
            'cv.mimes' => 'Le CV doit être au format PDF, DOC ou DOCX.',
            'cv.max' => 'Le CV ne doit pas dépasser 5MB.',
        ];
    }
}