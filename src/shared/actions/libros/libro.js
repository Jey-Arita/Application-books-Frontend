import { appApi } from "../../../config/api/appApi";

export const getBookDetalles = async (id) => {
  if (!id) {
    console.error("ID del libro no proporcionado");
    return;
  }
  try {
    const response = await appApi.get(`/libros/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los detalles del libro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postLibro = async (form) => {
  try {
      const { data } = await appApi.post('/libros', form);
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};

export const putLibro = async (id, form) => {
  try {
      const { data } = await appApi.put(`/libros/${id}`, form);
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};

export const deleteLibro = async (id) => {
  try {
      const { data } = await appApi.delete(`/libros/${id}`);
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};
