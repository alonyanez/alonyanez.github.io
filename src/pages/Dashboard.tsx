import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tareaService, Tarea } from '../services/tareaService';
import { authService } from '../services/authService';

// Reutilizamos tus componentes y estilos
import Button from '@/components/button/Button';
import './Login.css'; 

export default function TareaForm() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const navigate = useNavigate();

  useEffect(() => {
    checkServerAndLoad();
  }, []);

  const checkServerAndLoad = async () => {
    try {
      // Opcional: Verificar salud del servidor como en el Login
      const response = await fetch('https://habituall.onrender.com/api/auth/health');
      if (response.ok) setServerStatus('online');
      
      await cargarTareas();
    } catch (error) {
      setServerStatus('offline');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cargarTareas = async () => {
    try {
      const data = await tareaService.listar();
      setTareas(data);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleToggleCompletada = async (id: number, completada: boolean) => {
    await tareaService.completar(id, !completada);
    cargarTareas();
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Eliminar esta tarea?')) {
      await tareaService.eliminar(id);
      cargarTareas();
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="loader-mini"></div>
        <p style={{ color: 'white', marginTop: '1rem' }}>Cargando tus tareas...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Usamos un max-width un poco más grande para la lista */}
      <div className="login-card" style={{ maxWidth: '800px', width: '95%' }}>
        
        {/* Badge de estado igual que en Login */}
        <div className={`server-badge ${serverStatus}`} style={{ marginBottom: '2rem' }}>
          <span className="dot"></span>
          {serverStatus === 'online' ? 'Sincronizado con Render' : 'Conectando...'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 className="login-title" style={{ textAlign: 'left', margin: 0 }}>Mis Tareas</h2>
            <p className="login-subtitle" style={{ textAlign: 'left', margin: 0 }}>Organiza tu día a día</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={() => navigate('/tareas/nueva')} variant="primary" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
              + Nueva
            </Button>
            <Button onClick={handleLogout} variant="primary" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
              Salir
            </Button>
          </div>
        </div>

        <div className="divider"></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tareas.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No hay tareas pendientes. ¡Buen trabajo!</p>
          ) : (
            tareas.map(tarea => (
              <div key={tarea.id} className="login-input" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: tarea.completada ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                cursor: 'default'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.1rem', 
                    color: tarea.completada ? '#666' : 'white',
                    textDecoration: tarea.completada ? 'line-through' : 'none'
                  }}>
                    {tarea.titulo}
                  </h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#888' }}>
                    {tarea.descripcion}
                  </p>
                  {tarea.fechaLimite && (
                    <span style={{ fontSize: '0.75rem', color: '#555' }}>📅 {tarea.fechaLimite}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
                  <Button 
                    onClick={() => handleToggleCompletada(tarea.id!, tarea.completada)}
                    variant="transparent"
                    style={{ padding: '5px 10px', fontSize: '0.8rem', color: tarea.completada ? '#eab308' : '#22c55e' }}
                  >
                    {tarea.completada ? 'Reabrir' : 'Hecho'}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate(`/tareas/editar/${tarea.id}`)}
                    variant="transparent"
                    style={{ padding: '5px 10px', fontSize: '0.8rem', color: '#3b82f6' }}
                  >
                    Editar
                  </Button>

                  <Button 
                    onClick={() => handleEliminar(tarea.id!)}
                    variant="transparent"
                    style={{ padding: '5px 10px', fontSize: '0.8rem', color: '#ef4444' }}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="divider" style={{ marginTop: '2rem' }}></div>
        <p className="login-footer">
          Habituall v1.0 • <Link to="/" className="login-link">Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}