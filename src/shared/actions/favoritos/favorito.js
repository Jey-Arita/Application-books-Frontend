import { appApi } from "../../../config/api";

export const agregarFavorito = async (idLibro) => {
  try {
    const response = await appApi.post(`/listafavoritos`, idLibro);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el libro a favoritos:", error);
    throw error;
  }
};

export const eliminarFavorito = async (idLibro) => {
  try {
    const response = await appApi.delete(`/api/favoritos/${idLibro}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el libro de favoritos:", error);
    throw error;
  }
};

export const verificarFavoritos = async (idLibro) => {
  try {
    const response = await appApi.get(`/listafavoritos/is-favorito/${idLibro}`);
return response?.data || false;
  } catch (error) {
    console.error("Error al verificar el estado de favorito", error);
    return false;
  }
};

export const getFavoritosList = async () => {
  try {
      const {data} = await appApi.get(`/listafavoritos`);
      return data;
  } catch (error) {
      console.error(error);
      return error.response;
  }
}
