import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tareaService } from '../services/tareaService';
import Button from '@/components/button/Button';
import './Login.css'; 

export default function CrearTarea() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviamos el objeto tal cual lo espera el @RequestBody de Java
      await tareaService.crear({ 
        titulo, 
        descripcion, 
        fechaLimite,
        completada: false 
      });
      navigate('/dashboard'); // Redirigir al listado
    } catch (err) {
      setError('No se pudo guardar la tarea. Revisa la conexión.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Nueva Tarea</h2>
        <p className="login-subtitle">Define tu próximo objetivo</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <input
            type="text"
            placeholder="Título (ej: Estudiar React)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="login-input"
            required
          />

          <textarea
            placeholder="Añade una descripción..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="login-input"
            style={{ minHeight: '100px', resize: 'none', paddingTop: '1rem' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#888', fontSize: '0.8rem', marginLeft: '12px' }}>
              Fecha límite
            </label>
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              className="login-input"
            />
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Guardar Tarea
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