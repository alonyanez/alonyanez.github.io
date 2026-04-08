import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

import Button from '@/components/button/Button';
import './Login.css'; 
//import '@fontsource-variable/onest';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register({
        email, password,
        name: ''
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
   
    <div className="login-container"><div className="login-card">
        <h2 className="login-title">Registrarse</h2>
        <p className="login-subtitle">Gestiona tus tareas de forma eficiente</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <Button 
            type="submit"
            variant="primary" 
            style={{ width: '100%', padding: '1rem' }}>
            Registrarse
          </Button>

          <p className="login-footer">
            ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link>
          </p>
        </form>

        <div className="divider"></div>

        <Button 
          onClick={() => navigate('/')} 
          variant="primary"
          style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
        >
        Volver al inicio
        </Button>
      </div>
    </div>
  );
}