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
export const verificarFavorito = async (data) => {
  try {
    const response = await appApi.post("listafavoritos/verificar", data);
    return response.data; // Devuelve la información de si es favorito o no
  } catch (error) {
    console.error("Error al verificar los favoritos", error);
    return { data: false };
  }
};