import { useForm, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Componente para ver estadísticas (Total, Completas, Progreso)
const Stats = ({ total, completed, progress }) => (
    <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Total</span>
            <span className="text-2xl font-black text-indigo-600">{total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Completas</span>
            <span className="text-2xl font-black text-emerald-500">{completed}</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Progreso</span>
            <span className="text-2xl font-black text-amber-500">{progress}%</span>
        </div>
    </div>
);

// Componente para una tarea individual con edición
const TaskItem = ({ task, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    // Guarda los cambios al terminar de editar
    const handleSave = () => {
        setIsEditing(false);
        if (editValue.trim() !== "" && editValue !== task.title) {
            onEdit(task.id, editValue);
        } else {
            setEditValue(task.title);
        }
    };

    return (
        <li className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer"
            />

            <div className="ml-4 flex-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        autoFocus
                        className="w-full border-none focus:ring-0 p-0 text-slate-700 font-medium"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className={`text-slate-700 font-medium cursor-pointer block w-full ${task.completed ? 'line-through text-slate-400' : ''
                            }`}
                    >
                        {task.title}
                    </span>
                )}
            </div>
        </li>
    );
};

// Componente principal de la aplicación
export default function Welcome({ tasks = [] }) {
    // useForm para el formulario de añadir tarea
    const { data, setData, post, reset, processing } = useForm({
        title: ''
    });

    // Cálculos de las estadísticas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Añade una nueva tarea a la BD
    const handleAddTask = (e) => {
        e.preventDefault();
        if (data.title.trim() === "") return;

        post('/tasks', {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // Cambia una tarea entre completada/pendiente
    const toggleTask = (id) => {
        router.patch(`/tasks/${id}/toggle`, {}, {
            preserveScroll: true
        });
    };

    // Actualiza el título de una tarea editada
    const editTask = (id, newTitle) => {
        router.patch(`/tasks/${id}`, { title: newTitle }, {
            preserveScroll: true
        });
    };

    // Elimina las tareas marcadas como completadas
    const clearCompleted = () => {
        router.delete('/tasks/completed', {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="TaskHub - Mis Tareas" />

            <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
                <div className="w-full max-w-lg">
                    <div className="flex items-center justify-center mb-8">
                        <h1 className="text-3xl font-black text-slate-800">
                            TaskHub
                        </h1>
                    </div>

                    <Stats
                        total={totalTasks}
                        completed={completedTasks}
                        progress={progressPercentage}
                    />

                    <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
                        <input
                            type="text"
                            placeholder="¿Qué tienes que hacer?"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            Añadir
                        </button>
                    </form>

                    <div className="space-y-3 mb-8">
                        {tasks.length > 0 ? (
                            <ul className="space-y-3">
                                {tasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={toggleTask}
                                        onEdit={editTask}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400">No hay tareas. ¡Escribe algo arriba!</p>
                            </div>
                        )}
                    </div>

                    {completedTasks > 0 && (
                        <div className="text-center">
                            <button
                                onClick={clearCompleted}
                                className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest"
                            >
                                Borrar completadas
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
