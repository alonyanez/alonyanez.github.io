import axios from 'axios';

const api = axios.create({
  baseURL: 'https://habituall.onrender.com/api',
});

// Interceptor para añadir el Token (esto es lo que permite que getUsuarioAutenticado() funcione en Java)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  completada: boolean;
}

export const tareaService = {
  listar: async () => {
    const response = await api.get<Tarea[]>('/tarea/listarTareas');
    return response.data;
  },
  
  crear: async (tarea: Partial<Tarea>) => {
    const response = await api.post<Tarea>('/tarea/crearTarea', tarea);
    return response.data;
  },

  completar: async (id: number, completada: boolean) => {
    const response = await api.patch(`/tarea/marcarCompletada/${id}/completar?completada=${completada}`);
    return response.data;
  },

  eliminar: async (id: number) => {
    await api.delete(`/tarea/eliminarTarea/${id}/completar?completada=false`);
  }
};