import {useState } from "react";
import { getMembresia } from "../../../shared/actions/Membresia";

export const useMembresia = () => {
    const [membresia, setmembresia] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadMembresia = async () => {
        setIsLoading(true);
        const result = await getMembresia();
        setmembresia(result.data);
        setIsLoading(false);
    }
    return{
        membresia,
        isLoading,
        loadMembresia,
    }
}

