import React, { useEffect, useState } from "react";
import { useInicio } from "../hooks/index";
import LibroListItem from "./LibroListItem";
import { Pagination } from "../../../shared/components/pagination"; // Asegúrate de que la ruta sea correcta
import { LibroListSkeleton } from "./ListSkeleton";

export const LibrosList = () => {
  const { libros, loadLibros, isLoading } = useInicio();
  const [currentPage, setCurrentPage] = useState(1);

  // Cargar libros solo cuando cambia la página o cuando es la primera carga
  useEffect(() => {
    loadLibros('', currentPage);
  }, [currentPage, loadLibros]);

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

  return (
    <div>
      {isLoading ? (
        <LibroListSkeleton/>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
            {libros?.data?.items?.length ? (
              libros.data.items.map(libro => (
                <LibroListItem key={libro.idlibro} libro={libro} />
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
