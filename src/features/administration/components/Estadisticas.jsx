import { useEffect } from "react";
import { useDashboardTotales } from "../hooks";
import { ImBooks } from "react-icons/im";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { FaTags, FaUsers } from "react-icons/fa";

export const Estadisticas = () => {
  const { loadDashboardTotales, total, isLoading } = useDashboardTotales();

  useEffect(() => {
    loadDashboardTotales();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {isLoading ? (
        <div className="col-span-4 text-center text-gray-500">
          Cargando estadísticas...
        </div>
      ) : total ? (
        <>
          {[
            {
              icon: <ImBooks className="text-green-500 text-3xl" />,
              label: "Total de Libros",
              value: total.totalLibros,
            },
            {
              icon: (
                <BsFileEarmarkPersonFill className="text-blue-500 text-3xl" />
              ),
              label: "Total de Autores",
              value: total.totalAutores,
            },
            {
              icon: <FaTags className="text-rose-500 text-3xl" />,
              label: "Total de Géneros",
              value: total.totalGeneros,
            },
            {
              icon: <FaUsers className="text-purple-500 text-3xl" />,
              label: "Total de Usuarios",
              value: total.totalUsuarios,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition duration-300"
            >
              <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col-span-4 text-center text-gray-500">
          No hay datos disponibles
        </div>
      )}
    </div>
  );
};
