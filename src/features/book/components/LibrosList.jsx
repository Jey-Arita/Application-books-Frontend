import React, { useEffect } from "react";
import { useInicio } from "../hooks/index";
import LibroListItem from "./LibroListItem"; // Importa el nuevo componente

export const LibrosList = () => {
  const { libros, loadLibros, isLoading } = useInicio();

  useEffect(() => {
    loadLibros("", 1);
    console.log(libros);
  }, [loadLibros]);

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : libros?.data?.items?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
          {libros.data.items.map((libro) => (
            <LibroListItem key={libro.idlibro} libro={libro} />
          ))}
        </div>
      ) : (
        <p>No hay libros disponibles</p>
      )}
    </div>
  );
};

export default LibrosList;

