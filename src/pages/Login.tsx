import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Responsive, WidthProvider } from 'react-grid-layout';

// Reutilizamos tus componentes de estilo
import Button from '@/components/button/Button';
import { WideCard } from '@/components/cards/index';

// Estilos y fuentes
import './home.css'; // Reutilizamos el CSS del home para consistencia
import '@fontsource-variable/onest';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Definimos un layout sencillo: una sola tarjeta centrada
  const layouts = {
    lg: [{ i: 'login-card', x: 1, y: 0, w: 1, h: 12 }],
    md: [{ i: 'login-card', x: 1, y: 0, w: 1, h: 12 }],
    sm: [{ i: 'login-card', x: 0, y: 0, w: 2, h: 12 }],
    xs: [{ i: 'login-card', x: 0, y: 0, w: 1, h: 14 }],
  };

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
    <div className='container-grid'>
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={21}
        isDraggable={false} // En el login mejor que no se mueva
        isResizable={false}
        margin={[32, 32]}
      >
        <div key='login-card' className='grid-item'>
          <WideCard markdownPath=''>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 h-full">
              <div className="flex-grow">
                <p className="text-gray-400 mb-6 text-sm">Introduce tus datos para acceder a tu panel.</p>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white"
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white"
                  />
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  link='https://alonyanez.github.io/dashboard'
                />
                <p className="mt-6 text-center text-sm text-gray-400">
                  ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:underline">Regístrate</Link>
                </p>
              </div>
            </form>
          </WideCard>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}