
import { useState } from "react";
import { getComentarioList, addComentario } from "../../../shared/actions/comentarios/comentarios";

export const useComentario = (id) => {
  const [comentario, setComentario] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComentario = async (id) => {
    setIsLoading(true);
    setError(null); // Limpiar errores antes de cargar nuevos datos
      const result = await getComentarioList(id);
        setComentario(result.data);
        setError(result.message || 'Error al cargar comentarios');
      setIsLoading(false);

  };

  const sendComentario = async (newComentario) => {
    setIsLoading(true);
    setError(null); // Limpiar errores antes de enviar el comentario
    try {
      const result = await addComentario(newComentario);
      if (result.status === 201) {
        setComentario((prevComentarios) => [...prevComentarios, result.data]);
      } else {
        setError(result.message || 'Error al enviar comentario');
      }
      return result;
    } catch (err) {
      setError('Error de red');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    comentario,
    isLoading,
    error,
    loadComentario,
    sendComentario,
  };
};