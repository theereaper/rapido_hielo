<?php

namespace App\Http\Controllers;

use App\Models\Cart\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function store(Request $request)
    {
        $item = CartItem::where('fk_cart_id', $request->fk_cart_id)
            ->where('fk_product_id', $request->fk_product_id)
            ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->price_product = $item->quantity * $request->unit_price;
            $item->save();
        } else {
            $item = CartItem::create([
                'fk_cart_id' => $request->fk_cart_id,
                'fk_product_id' => $request->fk_product_id,
                'name_product' => $request->name_product,
                'price_product' => $request->unit_price * $request->quantity,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json([
            'message' => 'Item agregado o actualizado',
            'item' => $item
        ], 201);
    }
}
