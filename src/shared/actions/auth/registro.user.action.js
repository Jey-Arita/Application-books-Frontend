import { appApi } from "../../../config/api/appApi";

export const registroAsync = async (form) => {
    try {
        const {data} = await appApi.post('/auth/register', form);
        return data;
    } catch (error) {
        console.error({...error});
        return error?.response?.data;
    }
}