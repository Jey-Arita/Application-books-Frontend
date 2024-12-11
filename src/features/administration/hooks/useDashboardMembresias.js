import { useCallback, useState } from "react";
import { getMembresiaCount } from "../../../shared/actions/Membresia";

export const useDashboardMembresias = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalMembresias, setTotal] = useState(null);
  
    const loadMembresiaTotales = useCallback(async () => {
      setIsLoading(true);
      const result = await getMembresiaCount();
      setTotal(result.data);
      setIsLoading(false);
  }, []);
  
    return { loadMembresiaTotales, totalMembresias, isLoading };
}
