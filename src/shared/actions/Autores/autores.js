import { appApi } from "../../../config/api/appApi.Js";

export const getAutorById = async (id) => {
    try {
        const { data } = await appApi.get(`/autor/${id}`);
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