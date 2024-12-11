import { useEffect } from "react";
import { useGeneroList } from "../../book/hooks";
import { FaBookOpen, FaTags } from "react-icons/fa";

export const AdministracionGenero = () => {
  const { generos, loadGenero } = useGeneroList();

  useEffect(() => {
    loadGenero();
  }, [loadGenero]);

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-2xl rounded-xl">
      <div className="flex items-center mb-6">
        <FaTags className="w-6 h-6 mr-4 text-rose-500" />
        <h1 className="text-3xl font-bold text-black">
          Gestión de Géneros Literarios
        </h1>
      </div>

      {/* Lista de Géneros */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <FaBookOpen size={24} className="mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold text-blue-800">
            Géneros Registrados
          </h2>
        </div>

        {generos.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <FaBookOpen className="mx-auto mb-4 text-gray-300" />
            <p>No hay géneros disponibles</p>
          </div>
        ) : (
          <div className="space-y-3">
            {generos.map((genero) => (
              <div
                key={genero.id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-gray-700 font-medium">
                  {genero.nombre}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contador de Géneros */}
      <div className="mt-6 flex justify-end items-center space-x-2">
        <FaBookOpen className="text-blue-500" />
        <span className="text-gray-700 font-medium">
          Total de géneros: {generos.length}
        </span>
      </div>
    </div>
  );
};
