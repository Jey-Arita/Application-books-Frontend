import { useState, useEffect } from "react";
import { obtenerCalificacionUsuario, enviarCalificacion } from "../../../shared/actions/Calificacion/calificacion";

export const useCalificacion = (idLibro) => {
  const [ratio, setRatio] = useState(0); // Estrellas seleccionadas por el usuario
  const [userCalificado, setUserCalificado] = useState(false); // Nuevo estado

  useEffect(() => {
    // Cargar la calificación del usuario al cargar el libro
    const cargarCalificacionUsuario = async () => {
      try {
        const calificacion = await obtenerCalificacionUsuario(idLibro); // Llamar a la API
        if (calificacion?.data?.puntuacion) {
          setRatio(calificacion.data.puntuacion); // Ajustar las estrellas
          setUserCalificado(true); // Marcar como calificado
        }
      } catch (error) {
        console.error("Error al cargar la calificación del usuario:", error);
      }
    };

    if (idLibro) {
      cargarCalificacionUsuario();
    }
  }, [idLibro]);

  const enviarNuevaCalificacion = async (newRatio) => {
    if (userCalificado) {
      alert("Ya has calificado este libro.");
      return;
    }

    setRatio(newRatio);

    const dtoCalificacion = {
      idLibro,
      puntuacion: newRatio,
    };

    try {
      await enviarCalificacion(dtoCalificacion);
      console.log("Calificación enviada exitosamente");
      setUserCalificado(true); // Marcar como calificado tras enviar
    } catch (err) {
      console.error("Error al enviar la calificación", err);
    }
  };

  return {
    ratio,
    userCalificado,
    enviarNuevaCalificacion,
  };
};