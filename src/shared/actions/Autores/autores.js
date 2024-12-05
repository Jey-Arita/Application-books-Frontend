import { Form } from "react-router-dom";
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

export const postAutor = async (form) => {
    try {
        const { data } = await appApi.post('/autor', form);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const putAutor = async (id, form) => {
    try {
        const { data } = await appApi.put(`/autor/${id}`, form);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const deleteAutor = async (id) => {
    try {
        const { data } = await appApi.delete(`/autor/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};
