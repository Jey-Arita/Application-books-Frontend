import { useCallback, useState } from "react";
import { getUsuario, getUsuarioById } from "../../../shared/actions/usuario/usuario";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsuarios = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getUsuario();
      setUsuarios(result.data); 
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectUsuario = (usuario) => {
    setSelectedUsuario(usuario);
  };

  return {
    usuarios,
    selectedUsuario,
    isLoading,
    loadUsuarios,
    selectUsuario,
  };
};