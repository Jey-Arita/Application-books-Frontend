import { appApi } from "../../../config/api";

export const enviarCalificacion = async (newRatio) => {
    try {
        const { data } = await appApi.post(`/calificacion`, newRatio);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};
export const obtenerCalificacionUsuario = async (idLibro) => {
    try {
      const {data} = await appApi.get(`/calificacion/${idLibro}`);
      return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
  };