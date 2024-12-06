import { create } from "zustand";
import { postLibro } from "../../../shared/actions/libros/libro";

export const useLibrosStore = create((set) => ({
  libro: null,
  loading: false,
  success: null,
  error: null,
  message: "",
  addLibro: async (form) => {
    set({ loading: true, success: null, error: null, message: ""});
    try {
      const newLibro = await postLibro(form);
      set({
        libro: newLibro,
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
