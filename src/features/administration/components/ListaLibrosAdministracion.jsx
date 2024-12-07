import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "../../../shared/components/pagination";
import { useAutor, useGeneroList, useInicio } from "../../book/hooks";
import { formatoTiempo } from "../../../shared/utils/formatoTiempo";

export const ListaLibrosAdministracion = ({ onEditLibro, onDeleteLibro }) => {
  const { libros, loadLibros, isLoading } = useInicio(); // lo tomamos para listar los libros
  const [currentPage, setCurrentPage] = useState(1);
  const { generos, loadGenero } = useGeneroList();
  const [generosMap, setGenerosMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { autores, loadAutores } = useAutor();
  const [autoresMap, setAutoresMap] = useState({});

  useEffect(() => {
    loadGenero();
    loadAutores();
  }, []);

  useEffect(() => {
    // Crea un mapa de ID a nombre de  autor
    const autorMap = autores.reduce((map, autor) => {
      map[autor.id] = autor.nombreAutor;
      return map;
    }, {});
    setAutoresMap(autorMap);
  }, [autores]);

  useEffect(() => {
    // Crea un mapa de ID a nombre de genero
    const generoMap = generos.reduce((map, genero) => {
      map[genero.id] = genero.nombre;
      return map;
    }, {});
    setGenerosMap(generoMap);
  }, [generos]);

  useEffect(() => {
    loadLibros(searchTerm, currentPage);
  }, [loadLibros, searchTerm, currentPage]);

  // Manejo de páginas anterior y siguiente
  const handlePreviousPage = () => {
    if (libros.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (libros.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  // Manejo del envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reinicia a la primera página cuando se realiza una búsqueda
    loadLibros(searchTerm, 1); // Recarga los libros con el término de búsqueda
  };

  return (
    <div>
      {/* Campo de búsqueda */}
      <div className="mb-4 py-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center relative mb-6 md:mb-8 text-gray-900"
        >
          <div className="relative flex-1">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="search"
              name="libro"
              placeholder="Buscar libros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-blue-600 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
          >
            Buscar
          </button>
        </form>
      </div>
      {/* Listar los libros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          libros.data.items.map((libro) => (
            <div
              key={libro.id}
              className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-full h-36 rounded-md flex items-center justify-center overflow-hidden ">
                <img
                  src={libro.urlImg}
                  alt={libro.titulo}
                  className="w-32 h-32 max-w-xs object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {libro.titulo}
              </h2>
              <p className="text-gray-600 line-clamp-3">{libro.descripcion}</p>
              <p className="text-md text-gray-700 font-semibold">
                Autor: {autoresMap[libro.idAutor]}
              </p>
              <p className="text-md text-gray-700 font-semibold">
                Genero: {generosMap[libro.idGenero]}
              </p>
              <a
                href={libro.urlPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline mt-2 block"
              >
                Ver Libro
              </a>
              <p className="text-sm text-gray-500 mt-2">
                fecha Creación: {formatoTiempo(libro.fechaCreacion)}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => onEditLibro(libro.id)}
                  className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteLibro(libro.id)}
                  className="px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-8">
      <Pagination
        totalPages={libros.data.totalPages}
        handlePreviousPage={handlePreviousPage}
        hasPreviousPage={libros.data.hasPreviousPage}
        handleCurrentPage={setCurrentPage}
        currentPage={libros.data.currentPage}
        handleNextPage={handleNextPage}
        hasNextPage={libros.data.hasNextPage}
      />
      </div>
     
    </div>
  );
};
