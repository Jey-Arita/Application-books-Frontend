import { Link } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const libros = [
  {
    id: 1,
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    descripcion: "Una obra maestra de la literatura que explora la vida y las luchas de la familia Buendía en el pueblo ficticio de Macondo.",
    imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/38/12/3812f54c9c10992f538ead2c95d775ed.jpg",
    favorito: true,
    calificacion: 5
  },
  {
    id: 2,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    descripcion: "Un clásico que cuenta la historia de un piloto que conoce a un joven príncipe en el desierto, lleno de enseñanzas profundas.",
    imagen: "https://15f8034cdff6595cbfa1-1dd67c28d3aade9d3442ee99310d18bd.ssl.cf3.rackcdn.com/uploaded_thumb_seo/13e84c6996c8d0e28195500d06bf00ff/El%20Principito%20-%20Antoine%20de%20Saint-Exupery_1.jpg",
    favorito: true,
    calificacion: 4
  }
];

export const FavoritosPage = () => {
  const [filteredLibros, setFilteredLibros] = useState(libros);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let result = libros;

    if (searchTerm) {
      result = result.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    }

    setFilteredLibros(result);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Mi Biblioteca de Libros Favoritos
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar libros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full py-2 px-4 rounded border border-gray-600"
            />
            <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLibros.map((libro) => (
            <Link
              key={libro.id}
              className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white"
            >
              <div className="relative">
                <img
                  src={libro.imagen}
                  alt={`Portada de ${libro.titulo}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">{libro.titulo}</h2>
                <p className="text-sm text-gray-600">{libro.autor}</p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{libro.descripcion}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <HiOutlineStar
                      key={index}
                      className={`h-5 w-5 ${
                        index < libro.calificacion
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
