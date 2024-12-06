import { useEffect, useState } from "react";
import { getLibroBarra } from "../../../shared/actions/libros/libroBarra";

export const useLibrosPopulares = () => {
  const [librosPopulares, setLibrosPopulares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const LibrosPopulares = async () => {
      try {
        const result = await getLibroBarra();
        setLibrosPopulares(result.data);
      } catch (error) {
        console.error("Error al cargar los libros populares:", error);
      } finally {
        setIsLoading(false);
      }
    };

    LibrosPopulares();
  }, []);

  return {
    librosPopulares,
    isLoading,
  };
};
