import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Iniciar sesión</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Gestiona tus tareas de forma eficiente</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-2xl mt-8 transition-all shadow-lg shadow-blue-500/20"
          >
            Entrar
          </button>

          <p className="mt-6 text-center text-gray-400 text-sm">
            ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Regístrate</Link>
          </p>
        </form>

      
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0b0b] px-2 text-gray-500">O</span></div>
        </div>
        
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="w-full bg-transparent border border-white/10 text-gray-300 hover:bg-white/5 p-4 rounded-2xl transition-all text-sm font-medium"
        >
          ← Volver al inicio
        </button>
    </div>
  </div>
  );
}