import { appApi } from "../../../config/api/appApi.Js";

export const getAutorById = async (idAutor) => {
    try {
        const { data } = await appApi.get(`/autor/${idAutor}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const getAutor = async () => {
    try {
        const { data } = await appApi.get('/autor');
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};