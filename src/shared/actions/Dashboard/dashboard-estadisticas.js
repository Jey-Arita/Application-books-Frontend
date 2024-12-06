import { appApi } from "../../../config/api/appApi.Js";

export const getDashboardTotales = async () => {
    try {
        const {data} = await appApi.get(`/estadistica/totales`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}