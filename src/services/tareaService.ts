import { api } from "./api";

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
    listar: async (): Promise<Tarea[]> => {
        const response = await api.get('/api/tarea/listarTareas');
        return response.data;
    },

    crear: async (tarea: Tarea): Promise<Tarea> => {
        const response = await api.post('/api/tarea/crearTarea', tarea);
        return response.data;
    },

    actualizar: async (id: number, tarea: Tarea): Promise<Tarea> => {
        const response = await api.put(`/api/tarea/actualizarTarea/${id}`, tarea);
        return response.data;
    },

    eliminar: async (id: number): Promise<void> => {
        await api.delete(`/api/tarea/eliminarTarea/${id}`);
    },

    completar: async (id: number, completada: boolean): Promise<Tarea> => {
        const response = await api.put(`/api/tarea/completarTarea/${id}/completar?completada=${completada}`);
        return response.data;
    },

    obtenerPorId: async (id: number): Promise<Tarea> => {
        const response = await api.get(`/api/tarea/obtenerTarea/${id}`);
        return response.data;
    }
    
};