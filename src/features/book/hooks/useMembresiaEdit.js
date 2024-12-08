import { useState } from "react";
import { putMembresia } from "../../../shared/actions/Membresia";


export const useMembresiaEdit = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const actualizarMembresia = async () => {
    setLoading(true);
    setError(null);
    try {
      await putMembresia();
      setSuccess(true);
    } catch (err) {
      setError("Error al actualizar la membresía.");
    } finally {
      setLoading(false);
    }
  };

  return { actualizarMembresia, loading, success, error };
};


