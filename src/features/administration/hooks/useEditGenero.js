import { useState } from "react";
import { putGenero } from "../../../shared/actions/Generos/genero";


export const useEditGenero = () => {
    const [isLoadingEdit, setLoadingEdit] = useState(false);
    const [error, setError] = useState(null);
  
    const editarGenero = async (id, form) => {
      setLoadingEdit(true);
      setError(null);
      try {
        await putGenero(id, form);
        setLoadingEdit(false);
        return true; 
      } catch (err) {
        setError("Error al editar el autor");
        setLoadingEdit(false);
        return false; 
      }
    };
  
    return { editarGenero, isLoadingEdit, error };
  };