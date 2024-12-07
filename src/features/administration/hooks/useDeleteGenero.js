import { useState } from "react";
import { deleteGenero } from "../../../shared/actions/Generos/genero";


export const useDeleteGenero = () => {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [error, setError] = useState(null);
  
    const eliminarGenero = async (id) => {
      setIsLoadingDelete(true);
      setError(null);
      try {
        await deleteGenero(id);
        setIsLoadingDelete(false);
        return true; 
      } catch (err) {
        setError("Error al eliminar el libro");
        setIsLoadingDelete(false);
        return false; 
      }
    };
  
    return { eliminarGenero, isLoadingDelete, error };
  };

