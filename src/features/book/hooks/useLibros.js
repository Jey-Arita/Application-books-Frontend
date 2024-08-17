import { useState, useCallback } from "react";
import { getBooksList } from "../../../shared/actions/libros/libros";

export const useInicio = () => {
    const [libros, setLibros] = useState({ data: { items: [] } });
    const [isLoading, setIsLoading] = useState(false);

    const loadLibros = useCallback(async (searchTerm = '', page = 1) => {
        setIsLoading(true);
        try {
            const result = await getBooksList(searchTerm, page);
            if (JSON.stringify(result) !== JSON.stringify(libros)) {
                setLibros(result);
            }
        } catch (error) {
            console.error("Error al cargar los libros:", error);
        } finally {
            setIsLoading(false);
        }
    }, [libros]);

    return {
        libros,
        isLoading,
        loadLibros,
    };
};
