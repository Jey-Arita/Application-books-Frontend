import { useState, useEffect } from "react";
import { getBookDetalles } from "../../../shared/actions/libros/libro";

export const useLibros = (id) => {
    const [libro, setLibro] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const loadLibro = async () => {
                setIsLoading(true);
                try {
                    const result = await getBookDetalles(id);
                    setLibro(result.data);
                } catch (error) {
                    console.error("Error al cargar el libro:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            loadLibro();
        }
    }, [id]); // Dependencia en 'id' para recargar cuando cambie.

    return {
        libro,
        isLoading,
    };
};