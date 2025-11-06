<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;

Route::prefix('account')->controller(AccountController::class)->group(function () {
    Route::get('/', 'show');
    Route::put('/', 'update');
    Route::patch('/password', 'updatePassword');
});
