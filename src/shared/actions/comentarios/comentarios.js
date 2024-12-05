import { appApi } from "../../../config/api";

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

export const deleteComentario = async (id) => {
    try {
        const { data } = await appApi.delete(`/comentario/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};