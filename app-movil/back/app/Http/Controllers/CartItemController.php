<?php

namespace App\Http\Controllers;

use App\Models\Cart\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CartItemController extends Controller
{
    // PUT /api/cart/items/{id}
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity_item' => 'required|integer|min:1',
        ]);

        $item = CartItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item no encontrado'], 404);
        }

        $item->quantity_item = $validated['quantity_item'];
        $item->save();

        return response()->json([
            'message' => 'Cantidad actualizada correctamente',
            'item' => $item,
        ]);
    }

    // DELETE /api/cart/items/{id}
    public function destroy($id)
    {
        $item = CartItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item no encontrado'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Item eliminado correctamente']);
    }
}
