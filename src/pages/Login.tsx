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
    // CONTENEDOR PADRE: Ocupa toda la pantalla y centra el contenido
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] p-4 font-sans">
      
      {/* EL RECUADRO (CARD): Aquí es donde ocurre la magia del diseño */}
      <div className="w-full max-w-md bg-[#111111] border border-white/10 p-10 rounded-[32px] shadow-2xl">
        
        {/* ENCABEZADO */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Iniciar sesión</h2>
          <p className="text-gray-400 text-sm">Gestiona tus tareas de forma eficiente</p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // w-full asegura que ocupe todo el ancho del recuadro
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

          {error && (
            <p className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-400">
            ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Regístrate</Link>
          </p>
        </form>

        {/* SEPARADOR VISUAL */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#111111] px-2 text-gray-500">O</span>
          </div>
        </div>

        {/* BOTÓN VOLVER */}
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