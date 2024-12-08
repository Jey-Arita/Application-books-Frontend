import { create } from "zustand";
import { postMembresia } from "../../../shared/actions/Membresia";

export const useMembresiaStore = create((set) => ({
  membresia: null,
  loading: false,
  success: null,
  error: null,
  message: "",
  addMembresia: async (form) => {
    set({ loading: true, success: null, error: null, message: "" });
    try {
      const newMembresia = await postMembresia(form);
      set({
        membresia: newMembresia,
        loading: false,
        success: "La Membresía agregada exitosamente.",
        error: null,
      });

      return newMembresia;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.errors || 
                           error.message || 
                           "Hubo un error al agregar la membresía";
      set({
        loading: false,
        success: null,
        error: errorMessage,
      });

      // Relanzar el error para que pueda ser capturado en el componente
      throw error;
    }
  },
}));