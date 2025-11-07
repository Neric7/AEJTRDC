<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;

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