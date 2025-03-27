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
*/

// ======================= AUTH ROUTES =======================
// ✅ Public endpoints (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ======================= SUPERADMIN ROUTES =======================
Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
    
    // ✅ PRODUCTS
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // ✅ CATEGORIES
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // ✅ MAJORS
    Route::get('/majors', [MajorController::class, 'index']);
    Route::post('/majors', [MajorController::class, 'store']);
    Route::get('/majors/{id}', [MajorController::class, 'show']);
    Route::put('/majors/{id}', [MajorController::class, 'update']);
    Route::delete('/majors/{id}', [MajorController::class, 'destroy']);

    // ✅ MINORS
    Route::get('/majors/{major}/minors', [MinorController::class, 'getMinorsByMajor']);

    Route::get('/minors', [MinorController::class, 'index']);
    Route::post('/minors', [MinorController::class, 'store']);
    Route::get('/minors/{id}', [MinorController::class, 'show']);
    Route::put('/minors/{id}', [MinorController::class, 'update']);
    Route::delete('/minors/{id}', [MinorController::class, 'destroy']);

    // ✅ MAJOR-MINOR RELATIONSHIPS
    Route::get('/major-minor/majors', [MajorMinorController::class, 'getMajors']);
    Route::get('/major-minor/majors/{major}/minors', [MajorMinorController::class, 'getMinors']);

    // ✅ VENDORS
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::post('/vendors', [VendorController::class, 'store']);
    Route::get('/vendors/{id}', [VendorController::class, 'show']);
    Route::put('/vendors/{id}', [VendorController::class, 'update']);
    Route::delete('/vendors/{id}', [VendorController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});


// ======================= ADMIN ROUTES =======================
// ✅ Admin can only view products for now
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
});

// ======================= AUTH SANCTUM TEST ROUTE =======================
// ✅ Test route for logged in user details
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return [
        'user' => $request->user(),
        'roles' => $request->user()->getRoleNames(),
    ];
});
