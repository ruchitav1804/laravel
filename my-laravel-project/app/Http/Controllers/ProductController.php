<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Minor; // You use Minor in getMinors()
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ========== Existing API Methods ========== //
    // You already have these: index(), show(), store(), update(), destroy()

    // ========== New WEB Methods ========== //

    // Show all products in a Blade view
    public function indexWeb()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    // Show single product details in a Blade view
    public function showWeb($id)
    {
        $product = Product::findOrFail($id);
        return view('products.show', compact('product'));
    }

    // Show form to create a new product
    public function createWeb()
    {
        // You may want to pass vendors, majors, minors, etc. here
        return view('products.create');
    }

    // Store the new product (from web form)
    public function storeWeb(Request $request)
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

        Product::create($validatedData);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    // Show form to edit an existing product
    public function editWeb($id)
    {
        $product = Product::findOrFail($id);
        return view('products.edit', compact('product'));
    }

    // Update the product from the web form
    public function updateWeb(Request $request, $id)
    {
        $product = Product::findOrFail($id);

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

        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    // Delete a product (from web form)
    public function destroyWeb($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}
