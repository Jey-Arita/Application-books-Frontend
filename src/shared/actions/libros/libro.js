import { appApi } from "../../../config/api/appApi.Js";

export const getBookDetalles = async (idLibro) => {
    try {
        const response = await appApi.get(`/libros/${idLibro}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los detalles del libro:", error);
        throw error;
    }
};
