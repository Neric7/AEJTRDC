<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminAuthController;
use App\Http\Controllers\API\AdminNewsController;

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

// Commentaires - Routes publiques
Route::get('/news/{newsId}/comments', [CommentController::class, 'index']);
Route::post('/news/{newsId}/comments', [CommentController::class, 'store']);

// Routes protégées utilisateurs
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);
    
    // Commentaires - Actions authentifiées
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| API Routes - Admin
|--------------------------------------------------------------------------
*/

// Authentification admin
Route::prefix('admin')->group(function () {
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
        
        // Dashboard stats (à implémenter plus tard)
        Route::get('/dashboard/stats', function () {
            return response()->json([
                'projects' => 12,
                'news' => \App\Models\News::count(),
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

        // Ajoutez ces routes temporaires dans routes/web.php pour tester

Route::get('/test-storage', function () {
    $results = [
        'storage_link_exists' => is_link(public_path('storage')),
        'storage_path' => storage_path('app/public'),
        'public_path' => public_path('storage'),
        'app_url' => config('app.url'),
        'test_file_exists' => file_exists(storage_path('app/public/news')),
    ];
    
    // Créer un fichier de test
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

// Route pour servir le fichier directement
Route::get('/serve-test', function () {
    $path = storage_path('app/public/news/test.txt');
    
    if (!file_exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }
    
    return response()->file($path);
});

// Route pour lister les fichiers
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