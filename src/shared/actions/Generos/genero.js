import { appApi } from "../../../config/api";

export const postGenero = async (form) => {
    try {
        const { data } = await appApi.post('/genero', form);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
  };
  
  export const putGenero = async (id, form) => {
    try {
        const { data } = await appApi.put(`/genero/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
  };
  
  export const deleteGenero = async (id) => {
    try {
        const { data } = await appApi.delete(`/genero/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
  };