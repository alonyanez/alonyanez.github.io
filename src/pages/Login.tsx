import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

import Button from '@/components/button/Button';
import './Login.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('https://habituall.onrender.com/api/auth/health', {
          method: 'GET',
          mode: 'cors'
        });
        if (!response.ok) {
          setServerStatus('offline');
        } else {
          setServerStatus('online');
        }
        
      } catch (err) {
        setServerStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      if(localStorage.getItem('token')) navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
  
        <div className={`server-badge ${serverStatus}`}>
          <span className="dot"></span>
          {serverStatus === 'checking' && 'Verificando Strapboost...'}
          {serverStatus === 'online' && 'Sistema Online'}
          {serverStatus === 'offline' && 'Servidor Despertando...'}
        </div>

        <h2 className="login-title">Iniciar sesión</h2>
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
            disabled={serverStatus !== 'online'} 
            style={{ width: '100%', padding: '1rem', position: 'relative' }}>
            
            {serverStatus === 'online' ? 'Entrar' : (
              <>
                <span className="loader-mini"></span> 
                Despertando servidor...
              </>
            )}
        </Button>

          <p className="login-footer">
            ¿No tienes cuenta? <Link to="/register" className="login-link">Regístrate</Link>
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