import { appApi } from "../../../config/api/appApi.Js";

export const getBooksList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await appApi.get(`/libros/?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}