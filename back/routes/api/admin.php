<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::post('/', 'createUser');
    Route::put('/{id_user}', 'updateUser')->whereUuid('id_user');
    Route::patch('/{id_user}', 'changeStatusUser')->whereUuid('id_user');
    Route::get('/', 'getUsers');
    Route::put('/password', 'changePassword');
});
