import { useCallback, useEffect, useState } from "react";
import { getFavoritosList } from "../../../shared/actions/favoritos/favorito";
import { getBookDetalles } from "../../../shared/actions/libros/libro";

export const useFavoritoList = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavoritos = useCallback(async () => {
    setIsLoading(true);
    try {
        const result = await getFavoritosList(); // Obtener la lista de favoritos
        const favoritosConLibros = await Promise.all(
          result.data.map(async (favorito) => {
            const libro = await getBookDetalles(favorito.idLibro); // Obtener el libro completo por su ID
            return { ...favorito, libro }; 
        })
    );
    console.log(favoritosConLibros); 
    setFavoritos(favoritosConLibros); 
    } catch (error) {
      console.error("Error al cargar los géneros:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavoritos();
  }, [loadFavoritos]);

  return { favoritos, isLoading };
};
