import { useState } from "react";
import { deleteAutor } from "../../../shared/actions/Autores/autores";

export const useDeleteAutor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const eliminarAutor = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteAutor(id);
      setIsLoading(false);
      return true; // Retorna true si se eliminó con éxito
    } catch (err) {
      setError("Error al eliminar el autor");
      setIsLoading(false);
      return false; // Retorna false en caso de error
    }
  };

  return { eliminarAutor, isLoading, error };
};
