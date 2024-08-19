import { useState, useCallback } from "react";
import { getLibroBarra } from "../../../shared/actions/libros/libroBarra";


export const useLibroDestacado = () => {
  const [libros, setLibros] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadLibros = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getLibroBarra();
      setLibros(result);
    } catch (error) {
      console.error("Error al cargar los libros:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencias vacías para que la función no se recree en cada renderizado

  return {
    libros,
    isLoading,
    loadLibros,
  };
};
