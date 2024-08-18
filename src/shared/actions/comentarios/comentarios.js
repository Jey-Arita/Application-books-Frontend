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


export const addComentario = async (newComentario) => {
    try {
        const { data } = await appApi.post(`/comentario`, newComentario);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};
