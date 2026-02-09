<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Listar todas las tareas
    public function index()
    {
        $tasks = Task::all();
        return inertia('Welcome', ['tasks' => $tasks]);
    }

    // Crear nueva tarea
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        Task::create([
            'title' => $request->title,
            'completed' => false
        ]);

        return back();
    }

    // Actualizar título de una tarea
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $task = Task::find($id);
        $task->update(['title' => $request->title]);

        return back();
    }

    // Cambiar estado completado/no completado
    public function toggle($id)
    {
        $task = Task::find($id);
        $task->update(['completed' => !$task->completed]);

        return back();
    }

    // Eliminar tareas completadas
    public function destroy()
    {
        Task::where('completed', true)->delete();
        return back();
    }
}