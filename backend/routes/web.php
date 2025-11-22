<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route pour servir les fichiers du storage
Route::get('/storage/{path}', function ($path) {
    // Nettoyer le chemin pour éviter les attaques
    $path = str_replace(['..', '\\'], ['', '/'], $path);
    
    // Chemin complet
    $fullPath = storage_path('app/public/' . $path);
    
    // Vérifier l'existence
    if (!file_exists($fullPath) || !is_file($fullPath)) {
        abort(404, 'Fichier introuvable');
    }
    
    // Retourner le fichier avec cache
    return response()->file($fullPath, [
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*')->name('storage.serve');

// Route de test (optionnelle - peut être supprimée après test)
Route::get('/test-file', function () {
    $path = storage_path('app/public/news/test.txt');
    
    return response()->json([
        'path' => $path,
        'exists' => file_exists($path),
        'readable' => is_readable($path),
        'content' => file_exists($path) ? file_get_contents($path) : null,
    ]);
});

Route::get('/test-image-upload', function() {
    // Créer le dossier news
    if (!Storage::disk('public')->exists('news')) {
        Storage::disk('public')->makeDirectory('news');
    }
    
    // Créer un fichier test
    $testContent = 'Test image ' . now();
    Storage::disk('public')->put('news/test.txt', $testContent);
    
    return response()->json([
        'storage_path' => storage_path('app/public/news'),
        'public_path' => public_path('storage/news'),
        'file_exists' => Storage::disk('public')->exists('news/test.txt'),
        'url' => url('storage/news/test.txt'),
        'test_access' => '<a href="' . url('storage/news/test.txt') . '">Cliquer pour tester</a>'
    ]);
});