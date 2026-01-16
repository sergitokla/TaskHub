export default function Welcome() {

    const nombreUsuario = "Sergio";
    const tareasPendientes = ["Instalar Laravel", "Configurar React", "Aprender Tailwind", "Jugar Rocket League"];
    const fechaActual = new Date().toLocaleDateString();
 
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
            
            <h1 className="text-4xl font-black text-indigo-600 uppercase">
                TaskHub de {nombreUsuario}
            </h1>
            
            <p className="text-slate-500 mt-2 font-medium">
                Hoy es: {fechaActual}
            </p>
 
            <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-slate-800">
                    Tareas de hoy:
                </h2>
                
                <ul className="space-y-3">
                    {tareasPendientes.map((tarea, index) => (
                        <li
                            key={index}
                            className={`flex items-center gap-3 p-2 bg-slate-50 rounded-lg ${
                                tarea.includes("Laravel")
                                    ? "text-blue-600 font-semibold"
                                    : "text-slate-800"
                            }`}
                        >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            {tarea}
                        </li>
                    ))}
                </ul>
            </div>
 
            <div className="mt-10 flex gap-4">
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
                    Nueva Tarea
                </button>
            </div>
        </div>
    );
}