<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageController extends Controller
{
    public function serve($path)
    {
        // Nettoyer le chemin pour éviter les attaques
        $path = str_replace(['..', '\\'], ['', '/'], $path);
        
        // Chemin complet du fichier
        $fullPath = storage_path('app/public/' . $path);
        
        // Vérifier que le fichier existe
        if (!file_exists($fullPath) || !is_file($fullPath)) {
            abort(404, 'Fichier introuvable');
        }
        
        // Retourner le fichier avec les bons headers
        return response()->file($fullPath);
    }
}