<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminAuthController;
use App\Http\Controllers\API\AdminNewsController;
use App\Http\Controllers\API\AdminProjectController;
use App\Http\Controllers\API\DomainController;
use App\Http\Controllers\API\PartnerController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\VolunteerController;
use App\Http\Controllers\API\AdminJobController;
use App\Http\Controllers\API\JobController;

/*
|--------------------------------------------------------------------------
| API Routes - Frontend Public
|--------------------------------------------------------------------------
*/

// Authentification utilisateurs
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// News - Routes PROTÉGÉES (nécessite connexion)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/tag/{tag}', [NewsController::class, 'getByTag']);
    Route::get('/news/categories', [NewsController::class, 'categories']);
    Route::get('/news/tags', [NewsController::class, 'tags']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
});

// 🎯 PROJECTS - Routes PROTÉGÉES (nécessite connexion)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/projects/statuses', [ProjectController::class, 'statuses']);
    Route::get('/projects/domain/{domainId}', [ProjectController::class, 'getByDomain']);
    Route::get('/projects/{identifier}', [ProjectController::class, 'show']);
});

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

// 🙋 Route publique pour soumettre une candidature bénévole (FRONTEND)
Route::post('/volunteers', [VolunteerController::class, 'store']);

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
        
        // ========== GESTION DES ACTUALITÉS ==========
        Route::get('/news', [AdminNewsController::class, 'index']);
        Route::get('/news/{id}', [AdminNewsController::class, 'show']);
        Route::post('/news', [AdminNewsController::class, 'store']);
        Route::put('/news/{id}', [AdminNewsController::class, 'update']);
        Route::delete('/news/{id}', [AdminNewsController::class, 'destroy']);
        Route::post('/news/{id}/publish', [AdminNewsController::class, 'publish']);
        Route::post('/news/{id}/unpublish', [AdminNewsController::class, 'unpublish']);
        Route::post('/news/{id}/image', [AdminNewsController::class, 'uploadImage']);
        
        // ========== GESTION DES PROJETS (Admin) ==========
        Route::get('/projects', [AdminProjectController::class, 'index']);
        Route::get('/projects/statistics', [AdminProjectController::class, 'statistics']);
        Route::get('/projects/{id}', [AdminProjectController::class, 'show']);
        Route::post('/projects', [AdminProjectController::class, 'store']);
        Route::put('/projects/{id}', [AdminProjectController::class, 'update']);
        Route::delete('/projects/{id}', [AdminProjectController::class, 'destroy']);
        Route::post('/projects/{id}/publish', [AdminProjectController::class, 'publish']);
        Route::post('/projects/{id}/unpublish', [AdminProjectController::class, 'unpublish']);
        Route::post('/projects/{id}/toggle-featured', [AdminProjectController::class, 'toggleFeatured']);
        Route::post('/projects/{id}/image', [AdminProjectController::class, 'uploadImage']);
        Route::post('/projects/{id}/images', [AdminProjectController::class, 'uploadImages']);
        
        // ========== GESTION DES COMMENTAIRES ==========
        Route::get('/comments', [CommentController::class, 'indexAll']);
        Route::put('/comments/{id}/approve', [CommentController::class, 'approve']);
        Route::put('/comments/{id}/reject', [CommentController::class, 'reject']);
        
        // ========== DOMAINES D'INTERVENTION ==========
        Route::get('/domains', [DomainController::class, 'adminIndex']);
        Route::get('/domains/{id}', [DomainController::class, 'adminShow']);
        Route::post('/domains', [DomainController::class, 'store']);
        Route::post('/domains/{id}', [DomainController::class, 'update']);
        Route::delete('/domains/{id}', [DomainController::class, 'destroy']);
        Route::post('/domains/{id}/toggle-status', [DomainController::class, 'toggleStatus']);
        
        // ========== PARTENAIRES ==========
        Route::get('/partners', [PartnerController::class, 'index']);
        Route::get('/partners/{id}', [PartnerController::class, 'show']);
        Route::post('/partners', [PartnerController::class, 'store']);
        Route::put('/partners/{id}', [PartnerController::class, 'update']);
        Route::delete('/partners/{id}', [PartnerController::class, 'destroy']);
        Route::post('/partners/{id}/upload-logo', [PartnerController::class, 'uploadLogo']);
        
        // ========== BÉNÉVOLES ==========
        Route::get('/volunteers', [VolunteerController::class, 'index']);
        Route::get('/volunteers/stats', [VolunteerController::class, 'stats']);
        Route::get('/volunteers/{id}', [VolunteerController::class, 'show']);
        Route::put('/volunteers/{id}/status', [VolunteerController::class, 'updateStatus']);
        Route::delete('/volunteers/{id}', [VolunteerController::class, 'destroy']);
        
        // ========== DASHBOARD STATS ==========
        Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
        Route::get('/dashboard/activities', [DashboardController::class, 'getRecentActivities']);
    });
});

/*
|--------------------------------------------------------------------------
| JOBS - Routes PUBLIQUES (Frontend)
|--------------------------------------------------------------------------
*/

// Routes publiques pour consulter les offres d'emploi
Route::prefix('jobs')->group(function () {
    Route::get('/', [JobController::class, 'index']);
    Route::get('/featured', [JobController::class, 'featured']);
    Route::get('/types', [JobController::class, 'types']);
    Route::get('/open', [JobController::class, 'open']); // Offres ouvertes aux candidatures
    Route::get('/{identifier}', [JobController::class, 'show']); // Par ID ou slug
});

/*
|--------------------------------------------------------------------------
| JOBS - Routes ADMIN (BackOffice)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth:sanctum', 'check.admin'])->group(function () {
    
    // ========== GESTION DES OFFRES D'EMPLOI ==========
    Route::get('/jobs', [AdminJobController::class, 'index']);
    Route::get('/jobs/statistics', [AdminJobController::class, 'statistics']);
    Route::get('/jobs/{id}', [AdminJobController::class, 'show']);
    Route::post('/jobs', [AdminJobController::class, 'store']);
    Route::put('/jobs/{id}', [AdminJobController::class, 'update']);
    Route::delete('/jobs/{id}', [AdminJobController::class, 'destroy']);
    Route::post('/jobs/{id}/publish', [AdminJobController::class, 'publish']);
    Route::post('/jobs/{id}/close', [AdminJobController::class, 'close']);
    
});