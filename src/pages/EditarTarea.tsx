import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tareaService, Tarea } from '../services/tareaService';

import Button from '@/components/button/Button';
import './Login.css'; 

export default function EditarTarea() {
  const { id } = useParams<{ id: string }>(); // Captura el ID de la URL
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [completada, setCompletada] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Cargar los datos de la tarea al entrar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (id) {
          const tarea = await tareaService.obtenerPorId(Number(id));
          setTitulo(tarea.titulo);
          setDescripcion(tarea.descripcion);
          setFechaLimite(tarea.fechaLimite || '');
          setCompletada(tarea.completada);
        }
      } catch (err) {
        setError('No se pudo cargar la tarea o no tienes permisos.');
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  // 2. Enviar los cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await tareaService.actualizar(Number(id), {
          titulo,
          descripcion,
          fechaLimite,
          completada
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Error al actualizar la tarea.');
    }
  };

  if (loading) return (
    <div className="login-container">
      <div className="loader-mini"></div>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Editar Tarea</h2>
        <p className="login-subtitle">Modifica los detalles de tu tarea</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="login-input"
            required
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="login-input"
            style={{ minHeight: '100px', resize: 'none', paddingTop: '1rem' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#888', fontSize: '0.8rem', marginLeft: '12px' }}>Fecha límite</label>
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              className="login-input"
            />
          </div>

          {/* Selector de estado simple */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
            <input 
                type="checkbox" 
                checked={completada} 
                onChange={(e) => setCompletada(e.target.checked)}
                id="completada"
            />
            <label htmlFor="completada" style={{ color: 'white', fontSize: '0.9rem' }}>Marcar como completada</label>
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Guardar Cambios
          </Button>

          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="primary" 
            style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
}