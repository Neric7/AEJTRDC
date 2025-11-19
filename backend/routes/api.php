<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques
Route::prefix('')->group(function () {
    
    // Authentification
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // News - Routes publiques
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/tag/{tag}', [NewsController::class, 'getByTag']);
    Route::get('/news/{id}', [NewsController::class, 'show']);

    // Commentaires - Lecture publique
    Route::get('/news/{newsId}/comments', [CommentController::class, 'index']);
    Route::post('/news/{newsId}/comments', [CommentController::class, 'store']);
});

// Routes protégées (nécessitent authentification)
Route::middleware('auth:sanctum')->group(function () {
    
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);

    // Commentaires - Actions nécessitant authentification
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});