import { useState, useEffect } from 'react';
import { getBookDetalles } from '../../../shared/actions/libros/libro'; // Asegúrate de que la ruta sea correcta

export const useBookDetalles = (idLibro) => {
    const [bookDetalles, setBookDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getBookDetalles(idLibro);
                setBookDetails(result);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (idLibro) {
            fetchBookDetails();
        }
    }, [idLibro]);

    return { bookDetalles, isLoading, error };
};
