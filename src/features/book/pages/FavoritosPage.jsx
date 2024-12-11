import { Link } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Loading } from "../../../shared/components";
import { useFavoritoList } from "../hooks";


export const FavoritosPage = () => {
  const [filteredLibros, setFilteredLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { favoritos, isLoading } = useFavoritoList();

  
  useEffect(() => {
    let result = favoritos;
    if (searchTerm) {
      result = result.filter((favorito) =>
        favorito.libro.data && favorito.libro.data.titulo
      ? favorito.libro.data.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      : false
      );
    }
    setFilteredLibros(result);
  }, [searchTerm, favoritos]);

  if (isLoading) {
    return <Loading/>;
  }
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
          {filteredLibros.map((favorito) => (
            <Link
            to={`/inicio/libro/${favorito.libro.data.id}`}
              key={favorito.id}
              className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white"
            >
              <div className="relative">
                <img
                  src={favorito.libro.data.urlImg}
                  alt={`Portada de ${favorito.libro.data.titulo}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">{favorito.libro.data.titulo}</h2>
                <p className="text-sm text-gray-600">{favorito.libro.data.autor}</p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{favorito.libro.data.descripcion}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <HiOutlineStar
                      key={index}
                      className={`h-5 w-5 ${index < favorito.libro.data.promedio ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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