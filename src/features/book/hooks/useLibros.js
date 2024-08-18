import { useState, useCallback } from "react";
import { getBooksList } from "../../../shared/actions/libros/libros";

export const useInicio = () => {
  const [libros, setLibros] = useState({ data: { items: [] } });
  const [isLoading, setIsLoading] = useState(false);

  const loadLibros = useCallback(async (searchTerm = '', page = 1) => {
    setIsLoading(true);
    try {
      const result = await getBooksList(searchTerm, page);
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
