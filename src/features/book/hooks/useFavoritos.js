import { useState, useEffect } from "react";
import { agregarFavorito, verificarFavorito } from "../../../shared/actions/favoritos/favorito";

export const useFavorito = (idLibro) => {
  const [isFavorito, setIsFavorito] = useState(false); // Estado si el libro es favorito
  const [loading, setLoading] = useState(false); // Indicador de carga durante llamadas

  useEffect(() => {
    // Verificar estado inicial de si el libro ya es favorito
    const checkFavoritoStatus = async () => {
      setLoading(true);
      try {
        const response = await verificarFavorito({ idLibro });
        if (response?.data === true) {
          setIsFavorito(true);
        } else {
          setIsFavorito(false);
        }
      } catch (error) {
        console.error("Error al verificar el estado de favorito:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFavoritoStatus();
  }, [idLibro]);

  const toggleFavorito = async () => {
    setLoading(true);
    try {
      const response = await agregarFavorito({ idLibro });

      if (response?.statusCode === 201) {
        // Si el libro se agrega exitosamente a favoritos
        setIsFavorito(true);
      } else if (response?.statusCode === 409) {
        // Si el libro ya existía y lo quitamos de favoritos
        setIsFavorito(false);
      }
    } catch (error) {
      console.error("Error al manejar la acción de favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isFavorito, loading, toggleFavorito };
};
