import { useState } from "react";
import { enviarCalificacion } from "../../../shared/actions/Calificacion/calificacion";

export const useCalificarLibro = (libroIdInicial = '') => {
  const [ratio, setRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLibroRatio = async (newRatio, libroId = libroIdInicial) => {
    setIsLoading(true);
    setError(null);
    setRatio(newRatio);

    const dtoCalificacion = {
      idLibro: libroId || '',
      puntuacion: newRatio,
    };

    try {
      await enviarCalificacion(dtoCalificacion);
      console.log("Calificación enviada exitosamente");
    } catch (err) {
      setError(err);
      console.error("Error al enviar la calificación", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ratio,
    isLoading,
    error,
    handleLibroRatio,
  };
};
