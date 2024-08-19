import { appApi } from "../../../config/api/appApi"
export const getBookDetalles = async (id) => {
    if (!id) {
        console.error("ID del libro no proporcionado");
        return;
    }
    try {
        const response = await appApi.get(`/libros/${id}`);
        return response.data;
        
    } catch (error) {
        console.error("Error al obtener los detalles del libro:", error.response?.data || error.message);
        throw error;
    }
};
