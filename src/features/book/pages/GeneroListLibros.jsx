import { FiAlertCircle } from "react-icons/fi";
import { useLibrosPorGenero } from "../hooks";
import { Link, useParams } from "react-router-dom";
import { BiBook } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import { LuLoader2 } from "react-icons/lu";
import { HiOutlineStar } from "react-icons/hi";

export const GeneroListLibros = () => {
  const { id } = useParams(); // ID del género desde la URL
  const {
    libros,
    loading: loadingLibros,
    error: errorLibros,
  } = useLibrosPorGenero(id);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-slate-200 p-6 flex items-center">
          <BiBook className="mr-3 text-blue-500 text-3xl" />
          <h1 className="text-3xl font-bold text-blue-500">
            Lista de Libros por Género
          </h1>
        </div>

        <div className="p-6">
          {loadingLibros ? (
            <div className="flex items-center justify-center text-gray-600 space-x-2">
              <LuLoader2
                className="mr-2 animate-spin text-blue-600"
                size={24}
              />
              <span className="text-lg">Cargando libros...</span>
            </div>
          ) : errorLibros ? (
            <div className="flex items-center justify-center text-red-500 space-x-2">
              <FiAlertCircle className="mr-2" size={24} />
              <span className="text-lg">
                Error al cargar los libros: {errorLibros}
              </span>
            </div>
          ) : libros?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {libros.map((libro) => (
                <div
                  key={libro.id}
                  className="border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                >
                  {libro.urlImg ? (
                    <img
                      src={libro.urlImg}
                      alt={libro.titulo}
                      className="w-full h-72 object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t-xl">
                      <ImImage className="text-gray-500" size={48} />
                    </div>
                  )}

                  <div className="p-4">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {libro.titulo}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {libro.descripcion}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <HiOutlineStar
                          key={index}
                          className={`h-5 w-5 ${
                            index < libro.promedio
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <Link
                      to={`/inicio/libro/${libro.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <BiBook className="mr-2" size={20} />
                      <span>Ver libro</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              <FiAlertCircle className="mr-2" size={24} />
              <span>No hay libros para este género</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
