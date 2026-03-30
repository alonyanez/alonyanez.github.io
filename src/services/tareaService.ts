import { api } from "./api";

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
    }
    
};