import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Registrarse</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Registrarse
        </button>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
        </p>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Volver al inicio
        </button>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/home" className="text-blue-500">Volver al inicio</Link>
        </p>
      </form>
    </div>
  );
}