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
use App\Http\Controllers\API\TeamMemberController;
use App\Http\Controllers\API\EthicalCommitmentsController;
use App\Http\Controllers\API\InterventionZoneController;
use App\Http\Controllers\API\HumanitarianController;

/*
|--------------------------------------------------------------------------
| API Routes - Frontend PUBLIC (NON PROTÉGÉES)
|--------------------------------------------------------------------------
*/

// Authentification utilisateurs (PUBLIC)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Domaines - Routes PUBLIQUES
Route::prefix('domains')->group(function () {
    Route::get('/', [DomainController::class, 'index']);
    Route::get('/{id}', [DomainController::class, 'show']);
    Route::get('/slug/{slug}', [DomainController::class, 'showBySlug']);
    Route::get('/{id}/others', [DomainController::class, 'others']);
});

// Partenaires - Routes PUBLIQUES
Route::prefix('partners')->group(function () {
    Route::get('/', [PartnerController::class, 'index']);
    Route::get('/types', [PartnerController::class, 'types']);
    Route::get('/{identifier}', [PartnerController::class, 'show']);
});

// Commentaires - Lecture publique UNIQUEMENT
Route::get('/news/{newsId}/comments', [CommentController::class, 'index']);

// Équipe - Routes PUBLIQUES
Route::prefix('team')->group(function () {
    Route::get('/', [TeamMemberController::class, 'index']);
    Route::get('/{id}', [TeamMemberController::class, 'show']);
});

// ========== ✅ ZONES D'INTERVENTION (PUBLIC) ==========
Route::prefix('intervention-zones')->group(function () {
    Route::get('/', [InterventionZoneController::class, 'index']);
    Route::get('/{id}', [InterventionZoneController::class, 'show']);
});

/*
|--------------------------------------------------------------------------
| API Routes - Frontend PROTÉGÉES (CONNEXION OBLIGATOIRE) 🔒
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // ========== AUTHENTIFICATION ==========
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::post('/user/avatar', [AuthController::class, 'uploadAvatar']);
    Route::delete('/user/avatar', [AuthController::class, 'deleteAvatar']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);
    
    // ========== NEWS (PROTÉGÉES) 🔒 ==========
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/tag/{tag}', [NewsController::class, 'getByTag']);
    Route::get('/news/categories', [NewsController::class, 'categories']);
    Route::get('/news/tags', [NewsController::class, 'tags']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
    
    // ========== COMMENTAIRES (PROTÉGÉS) 🔒 ==========
    Route::post('/news/{newsId}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
    
    // ========== PROJETS (PROTÉGÉS) 🔒 ==========
    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::get('/featured', [ProjectController::class, 'featured']);
        Route::get('/statuses', [ProjectController::class, 'statuses']);
        Route::get('/domain/{domainId}', [ProjectController::class, 'getByDomain']);
        Route::get('/{identifier}', [ProjectController::class, 'show']);
    });
    
    // ========== OFFRES D'EMPLOI (PROTÉGÉES) 🔒 ==========
    Route::prefix('jobs')->group(function () {
        Route::get('/', [JobController::class, 'index']);
        Route::get('/featured', [JobController::class, 'featured']);
        Route::get('/types', [JobController::class, 'types']);
        Route::get('/open', [JobController::class, 'open']);
        Route::get('/{identifier}', [JobController::class, 'show']);
    });
    
    // ========== CANDIDATURE BÉNÉVOLE (UTILISATEUR) 🔒 ==========
    Route::prefix('user/volunteers')->group(function () {
        Route::post('/', [VolunteerController::class, 'store']);
        Route::get('/my-applications', [VolunteerController::class, 'myApplications']);
        Route::delete('/{id}', [VolunteerController::class, 'destroy']);
    });
});

/*
|--------------------------------------------------------------------------
| API Routes - Admin BackOffice 👨‍💼
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    
    // ========== AUTHENTIFICATION ADMIN ==========
    Route::post('/login', [AdminAuthController::class, 'login']);
    
    // ========== ROUTES PROTÉGÉES ADMIN 🔒 ==========
    Route::middleware(['auth:sanctum', 'check.admin'])->group(function () {
        
        // Profil admin
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/user', [AdminAuthController::class, 'user']);
        
        // ========== GESTION DES ACTUALITÉS ==========
        Route::prefix('news')->group(function () {
            Route::get('/', [AdminNewsController::class, 'index']);
            Route::get('/{id}', [AdminNewsController::class, 'show']);
            Route::post('/', [AdminNewsController::class, 'store']);
            Route::put('/{id}', [AdminNewsController::class, 'update']);
            Route::delete('/{id}', [AdminNewsController::class, 'destroy']);
            Route::post('/{id}/publish', [AdminNewsController::class, 'publish']);
            Route::post('/{id}/unpublish', [AdminNewsController::class, 'unpublish']);
            
            // 🖼️ GESTION DES IMAGES
            Route::post('/{id}/upload-image', [AdminNewsController::class, 'uploadImage']);
            Route::post('/{id}/upload-gallery', [AdminNewsController::class, 'uploadGallery']); // ← NOUVELLE
            Route::delete('/{id}/gallery-image', [AdminNewsController::class, 'deleteGalleryImage']); // ← NOUVELLE
        });
        
        // ========== GESTION DES PROJETS ==========
        Route::prefix('projects')->group(function () {
            Route::get('/', [AdminProjectController::class, 'index']);
            Route::get('/statistics', [AdminProjectController::class, 'statistics']);
            Route::get('/{id}', [AdminProjectController::class, 'show']);
            Route::post('/', [AdminProjectController::class, 'store']);
            Route::put('/{id}', [AdminProjectController::class, 'update']);
            Route::delete('/{id}', [AdminProjectController::class, 'destroy']);
            Route::post('/{id}/publish', [AdminProjectController::class, 'publish']);
            Route::post('/{id}/unpublish', [AdminProjectController::class, 'unpublish']);
            Route::post('/{id}/toggle-featured', [AdminProjectController::class, 'toggleFeatured']);
            Route::post('/{id}/image', [AdminProjectController::class, 'uploadImage']);
            Route::post('/{id}/images', [AdminProjectController::class, 'uploadImages']);
            Route::post('/{id}/upload-image', [ProjectController::class, 'uploadImage']);
            Route::post('/{id}/upload-images', [ProjectController::class, 'uploadImages']);
            Route::delete('/{id}/gallery-image', [ProjectController::class, 'deleteGalleryImage']); // ← NOUVELLE ROUTE
        });
        
        // ========== GESTION DES COMMENTAIRES ==========
        Route::prefix('comments')->group(function () {
            Route::get('/', [CommentController::class, 'indexAll']);
            Route::put('/{id}/approve', [CommentController::class, 'approve']);
            Route::put('/{id}/reject', [CommentController::class, 'reject']);
        });
        
        // ========== DOMAINES D'INTERVENTION ==========
        Route::prefix('domains')->group(function () {
            Route::get('/', [DomainController::class, 'adminIndex']);
            Route::get('/{id}', [DomainController::class, 'adminShow']);
            Route::post('/', [DomainController::class, 'store']);
            Route::post('/{id}', [DomainController::class, 'update']);
            Route::delete('/{id}', [DomainController::class, 'destroy']);
            Route::post('/{id}/toggle-status', [DomainController::class, 'toggleStatus']);
        });
        
        // ========== PARTENAIRES ==========
        Route::prefix('partners')->group(function () {
            Route::get('/', [PartnerController::class, 'adminIndex']);
            Route::get('/{id}', [PartnerController::class, 'adminShow']);
            Route::post('/', [PartnerController::class, 'store']);
            Route::put('/{id}', [PartnerController::class, 'update']);
            Route::delete('/{id}', [PartnerController::class, 'destroy']);
            Route::post('/{id}/upload-logo', [PartnerController::class, 'uploadLogo']);
        });
        
        // ========== BÉNÉVOLES (ADMIN) ==========
        Route::prefix('volunteers')->group(function () {
            Route::get('/', [VolunteerController::class, 'index']);
            Route::get('/stats', [VolunteerController::class, 'stats']);
            Route::get('/{id}', [VolunteerController::class, 'show']);
            Route::put('/{id}', [VolunteerController::class, 'update']);
            Route::put('/{id}/status', [VolunteerController::class, 'updateStatus']);
            Route::delete('/{id}', [VolunteerController::class, 'destroy']);
        });
        
        // ========== GESTION DES OFFRES D'EMPLOI ==========
        Route::prefix('jobs')->group(function () {
            Route::get('/', [AdminJobController::class, 'index']);
            Route::get('/statistics', [AdminJobController::class, 'statistics']);
            Route::get('/{id}', [AdminJobController::class, 'show']);
            Route::post('/', [AdminJobController::class, 'store']);
            Route::put('/{id}', [AdminJobController::class, 'update']);
            Route::delete('/{id}', [AdminJobController::class, 'destroy']);
            Route::post('/{id}/publish', [AdminJobController::class, 'publish']);
            Route::post('/{id}/close', [AdminJobController::class, 'close']);
        });
        
        // ========== GESTION DE L'ÉQUIPE ==========
        Route::prefix('team')->group(function () {
            Route::get('/', [TeamMemberController::class, 'adminIndex']);
            Route::get('/statistics', [TeamMemberController::class, 'statistics']);
            Route::get('/{id}', [TeamMemberController::class, 'adminShow']);
            Route::post('/', [TeamMemberController::class, 'store']);
            Route::put('/{id}', [TeamMemberController::class, 'update']);
            Route::post('/{id}', [TeamMemberController::class, 'update']);
            Route::delete('/{id}', [TeamMemberController::class, 'destroy']);
            Route::post('/{id}/toggle-status', [TeamMemberController::class, 'toggleStatus']);
            Route::post('/reorder', [TeamMemberController::class, 'reorder']);
            Route::post('/{id}/upload-photo', [TeamMemberController::class, 'uploadPhoto']);
            Route::delete('/{id}/photo', [TeamMemberController::class, 'deletePhoto']);
        });

        // ========== ✅ ZONES D'INTERVENTION (ADMIN) ==========
        Route::prefix('intervention-zones')->group(function () {
            // ⚠️ ORDRE IMPORTANT : stats avant {id}
            Route::get('/stats', [InterventionZoneController::class, 'stats']);
            Route::get('/', [InterventionZoneController::class, 'index']);
            Route::get('/{id}', [InterventionZoneController::class, 'show']);
            Route::post('/', [InterventionZoneController::class, 'store']);
            Route::put('/{id}', [InterventionZoneController::class, 'update']);
            Route::delete('/{id}', [InterventionZoneController::class, 'destroy']);
            Route::patch('/{id}/toggle-status', [InterventionZoneController::class, 'toggleStatus']);
            Route::post('/reorder', [InterventionZoneController::class, 'reorder']);
        });
        
        // ========== ✨ ENGAGEMENTS ÉTHIQUES (ADMIN) ✨ ==========
        Route::prefix('ethical-commitments')->group(function () {
            Route::get('/stats', [EthicalCommitmentsController::class, 'getStats']);
            Route::get('/', [EthicalCommitmentsController::class, 'adminIndex']);
            Route::get('/{id}', [EthicalCommitmentsController::class, 'adminShow']);
            Route::post('/', [EthicalCommitmentsController::class, 'store']);
            Route::put('/{id}', [EthicalCommitmentsController::class, 'update']);
            Route::delete('/{id}', [EthicalCommitmentsController::class, 'destroy']);
            Route::patch('/{id}/toggle-status', [EthicalCommitmentsController::class, 'toggleStatus']);
            Route::post('/reorder', [EthicalCommitmentsController::class, 'reorder']);
        });
        // ========== DASHBOARD STATS ==========
        Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
        Route::get('/dashboard/activities', [DashboardController::class, 'getRecentActivities']);
        Route::get('/dashboard/alerts', [DashboardController::class, 'getActiveAlerts']); // ✅ AJOUTER CETTE LIGNE
    });
});

/*
|--------------------------------------------------------------------------
| ✨ HUMANITARIAN SPACE - Routes Publiques et Admin ✨
|--------------------------------------------------------------------------
*/

// ========== ROUTES PUBLIQUES ==========
Route::prefix('humanitarian')->group(function () {
    
    // ✅ Engagements Éthiques (PUBLIC - Lecture seule)
    Route::get('/ethical-commitments', [EthicalCommitmentsController::class, 'index']);
    Route::get('/ethical-commitments/{id}', [EthicalCommitmentsController::class, 'show']);
    
    // Alertes humanitaires (PUBLIC)
    Route::get('/alerts', [HumanitarianController::class, 'getAlerts']);
    Route::get('/alerts/{id}', [HumanitarianController::class, 'getAlert']);
    
    // Dénoncer une violation (PUBLIC - Formulaire)
    Route::post('/violations/report', [HumanitarianController::class, 'reportViolation']);
    
    // Actions de plaidoyer (PUBLIC)
    Route::get('/advocacy', [HumanitarianController::class, 'getAdvocacyActions']);
    Route::get('/advocacy/{id}', [HumanitarianController::class, 'getAdvocacyAction']);
});

// ========== ROUTES ADMIN PROTÉGÉES ==========
Route::middleware(['auth:sanctum', 'check.admin'])->prefix('admin/humanitarian')->group(function () {
    
    // ⚠️ ALERTES - ORDRE IMPORTANT (stats avant {id})
    Route::get('/alerts/stats', [HumanitarianController::class, 'getAlertsStats']);
    Route::get('/alerts', [HumanitarianController::class, 'getAlerts']);
    Route::get('/alerts/{id}', [HumanitarianController::class, 'getAlert']);
    Route::post('/alerts', [HumanitarianController::class, 'createAlert']);
    Route::put('/alerts/{id}', [HumanitarianController::class, 'updateAlert']);
    Route::delete('/alerts/{id}', [HumanitarianController::class, 'deleteAlert']);
    Route::patch('/alerts/{id}/activate', [HumanitarianController::class, 'activateAlert']);
    Route::patch('/alerts/{id}/deactivate', [HumanitarianController::class, 'deactivateAlert']);
    
   // ⚠️ VIOLATIONS (ADMIN - Modération) - ORDRE IMPORTANT !
   Route::get('/violations/stats', [HumanitarianController::class, 'getViolationStats']);
   Route::get('/violations', [HumanitarianController::class, 'getViolations']);
   Route::get('/violations/{id}', [HumanitarianController::class, 'getViolation']);
   Route::put('/violations/{id}/status', [HumanitarianController::class, 'updateViolationStatus']);
   Route::delete('/violations/{id}', [HumanitarianController::class, 'deleteViolation']);
    
    // ⚠️ PLAIDOYER - ORDRE IMPORTANT
    Route::get('/advocacy/stats', [HumanitarianController::class, 'getAdvocacyStats']);
    Route::get('/advocacy', [HumanitarianController::class, 'getAdvocacyActions']);
    Route::get('/advocacy/{id}', [HumanitarianController::class, 'getAdvocacyAction']);
    Route::post('/advocacy', [HumanitarianController::class, 'createAdvocacy']);
    Route::put('/advocacy/{id}', [HumanitarianController::class, 'updateAdvocacy']);
    Route::delete('/advocacy/{id}', [HumanitarianController::class, 'deleteAdvocacy']);
});