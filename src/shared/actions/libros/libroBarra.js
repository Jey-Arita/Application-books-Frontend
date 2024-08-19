import { appApi } from "../../../config/api/appApi.Js";

export const getLibroBarra = async () => {
    try {
        const {data} = await appApi.get(`/libros/destacados`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}