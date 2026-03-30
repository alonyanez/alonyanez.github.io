import { useEffect, useState } from 'react';
import { tareaService, Tarea } from '../services/tareaService';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function TareaForm() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const data = await tareaService.listar();
      setTareas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleToggleCompletada = async (id: number, completada: boolean) => {
    await tareaService.completar(id, !completada);
    cargarTareas(); // recargar
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Eliminar tarea?')) {
      await tareaService.eliminar(id);
      cargarTareas();
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Mis Tareas</h1>
        <div>
          <button
            onClick={() => navigate('/tareas/nueva')}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Nueva Tarea
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h3 className={`text-xl ${tarea.completada ? 'line-through text-gray-500' : ''}`}>
                {tarea.titulo}
              </h3>
              <div>
                <button
                  onClick={() => handleToggleCompletada(tarea.id!, tarea.completada)}
                  className={`p-1 rounded mr-2 ${tarea.completada ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                >
                  {tarea.completada ? 'Desmarcar' : 'Completar'}
                </button>
                <button
                  onClick={() => navigate(`/tareas/editar/${tarea.id}`)}
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(tarea.id!)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="text-gray-600">{tarea.descripcion}</p>
            <p className="text-sm text-gray-400">Fecha límite: {tarea.fechaLimite}</p>
          </div>
        ))}
      </div>
    </div>
  );
}