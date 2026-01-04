<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VolunteerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Tout le monde peut soumettre une candidature
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:volunteers,email',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'interest_domain' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'availability' => 'required|in:full_time,part_time,weekends,flexible',
            'message' => 'required|string|min:50',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'Le prénom est obligatoire.',
            'last_name.required' => 'Le nom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'email.unique' => 'Cet email est déjà enregistré.',
            'phone.required' => 'Le téléphone est obligatoire.',
            'availability.required' => 'La disponibilité est obligatoire.',
            'availability.in' => 'Disponibilité invalide.',
            'message.required' => 'Le message de motivation est obligatoire.',
            'message.min' => 'Le message doit contenir au moins 50 caractères.',
            'cv.mimes' => 'Le CV doit être au format PDF, DOC ou DOCX.',
            'cv.max' => 'Le CV ne doit pas dépasser 5MB.',
        ];
    }
}