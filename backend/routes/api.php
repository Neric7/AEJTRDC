<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CommentController;

/*
|--------------------------------------------------------------------------
| Public News API
|--------------------------------------------------------------------------
*/

Route::prefix('news')->group(function () {
    Route::get('/', [NewsController::class, 'index']);
    Route::get('/latest', [NewsController::class, 'latest']);
    Route::get('/tag/{tag}', [NewsController::class, 'byTag']);

    // D'abord les routes spécifiques
    Route::get('/{id}/related', [NewsController::class, 'related']);

    // Puis la route générique Slug ou ID
    Route::get('/{idOrSlug}', [NewsController::class, 'show']);
});

Route::prefix('news/{newsId}/comments')->group(function () {
    Route::get('/', [CommentController::class, 'index']);
    Route::post('/', [CommentController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Admin News API (secured)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin/news')->group(function () {
    Route::post('/', [NewsController::class, 'store']);
    Route::put('/{id}', [NewsController::class, 'update']);
    Route::delete('/{id}', [NewsController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch('comments/{id}/approve', [CommentController::class, 'approve']);
    Route::patch('comments/{id}/reject', [CommentController::class, 'reject']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);
});