import { useCallback, useState } from "react";
import { geGeneroList } from "../../../shared/actions/Generos/genero-list";

export const useGeneroList = () => {
  const [generos, setGeneros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadGenero = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await geGeneroList();
      setGeneros(result.data || []);
    } catch (error) {
      console.error("Error al cargar los géneros:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generos, loadGenero, isLoading };
};
