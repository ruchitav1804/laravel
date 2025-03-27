<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\MinorController;
use App\Http\Controllers\MajorMinorController;
use App\Http\Controllers\VendorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/

// ======================= AUTH ROUTES =======================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/products', [ProductController::class, 'index']);     // List products
Route::post('/products', [ProductController::class, 'store']);    // Create product
Route::get('/products/{id}', [ProductController::class, 'show']); // Show product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product

// ======================= CATEGORIES ROUTES =======================
Route::get('/categories', [CategoryController::class, 'index']);        // List categories
Route::post('/categories', [CategoryController::class, 'store']);       // Create category
Route::get('/categories/{id}', [CategoryController::class, 'show']);    // Show category
Route::put('/categories/{id}', [CategoryController::class, 'update']);  // Update category
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Delete category

// ======================= MAJORS ROUTES =======================
Route::get('/majors', [MajorController::class, 'index']);        // List majors
Route::post('/majors', [MajorController::class, 'store']);       // Create major
Route::get('/majors/{id}', [MajorController::class, 'show']);    // Show major
Route::put('/majors/{id}', [MajorController::class, 'update']);  // Update major
Route::delete('/majors/{id}', [MajorController::class, 'destroy']); // Delete major

// ======================= MINORS ROUTES =======================
// ✅ Get minors by major (using getMinorsByMajor)
Route::get('/majors/{major}/minors', [MinorController::class, 'getMinorsByMajor']);

// CRUD for minors
Route::get('/minors', [MinorController::class, 'index']);        // List minors
Route::post('/minors', [MinorController::class, 'store']);       // Create minor
Route::get('/minors/{id}', [MinorController::class, 'show']);    // Show minor
Route::put('/minors/{id}', [MinorController::class, 'update']);  // Update minor
Route::delete('/minors/{id}', [MinorController::class, 'destroy']); // Delete minor

// ======================= VENDORS ROUTES =======================
Route::get('/vendors', [VendorController::class, 'index']);           // List vendors
Route::post('/vendors', [VendorController::class, 'store']);          // Create vendor
Route::get('/vendors/{id}', [VendorController::class, 'show']);       // Show vendor
Route::put('/vendors/{id}', [VendorController::class, 'update']);     // Update vendor
Route::delete('/vendors/{id}', [VendorController::class, 'destroy']); // Delete vendor

// ======================= OPTIONAL EXTRA ROUTES (MajorMinorController if needed) =======================
Route::get('/major-minor/majors', [MajorMinorController::class, 'getMajors']); // Optional
Route::get('/major-minor/majors/{major}/minors', [MajorMinorController::class, 'getMinors']); // Optional
});

// SUPERADMIN ROUTES
Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
    Route::get('/vendors', [VendorController::class, 'index']);
    // Add other routes superadmin needs
});

// ADMIN ROUTES
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
});

// ======================= AUTH SANCTUM TEST ROUTE =======================
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
