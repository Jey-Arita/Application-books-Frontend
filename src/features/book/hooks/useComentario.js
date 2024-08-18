import { useState } from "react";
import { getComentarioList } from "../../../shared/actions/comentarios/comentarios";

export const useComentario = (id) => {
    const [comentario, setComentario] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadComentario = async (id) => {
        setIsLoading(true);
        const result = await getComentarioList(id);
        setComentario(result.data);
        setIsLoading(false);
    }
    return{
        //Properties
        comentario,
        isLoading,
        //Methods
        loadComentario,
    }
}

