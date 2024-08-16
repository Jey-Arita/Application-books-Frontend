import { useState } from "react";
import { GetBookList } from "../../../shared/actions/libros/libros.js";

export const useInicio = () => {
    const [libros, setLibros] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadLibros = async (searchTerm, page) => {
        setIsLoading(true);
        const result = await GetBookList(searchTerm, page);
        setLibros(result);
        setIsLoading(false);
    }
    return{
        //Properties
        libros,
        isLoading,
        //Methods
        loadLibros,
    }
}