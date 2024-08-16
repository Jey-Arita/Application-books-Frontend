import { appApi } from "../../../config/api";

export const getPostsList = async (searchTerm = '', page = 1) => {
    try {
        const {data} = await appApi.get(`/posts?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}