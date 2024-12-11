import { useEffect, useState } from "react";
import { getGenerosLibrosList } from "../../../shared/actions/Generos/genero-list";

export const useLibrosPorGenero = (generoId) => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibros = async () => {
            if (!generoId) return;  // Si no hay genero seleccionado, no hacer la llamada

            try {
                const result = await getGenerosLibrosList(generoId);
                setLibros(result.data);  
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchLibros();
    }, [generoId]);  

    return { libros, loading, error };
};

