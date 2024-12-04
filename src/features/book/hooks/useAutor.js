import { useCallback, useState } from "react";
import { getAutorById, getAutor } from "../../../shared/actions/Autores/autores";

export const useAutor = (id) => {
    const [autor, setAutor] = useState(null);
    const [autores, setAutores] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);


    const loadAutor = useCallback(async () => {
        if (!id) return;

        setIsLoading(true);
        const result = await getAutorById(id);
        setAutor(result.data);
        setIsLoading(false);
    }, [id]);


    const loadAutores = useCallback(async () => {
        setIsLoading(true);
        const result = await getAutor();
        setAutores(result.data);
        setIsLoading(false);
    }, []);

    return {
        autor,
        autores,
        isLoading,
        loadAutor,
        loadAutores,
    };
};

