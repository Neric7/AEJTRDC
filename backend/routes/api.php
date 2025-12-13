<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminAuthController;
use App\Http\Controllers\API\AdminNewsController;
use App\Http\Controllers\API\DomainController;
use App\Http\Controllers\API\PartnerController;

/*
|--------------------------------------------------------------------------
| API Routes - Frontend Public
|--------------------------------------------------------------------------
*/

// Authentification utilisateurs
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// News - Routes publiques
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/tag/{tag}', [NewsController::class, 'getByTag']);
Route::get('/news/categories', [NewsController::class, 'categories']);
Route::get('/news/tags', [NewsController::class, 'tags']);
Route::get('/news/{id}', [NewsController::class, 'show']);

// Commentaires - Lecture publique UNIQUEMENT
Route::get('/news/{newsId}/comments', [CommentController::class, 'index']);

// Routes protégées utilisateurs
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);
    
    // 🔒 Commentaires - PROTÉGÉS
    Route::post('/news/{newsId}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});

// Routes publiques pour les domaines
Route::prefix('domains')->group(function () {
    Route::get('/', [DomainController::class, 'index']);
    Route::get('/{id}', [DomainController::class, 'show']);
    Route::get('/slug/{slug}', [DomainController::class, 'showBySlug']);
    Route::get('/{id}/others', [DomainController::class, 'others']);
});

// 🌍 Routes publiques pour les partenaires (FRONTEND)
Route::prefix('partners')->group(function () {
    Route::get('/', [PartnerController::class, 'index']);
    Route::get('/types', [PartnerController::class, 'types']);
    Route::get('/{identifier}', [PartnerController::class, 'show']);
});

/*
|--------------------------------------------------------------------------
| API Routes - Admin
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    // Authentification admin
    Route::post('/login', [AdminAuthController::class, 'login']);
    
    // Routes protégées admin
    Route::middleware(['auth:sanctum', 'check.admin'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/user', [AdminAuthController::class, 'user']);
        
        // Gestion des actualités
        Route::get('/news', [AdminNewsController::class, 'index']);
        Route::get('/news/{id}', [AdminNewsController::class, 'show']);
        Route::post('/news', [AdminNewsController::class, 'store']);
        Route::put('/news/{id}', [AdminNewsController::class, 'update']);
        Route::delete('/news/{id}', [AdminNewsController::class, 'destroy']);
        Route::post('/news/{id}/publish', [AdminNewsController::class, 'publish']);
        Route::post('/news/{id}/unpublish', [AdminNewsController::class, 'unpublish']);
        Route::post('/news/{id}/image', [AdminNewsController::class, 'uploadImage']);
        
        // Gestion des commentaires (admin peut modérer)
        Route::get('/comments', [CommentController::class, 'indexAll']);
        Route::put('/comments/{id}/approve', [CommentController::class, 'approve']);
        Route::put('/comments/{id}/reject', [CommentController::class, 'reject']);
        
        // 🎯 DOMAINES D'INTERVENTION
        Route::get('/domains', [DomainController::class, 'adminIndex']);
        Route::get('/domains/{id}', [DomainController::class, 'adminShow']);
        Route::post('/domains', [DomainController::class, 'store']);
        Route::post('/domains/{id}', [DomainController::class, 'update']);
        Route::delete('/domains/{id}', [DomainController::class, 'destroy']);
        Route::post('/domains/{id}/toggle-status', [DomainController::class, 'toggleStatus']);
        
        // 🎯 PARTENAIRES
        Route::get('/partners', [PartnerController::class, 'index']);
        Route::get('/partners/{id}', [PartnerController::class, 'show']);
        Route::post('/partners', [PartnerController::class, 'store']);
        Route::put('/partners/{id}', [PartnerController::class, 'update']);
        Route::delete('/partners/{id}', [PartnerController::class, 'destroy']);
        Route::post('/partners/{id}/upload-logo', [PartnerController::class, 'uploadLogo']);
        
        // Dashboard stats
        Route::get('/dashboard/stats', function () {
            return response()->json([
                'projects' => 12,
                'news' => \App\Models\News::count(),
                'domains' => \App\Models\Domain::count(),
                'volunteers' => 87,
                'donations' => 15420,
                'activeAlerts' => 2,
            ]);
        });
        
        Route::get('/dashboard/activities', function () {
            return response()->json([
                ['description' => 'Nouvelle actualité publiée', 'time' => 'Il y a 2 heures'],
                ['description' => 'Projet mis à jour', 'time' => 'Il y a 5 heures'],
                ['description' => 'Nouveau don reçu: 500€', 'time' => 'Il y a 1 jour'],
                ['description' => 'Nouveau bénévole inscrit', 'time' => 'Il y a 2 jours'],
            ]);
        });
    });
});

/*
|--------------------------------------------------------------------------
| Routes de test (à supprimer en production)
|--------------------------------------------------------------------------
*/
Route::get('/test-storage', function () {
    $results = [
        'storage_link_exists' => is_link(public_path('storage')),
        'storage_path' => storage_path('app/public'),
        'public_path' => public_path('storage'),
        'app_url' => config('app.url'),
        'test_file_exists' => file_exists(storage_path('app/public/news')),
    ];
    
    if (!file_exists(storage_path('app/public/news'))) {
        mkdir(storage_path('app/public/news'), 0755, true);
    }
    
    file_put_contents(
        storage_path('app/public/news/test.txt'),
        'Test file created at ' . now()
    );
    
    $results['test_file_created'] = file_exists(storage_path('app/public/news/test.txt'));
    $results['test_url'] = url('storage/news/test.txt');
    
    return response()->json($results);
});

Route::get('/serve-test', function () {
    $path = storage_path('app/public/news/test.txt');
    
    if (!file_exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }
    
    return response()->file($path);
});

Route::get('/list-storage', function () {
    $files = [];
    $path = storage_path('app/public/news');
    
    if (is_dir($path)) {
        $files = array_diff(scandir($path), ['.', '..']);
    }
    
    return response()->json([
        'path' => $path,
        'exists' => is_dir($path),
        'files' => array_values($files),
        'public_link' => public_path('storage/news'),
        'public_link_exists' => is_dir(public_path('storage/news')),
    ]);
});