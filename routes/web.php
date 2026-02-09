<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{id}', [TaskController::class, 'update'])->name('tasks.update');
Route::patch('/tasks/{id}/toggle', [TaskController::class, 'toggle'])->name('tasks.toggle');
Route::delete('/tasks/completed', [TaskController::class, 'destroy'])->name('tasks.destroy');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';