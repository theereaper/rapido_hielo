<?php

namespace App\Http\Controllers;

use App\Models\Cart\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $exist_cart = Cart::where('fk_client_id', $request->fk_client_id)
            ->where('status', 'active')
            ->first();

        if ($exist_cart) {
            return response()->json([
                'message' => 'Carrito ya existe',
            ], 400);
        }

        $cart = Cart::create([
            'fk_client_id' => $request->fk_client_id,
            'status' => 'active'
        ]);

        return response()->json([
            'message' => 'Carrito creado con éxito',
            'cart' => $cart,
        ], 200);
    }
}
