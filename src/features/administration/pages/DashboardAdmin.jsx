import { useEffect, useState } from "react";
import { FaIdBadge, FaTags, FaUser, FaUsers } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useLibrosPopulares } from "../hooks/useLibrosPopulares";
import { useGeneroList } from "../../book/hooks";
import { Estadisticas } from "../components";

export const DashboardAdmin = () => {
  const { librosPopulares } = useLibrosPopulares();
  const { generos, loadGenero } = useGeneroList();
  const [generosMap, setGenerosMap] = useState({});

  useEffect(() => {
    loadGenero();
  }, []);

  useEffect(() => {
    // Crea un mapa de id a nombre de genero
    const generoMap = generos.reduce((map, genero) => {
      map[genero.id] = genero.nombre;
      return map;
    }, {});
    setGenerosMap(generoMap);
  }, [generos]);

  return (
    <div className="container bg-gray-50 min-h-screen p-8">
      <div className="mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Panel de Administración
          </h1>
        </div>

        {/* Estadísticas */}
        <Estadisticas/>

        {/* Sección de Detalles */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Membresías */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Distribución de Membresías
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <AiFillStar className="text-2xl mr-4 text-yellow-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Premium
                    </div>
                    <div className="text-sm text-gray-500">3,500</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-yellow-500"
                      style={{
                        width: `${(3500 / (3500 + 2100 + 800 + 150)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaIdBadge className="text-2xl mr-4 text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Prueba
                    </div>
                    <div className="text-sm text-gray-500">2,100</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{
                        width: `${(2100 / (3500 + 2100 + 800 + 150)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-2xl mr-4 text-purple-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Gratis
                    </div>
                    <div className="text-sm text-gray-500">800</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-purple-500"
                      style={{
                        width: `${(800 / (3500 + 2100 + 800)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              Total de membresías: {(3500 + 2100 + 800).toLocaleString()}
            </p>
          </div>

          {/* Libros Populares */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Libros Más Populares
            </h2>
            {librosPopulares.slice(0, 5).map((libro) => (
              <div key={libro.id} className="mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={libro.urlImg}
                    alt={libro.titulo}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">
                      {libro.titulo}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Género: {generosMap[libro.idGenero]}
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha de Creación:{" "}
                      {new Date(libro.fechaCreacion).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Promedio: {libro.promedio}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="h-2.5 rounded-full bg-blue-500"
                    style={{ width: `${libro.promedio}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
