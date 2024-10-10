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

    Route::resource('/projects', ProjectController::class);
    // Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
    //     ->name('task.myTasks');
    Route::resource('/tasks', TaskController::class);
    Route::resource('/users', UserController::class);
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::get('/users/{id}/projects/create', [ProjectController::class, 'create_with_id'])->name('projects.create_with_id');
    Route::post('/users/{id}/projects/store', [ProjectController::class, 'store']);
    Route::get('/projects/{id}/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/projects/{id}/tasks/store', [TaskController::class, 'store']);

    Route::get('/customers', [StripeController::class, 'customers']);
    Route::get('/checkout', [StripeController::class, 'checkout']);
    Route::get('/products', [StripeController::class, 'products']);

    Route::get('/proposals', [ProposalController::class, 'index'])->name('proposals.index');
    Route::get('/proposals/create', [ProposalController::class, 'create'])->name('proposals.create');
    Route::post('/proposals/store', [ProposalController::class, 'store'])->name('proposals.store');
    Route::get('/proposals/{id}', [ProposalController::class, 'index'])->name('proposals.show');

    Route::resource('/invoices', InvoiceController::class);
    Route::get('/invoices/create', [InvoiceController::class, 'create'])->name('invoices.create');
    Route::get('/invoices/{id}', [InvoiceController::class, 'show'])->name('invoices.show');
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