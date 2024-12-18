import { useState } from "react";
import { putAutor } from "../../../shared/actions/Autores/autores";

export const useEditAutor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editarAutor = async (id, form) => {
    setIsLoading(true);
    setError(null);
    try {
      await putAutor(id, form);
      setIsLoading(false);
      return true; 
    } catch (err) {
      setError("Error al editar el autor");
      setIsLoading(false);
      return false; 
    }
  };

  return { editarAutor, isLoading, error };
};
