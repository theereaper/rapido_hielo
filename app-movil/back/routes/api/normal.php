<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;

Route::prefix('account')->controller(AccountController::class)->group(function () {
    Route::get('/', 'show');
    Route::put('/', 'update');
    Route::patch('/password', 'updatePassword');
});

Route::prefix('products')->controller(ProductController::class)->group(function () {
    Route::get('/', 'show');
});

Route::prefix('carts/items')->controller(CartItemController::class)->group(function () {
    Route::post('/', 'store');
});

Route::prefix('carts')->controller(CartController::class)->group(function () {
    Route::post('/', 'store');
});
