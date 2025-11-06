<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::post('/', 'createUser');
    Route::put('/{id_user}', 'updateUser')->whereUuid('id_user');
    Route::patch('/{id_user}', 'changeStatusUser')->whereUuid('id_user');
    Route::get('/', 'getUsers');
    Route::put('/password', 'changePassword');
});

Route::prefix('clients')->controller(ClientController::class)->group(function () {
    Route::post('/', 'createClient');
    Route::put('/{id_client}', 'updateClient')->whereUuid('id_client');
    Route::patch('/{id_client}', 'changeStatusClient')->whereUuid('id_client');
    Route::get('/', 'getClients');
    Route::put('/password', 'changePassword');
});
