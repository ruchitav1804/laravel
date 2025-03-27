<?php

use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return 'Login page here';
})->name('login');

Route::get('/setup-roles', function () {
    // Create roles
    Role::firstOrCreate(['name' => 'superadmin']);
    Role::firstOrCreate(['name' => 'admin']);

    // Assign role to a specific user (change ID)
    $superAdmin = User::find(1);
    $superAdmin->assignRole('superadmin');

    $admin = User::find(2);
    $admin->assignRole('admin');

    return 'Roles created and assigned!';
});