<?php

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

Route::get('test', function (){
    return \App\Models\Project::all();
});

Route::get('permissions', [\App\Http\Controllers\PermissionController::class, 'index']);

Route::get('projects/all', [\App\Http\Controllers\ProjectController::class, 'index']);
Route::post('projects/create', [\App\Http\Controllers\ProjectController::class, 'create']);
Route::post('projects/store', [\App\Http\Controllers\ProjectController::class, 'store']);
Route::post('projects/edit', [\App\Http\Controllers\ProjectController::class, 'edit']);
Route::post('projects/update', [\App\Http\Controllers\ProjectController::class, 'update']);
Route::post('projects/destroy', [\App\Http\Controllers\ProjectController::class, 'destroy']);


Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}', 'webapp.base_react');

