import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { useLibro } from "../hooks/useLibro";
import { useAutor } from "../hooks";


export const LibroPage = () => {
  const { id } = useParams(); // Obtén el id de la URL
  const { libro, isLoading, loadLibro } = useLibro(id); // Usa el hook personalizado
  const {autor, isLoading: isLoadingAutor, loadAutor } = useAutor(libro?.idAutor)

  const [isFavorito, setIsFavorito] = useState(false);
  const [ratio, setRatio] = useState(0);

  // Cargar los detalles del libro al montar el componente
  useEffect(() => {
    if (id) {
      loadLibro(id);
    }
  }, [id]);

useEffect(() => {
  if(libro?.idAutor){
    loadAutor(libro.idAutor);
  }
},[libro]);

  const handleFavoritoClick = () => {
    setIsFavorito(!isFavorito);
  };

  // Manejador para calificar el libro
  const handleLibroRatio = (newRatio) => {
    setRatio(newRatio);
  };

  if (isLoading || isLoadingAutor) {
    return <p>Cargando detalles del libro...</p>;
  }

  if (!libro) {
    return <p>No se encontraron detalles para este libro.</p>;
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={libro.urlImg}
            alt={libro.titulo}
            width={400}
            height={600}
            className="w-full h-auto rounded-lg border border-gray-300 shadow-lg"
            style={{ aspectRatio: "400/600", objectFit: "cover" }}
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{libro.titulo}</h1>
            <div className="mt-2 text-gray-600">Genero: {libro.genero}</div>
          </div>
          <div className="prose max-w-none text-gray-800">
            <p>{libro.descripcion}</p>
            <div className="grid gap-2 py-4">
              <h2 className="text-3xl font-bold text-blue-600">Autor</h2>
              {autor ? (
                <Link
                to={`/autor/${libro.idAutor}`}
                className="font-semibold text-gray-600 hover:text-rose-500"
              >
                {autor.nombreAutor}
              </Link>
              ) : (
                <p>No se encontró el autor</p>
              )}
            </div>
          </div>
          <div className="mt-1 flex flex-col sm:flex-row sm:gap-3">
            <Link
              to={libro.urlPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Leer Libro en Nueva Pestaña
            </Link>
            <button
              type="button"
              className={`flex items-center h-9 mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 transition-colors duration-200 ${
                isFavorito ? "text-rose-500" : ""
              }`}
              onClick={handleFavoritoClick}
            >
              <BsHeart
                className={`w-4 h-4 mr-2 transition-transform duration-200 transform hover:scale-125 ${
                  isFavorito ? "fill-current text-rose-500" : ""
                }`}
              />
              {isFavorito ? "Favorito" : "Agregar a Favoritos"}
            </button>
          </div>
          {/* Sección para calificar el libro */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Calificar Libro
            </h2>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <HiOutlineStar
                  key={i}
                  className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                    i < ratio ? "text-yellow-500 scale-125" : "text-gray-300"
                  }`}
                  onClick={() => handleLibroRatio(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-12 border-t border-gray-300" /> 
    </div>
  );
};
