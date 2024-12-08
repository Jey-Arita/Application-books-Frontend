import { appApi } from "../../../config/api";


export const agregarAFavoritos = async (data) => {
  try {
    const response = await appApi.post("/favoritos", data);
    return response.data; // Devuelve la respuesta de la llamada
  } catch (error) {
    console.error("Error en la solicitud para agregar a favoritos", error);
    return { status: false };
  }
};
