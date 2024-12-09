import { useState, useEffect } from "react";
import { agregarFavorito, verificarFavoritos } from "../../../shared/actions/favoritos/favorito";

export const useFavorito = (idLibro) => {
  const [isFavorito, setIsFavorito] = useState(false); // Estado si el libro es favorito
  const [loading, setLoading] = useState(false); // Indicador de carga durante llamadas

  useEffect(() => {
    const verificarEstadoInicial = async () => {
      if (idLibro) {
        setLoading(true);
        try {
          const resultado = await verificarFavoritos(idLibro);
          setIsFavorito(resultado.data); // Actualiza el estado con el resultado
        } catch (error) {
          console.error("Error al verificar el estado de favorito", error);
        } finally {
          setLoading(false);
        }
      }
    };

    verificarEstadoInicial();
  }, [idLibro]);


  const toggleFavorito = async () => {
    setLoading(true);
    try {
      if (isFavorito) {
        // Si el libro ya es favorito, eliminarlo de favoritos
        const response = await agregarFavorito({ idLibro, remove: true });

        if (response?.statusCode === 200) {
          setIsFavorito(false);
        }
      } else {
        // Si no es favorito, agregarlo a favoritos
        const response = await agregarFavorito({ idLibro });

        if (response?.statusCode === 201) {
          setIsFavorito(true);
        }
      }
    } catch (error) {
      console.error("Error al manejar la acción de favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isFavorito, loading, toggleFavorito };
};
