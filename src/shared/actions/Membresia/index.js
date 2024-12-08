import { appApi } from "../../../config/api/appApi";

export const getMembresia = async () => {
  try {
      const { data } = await appApi.get('/membresia');
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};

export const postMembresia = async (form) => {
  try {
      const { data } = await appApi.post(`/membresia`, form);
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};

export const putMembresia = async (id) => {
  try {
      const { data } = await appApi.put(`/membresia`);
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};
