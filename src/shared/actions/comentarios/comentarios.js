import { appApi } from "../../../config/api/appApi.Js";

export const getComentarioList = async (idLibro) => {
    try {
        const {data} = await appApi.get(`/comentario/${idLibro}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}