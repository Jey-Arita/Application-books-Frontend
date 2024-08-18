import { useState, useEffect } from "react";
import { useUsuarios } from "../hooks";
import { formatoTiempo, generateid } from "../../../shared/utils";

export const UsuarioPages = () => {
  const { usuarios, selectedUsuario, isLoading, loadUsuarios, selectUsuario } = useUsuarios();
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios]);

  const handleLogout = () => {
    selectUsuario(null); 
    setEmailInput(""); 
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {selectedUsuario ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-lg font-semibold text-white">
              {selectedUsuario.nombreUsuario[0]}
              {selectedUsuario.nombreUsuario.split(" ")[1][0]}
            </div>
            <div className="grid gap-1">
              <div className="font-semibold text-gray-800 text-xl">
                {selectedUsuario.nombreUsuario}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedUsuario.membresia[0].activaMembresia
                  ? "bg-green-500 text-green-50"
                  : "bg-red-500 text-red-50"
              }`}
            >
              {selectedUsuario.membresia[0].activaMembresia ? "Activo" : "Inactivo"}
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <div>
              La membresía expira el{" "}
              <span className="font-semibold">{formatoTiempo(selectedUsuario.membresia[0].fechaFin)}</span>
            </div>
            {!selectedUsuario.membresia[0].activaMembresia && (
              <div className="mt-2">
                La membresía fue cancelada el{" "}
                <span className="font-semibold">{formatoTiempo(selectedUsuario.membresia[0].fechaCancelacion)}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded shadow-lg w-full"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="font-semibold text-lg text-gray-800 mb-4">
            Seleccionar Usuario
          </div>
          <ul className="space-y-2">
            {usuarios.map((usuario) => (
              <li
                key={generateid()}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => selectUsuario(usuario)}
              >
                <div className="font-semibold text-gray-800 text-lg">
                  {usuario.nombreUsuario}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  usuario.membresia[0].activaMembresia
                    ? "bg-green-500 text-green-50"
                    : "bg-red-500 text-red-50"
                }`}>
                  {usuario.membresia[0].activaMembresia ? "Activo" : "Inactivo"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
