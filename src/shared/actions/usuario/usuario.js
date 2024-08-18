import { appApi } from "../../../config/api/appApi";

export const getUsuario = async () => {
    try {
        const {data} = await appApi.get('/usuarios')
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};