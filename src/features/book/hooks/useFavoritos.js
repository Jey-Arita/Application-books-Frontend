import { useState } from "react";
import { agregarAFavoritos } from "../../../shared/actions/favoritos/favorito";


export const useFavoritos = (idLibro) => {
  const [isFavorito, setIsFavorito] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFavorito = async () => {
    if (!idLibro) return; // Prevenir llamadas inválidas
    setLoading(true);

    try {
      const response = await agregarAFavoritos({ idLibro });
      if (response?.status) {
        setIsFavorito((prev) => !prev);
      } else {
        alert("No se pudo agregar a favoritos.");
      }
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Properties
    isFavorito,
    loading,
    // Methods
    toggleFavorito,
  };
};
