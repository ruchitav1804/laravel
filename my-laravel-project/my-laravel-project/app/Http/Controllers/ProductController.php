<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getMinors($majorId)
    {
        $minors = Minor::where('major_id', $majorId)->get();

        return response()->json($minors);
    }


    // Get a single product by ID
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // Add a new product
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'asset_number' => 'required|string|max:255',
            'vendor_id' => 'required|integer',
            'vendor_code' => 'required|string|max:255',
            'vendor_name' => 'required|string|max:255',
            'major_id' => 'required|integer',
            'minor_id' => 'required|integer',
            'category_id' => 'required|integer',
            'asset_cost' => 'required|numeric',
            'date_added' => 'required|date',
            'deprn_method_code' => 'required|string|max:255',
            'original_cost' => 'required|numeric',
            'current_cost' => 'required|numeric',
            'accumulated_deprn' => 'required|numeric',
            'deprn_amount' => 'required|numeric',
            'ytd_deprn' => 'required|numeric',
            'period_name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'life_in_months' => 'required|integer',
            'description' => 'required|string|max:255',
            'cost_account_description' => 'required|string|max:255',
            'accumulated_account_description' => 'required|string|max:255',
        ]);

        $product = Product::create($validatedData);

        return response()->json([
            'message' => 'Product added successfully',
            'data' => $product
        ], 201);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'asset_number' => 'required|string|max:255',
            'vendor_id' => 'required|integer',
            'vendor_code' => 'required|string|max:255',
            'vendor_name' => 'required|string|max:255',
            'major_id' => 'required|integer',
            'minor_id' => 'required|integer',
            'category_id' => 'required|integer',
            'asset_cost' => 'required|numeric',
            'date_added' => 'required|date',
            'deprn_method_code' => 'required|string|max:255',
            'original_cost' => 'required|numeric',                                                    
            'current_cost' => 'required|numeric',
            'accumulated_deprn' => 'required|numeric',
            'deprn_amount' => 'required|numeric',
            'ytd_deprn' => 'required|numeric',
            'period_name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'life_in_months' => 'required|integer',
            'description' => 'required|string|max:255',
            'cost_account_description' => 'required|string|max:255',
            'accumulated_account_description' => 'required|string|max:255',
        ]);

        $product->update($validatedData);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    // Delete a product (optional)
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
