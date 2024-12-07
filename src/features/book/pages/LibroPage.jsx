import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { useLibro } from "../hooks/useLibro";
import { useAutor, useGeneroList } from "../hooks";
import { useComentario } from "../hooks/useComentario";  // Importa el nuevo hook
import LibroPageSkeleton from "../components/LibroPageSkeleton";
import { Comenta } from "../components";

export const LibroPage = () => {
  const { id } = useParams(); // Obtén el id de la URL
  const { libro, isLoading, loadLibro } = useLibro(id); // Usa el hook personalizado
  const { comentarios, isLoading: isLoadingComentarios } = useComentario(id);


  const {
    autor,
    isLoading: isLoadingAutor,
    loadAutor,
  } = useAutor(libro?.idAutor);

  const [isFavorito, setIsFavorito] = useState(false);
  const [ratio, setRatio] = useState(0);

  const { generos, loadGenero } = useGeneroList();
  const [generosMap, setGenerosMap] = useState({});
  useEffect(() => {
    loadGenero();
  }, []);

  useEffect(() => {
    // Crea un mapa de ID a nombre de genero
    const generoMap = generos.reduce((map, genero) => {
      map[genero.id] = genero.nombre;
      return map;
    }, {});
    setGenerosMap(generoMap);
  }, [generos]);

  // Cargar los detalles del libro al montar el componente
  useEffect(() => {
    if (id) {
      loadLibro(id);
    }
  }, [id]);

  useEffect(() => {
    if (libro?.idAutor) {
      loadAutor(libro.idAutor);
    }
  }, [libro]);

  const handleFavoritoClick = () => {
    setIsFavorito(!isFavorito);
  };

  // Manejador para calificar el libro
  const handleLibroRatio = (newRatio) => {
    setRatio(newRatio);
  };

  if (isLoading || isLoadingAutor || isLoadingComentarios) {
    return <LibroPageSkeleton />;
  }

  if (!libro) {
    return <p>No se encontraron detalles para este libro.</p>;
  }

  const estrellasLlenas = Math.round(libro.promedio) || 0;
  const estrellas = Array(5).fill(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 sm:px-6 lg:px-8 bg-gray-100">
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
            <h1 className="text-3xl font-bold text-blue-500">{libro.titulo}</h1>
            <div className="mt-2 text-gray-600">Genero: {generosMap[libro.idGenero]}</div>
            <div className="flex items-center mt-2">
              {estrellas.map((_, index) => (
                <HiOutlineStar
                  key={index}
                  className={`w-6 h-6 ${index < estrellasLlenas ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
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
              className={`flex items-center h-9 mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 transition-colors duration-200 ${isFavorito ? "text-rose-500" : ""
                }`}
              onClick={handleFavoritoClick}
            >
              <BsHeart
                className={`w-4 h-4 mr-2 transition-transform duration-200 transform hover:scale-125 ${isFavorito ? "fill-current text-rose-500" : ""
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
                  className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${i < ratio ? "text-yellow-500 scale-125" : "text-gray-300"
                    }`}
                  onClick={() => handleLibroRatio(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-12 border-t border-gray-300" />
      {/* Sección de comentarios */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-600">Comentarios</h2>
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario.id} className="py-4 border-b border-gray-300">
                <p className="font-semibold text-gray-800">{comentario.nombreUsuario}</p>
                <p>{comentario.comentario}</p>
              </li>
            ))}
          </ul>
      </div>
      <Comenta libroId={libro.id} />
    </div>
  );
};
