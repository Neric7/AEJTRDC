<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StorageController extends Controller
{
    /**
     * Servir un fichier depuis le storage public
     */
    public function serve($path)
    {
        // Nettoyer le chemin
        $path = str_replace('..', '', $path);
        
        // Chemin complet
        $fullPath = storage_path('app/public/' . $path);
        
        // Vérifier que le fichier existe
        if (!file_exists($fullPath)) {
            abort(404, 'Fichier introuvable');
        }
        
        // Vérifier que c'est un fichier et non un dossier
        if (!is_file($fullPath)) {
            abort(403, 'Accès refusé');
        }
        
        // Déterminer le type MIME
        $mimeType = mime_content_type($fullPath);
        
        // Retourner le fichier avec les bons headers
        return response()->file($fullPath, [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }
}