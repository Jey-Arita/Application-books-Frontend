import { create } from "zustand";
import { registroAsync } from "../../../shared/actions/auth/registro.user.action";

export const useRegistroStore = create((set) => ({
  isRegistered: false,
  error: false,
  message: "",
  registrar: async (form) => {
        set({ isLoading: true, error: false, message: "" });

        const { status, data, message } = await registroAsync(form);
    
        if (status) {
          set({
            isRegistered: true,
            isLoading: false,
            message: message ?? "Registro exitoso",
            error: false,
          });
          return;
        }

        set({
          isRegistered: false,
          isLoading: false,
          message: message ?? "Error en el registro",
          error: true,
        });
      },
    
      resetRegistro: () => {
        set({
          isRegistered: false,
          isLoading: false,
          message: "",
          error: false,
        });
      },
    }));