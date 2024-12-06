import { useCallback, useState } from "react";
import { getDashboardTotales } from "../../../shared/actions/Dashboard/dashboard-estadisticas";

export const useDashboardTotales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);

  const loadDashboardTotales = useCallback(async () => {
    setIsLoading(true);
    const result = await getDashboardTotales();
    setTotal(result.data);
    setIsLoading(false);
}, []);

  return { loadDashboardTotales, total, isLoading };
};
