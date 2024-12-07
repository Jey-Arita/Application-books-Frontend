import { api } from "../../utils/api"; // Configura aquí tu función para realizar llamadas a tu servidor

export const agregarAFavoritos = async (data) => {
  try {
    const response = await api.post("/favoritos", data);
    return response.data; // Devuelve la respuesta de la llamada
  } catch (error) {
    console.error("Error en la solicitud para agregar a favoritos", error);
    return { status: false };
  }
};
