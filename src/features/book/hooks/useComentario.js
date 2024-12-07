
import { useState } from "react";
import { addComentario, deleteComentario, getComentarioList } from "../../../shared/actions/comentarios/comentarios";

export const useComentario = (idLibro) => {
  const [comentario, setComentario] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComentario = async (idLibro) => {
    setIsLoading(true);
    try {
      const result = await getComentarioList(idLibro);
      setComentario(result.data);
      return result.data;
    } catch (err) {
      setError(err.message || "Error al cargar comentarios");
      return [];
    } finally {
      setIsLoading(false); // Esto asegura que siempre se actualice al final
    }

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

  const deleteComentar = async (idComentario) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteComentario(idComentario);
    setIsLoading(false);
    return { status: result?.status ?? false };
  };

  return {
    comentario,
    isLoading,
    error,
    loadComentario,
    sendComentario,
    deleteComentar,
  };
};