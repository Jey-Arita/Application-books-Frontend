import { useState } from "react";
import { getBookDetalles } from "../../../shared/actions/libros/libro";

export const useLibro = (id) => {
    const [libro, setLibro] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadLibro = async (id) => {
        setIsLoading(true);
        const result = await getBookDetalles(id);
        setLibro(result.data);
        setIsLoading(false);
    }
    return{
        //Properties
        libro,
        isLoading,
        //Methods
        loadLibro,
    }
}

