import { useCallback, useState } from "react";
import { getAutorById, getAutor } from "../../../shared/actions/Autores/autores";

export const useAutor = (idAutor) => {
    const [autor, setAutor] = useState(null);
    const [autores, setAutores] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);


    const loadAutor = useCallback(async () => {
        if (!idAutor) return;

        setIsLoading(true);
        const result = await getAutorById(idAutor);
        setAutor(result.data);
        setIsLoading(false);
    }, [idAutor]);


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

