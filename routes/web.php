<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CreateProjectController;
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
    Route::get('/user/{id}/project/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/user/{id}/project/store', [ProjectController::class, 'store']);
    Route::get('/project/{id}/task/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/project/{id}/task/store', [TaskController::class, 'store']);

    Route::resource('invoice', InvoiceController::class);
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