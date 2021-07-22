<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::get('test', function () {
    return \App\Models\Project::all();
});

Route::get('permissions', [PermissionController::class, 'index']);

Route::prefix('api')
    ->name('api.')
    ->group(function () {

        Route::get('projects', [ProjectController::class, 'index']);
        Route::post('projects/create', [ProjectController::class, 'create']);
        Route::post('projects/store', [ProjectController::class, 'store']);
        Route::post('projects/edit', [ProjectController::class, 'edit']);
        Route::post('projects/update', [ProjectController::class, 'update']);
        Route::post('projects/destroy', [ProjectController::class, 'destroy']);


        Route::post('permissions', [PermissionController::class, 'index']);
        Route::post('permissions/store', [PermissionController::class, 'store']);
        Route::post('permissions/destroy', [PermissionController::class, 'destroy']);
        Route::post('permissions/cell-edit', [PermissionController::class, 'cellEdit']);
        Route::post('permissions/backup', [PermissionController::class, 'backup']);
        Route::post('permissions/restore', [PermissionController::class, 'restore']);


    });

Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}', 'webapp.base_react');
