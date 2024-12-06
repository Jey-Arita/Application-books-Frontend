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
      return true; 
    } catch (err) {
      setError("Error al eliminar el autor");
      setIsLoading(false);
      return false; 
    }
  };

  return { eliminarAutor, isLoading, error };
};
