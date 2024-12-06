import { useState } from "react";
import { putLibro } from "../../../shared/actions/libros/libro";

export const useEditLibro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editarLibro = async (id, form) => {
    setIsLoading(true);
    setError(null);
    try {
      await putLibro(id, form);
      setIsLoading(false);
      return true; 
    } catch (err) {
      setError("Error al editar el libro");
      setIsLoading(false);
      return false; 
    }
  };

  return { editarLibro, isLoading, error };
};
