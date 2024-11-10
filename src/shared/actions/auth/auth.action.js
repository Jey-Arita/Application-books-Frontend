import { appApi } from "../../../config/api/appApi";

export const loginAsync = async (form) => {
    try {
        const {data} = await appApi.post('/auth/login', form);
        return data;
    } catch (error) {
        console.error({...error});
        return error?.response?.data;
    }
}