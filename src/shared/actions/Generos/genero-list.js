import { appApi } from "../../../config/api/appApi.Js";

export const geGeneroList = async () => {
    try {
        const {data} = await appApi.get(`/genero`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getGenerosLibrosList = async (generoId) => {
    try {
        const {data} = await appApi.get(`/libros/genero/${generoId}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}