import React, { useEffect, useState } from "react";
import { useInicio } from "../hooks/index";
import LibroListItem from "./LibroListItem";
import { Pagination } from "../../../shared/components/pagination"; // Asegúrate de que la ruta sea correcta
import { LibroListSkeleton } from "./ListSkeleton";
import { CiSearch } from "react-icons/ci";

export const LibrosList = () => {
  const { libros, loadLibros, isLoading } = useInicio();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar libros cuando cambia la página o el término de búsqueda
  useEffect(() => {
    loadLibros(searchTerm, currentPage);
  }, [currentPage, searchTerm, loadLibros]);

  // Manejo de páginas anterior y siguiente
  const handlePreviousPage = () => {
    if (libros.data.hasPreviousPage) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (libros.data.hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
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
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center relative mb-6 md:mb-8 text-gray-900">
          <div className="relative flex-1">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="search"
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
      {isLoading ? (
        <LibroListSkeleton/>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
            {libros?.data?.items?.length ? (
              libros.data.items.map(libro => (
                <LibroListItem key={libro.id} libro={libro} />
              ))
            ) : (
              <p>No hay libros disponibles</p>
            )}
          </div>
          {/* Paginación */}
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
      )}
    </div>
  );
};
