<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CreateProjectController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/project', ProjectController::class);
    // Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
    //     ->name('task.myTasks');
    Route::resource('/task', TaskController::class);
    Route::resource('/user', UserController::class);
    Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::get('/user/{id}/project/create', [ProjectController::class, 'create_with_id'])->name('project.create_with_id');
    Route::post('/user/{id}/project/store', [ProjectController::class, 'store']);
    Route::get('/project/{id}/task/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/project/{id}/task/store', [TaskController::class, 'store']);

    Route::resource('/invoice', InvoiceController::class);

    Route::get('/customers', [StripeController::class, 'customers']);
    Route::get('/checkout', [StripeController::class, 'checkout']);
    Route::get('/products', [StripeController::class, 'products']);

    Route::get('/proposal', [ProposalController::class, 'create']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 404
Route::get('/logout', function () {
    return abort(404);
});

require __DIR__ . '/auth.php';