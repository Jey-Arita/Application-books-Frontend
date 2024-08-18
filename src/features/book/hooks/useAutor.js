import { useCallback, useState } from "react";
import { getAutorById } from "../../../shared/actions/Autores/autores";

export const useAutor = (idAutor) => {
    const [autor, setAutor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadAutor = useCallback(async () => {
        if (!idAutor) return;

        setIsLoading(true);
        try {
            const result = await getAutorById(idAutor);
            setAutor(result.data);
        } catch (error) {
            console.error("Error al cargar el autor:", error);
        } finally {
            setIsLoading(false);
        }
    }, [idAutor]);

    return {
        autor,
        isLoading,
        loadAutor,
    };
};
