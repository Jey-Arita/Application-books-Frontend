import { create } from "zustand";
import { postGenero } from "../../../shared/actions/Generos/genero";

export const useGeneroStore = create((set) => ({
  genero: null,
  loading: false,
  success: null,
  error: null,
  message: "",
  addGenero: async (form) => {
    set({ loading: true, success: null, error: null, message: ""});
    try {
      const newGenero = await postGenero(form);
      set({
        genero: newGenero,
        loading: false,
        success: "El Genero agregado exitosamente.",
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        success: null,
        error: "Hubo un error al agregar el genero.",
      });
      console.error(error);
    }
  },
}));
