import { create } from "zustand";
import { postAutor } from "../../../shared/actions/Autores/autores";

export const useAuthStore = create((set) => ({
  autor: null,
  loading: false,
  success: null,
  error: null,
  message: "",
  addAutor: async (form) => {
    set({ loading: true, success: null, error: null, message: ""});
    try {
      const newAutor = await postAutor(form);
      set({
        autor: newAutor,
        loading: false,
        success: "Autor agregado exitosamente.",
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        success: null,
        error: "Hubo un error al agregar el autor.",
      });
      console.error(error);
    }
  },
}));
