<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function createProduct(CreateProductRequest $request)
    {
        $Product = Product::create([
            'name' =>  $request->get('name'),
            'description' =>  $request->get('description'),
            'weight' => $request->get('weight'),
            'price' => $request->get('price'),
        ]);

        $Product->key = $Product->id;
        $Product->status = "active";

        return response()->json([
            'message' => "Producto creado con éxito",
            'register' => $Product,
        ], 201);
    }
}
