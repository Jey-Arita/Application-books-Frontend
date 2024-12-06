import { useState } from "react";
import { deleteLibro } from "../../../shared/actions/libros/libro";

export const useDeleteLibro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const eliminarLibro = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteLibro(id);
      setIsLoading(false);
      return true; 
    } catch (err) {
      setError("Error al eliminar el libro");
      setIsLoading(false);
      return false; 
    }
  };

  return { eliminarLibro, isLoading, error };
};
