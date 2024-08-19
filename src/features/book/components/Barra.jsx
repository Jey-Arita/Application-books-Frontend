import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLibroDestacado } from "../hooks/index";

export const Barra = () => {
  const scrollRef = useRef(null);
  const { libros, loadLibros, isLoading } = useLibroDestacado();

  useEffect(() => {
    loadLibros("", 1);
  }, [loadLibros]);

  useEffect(() => {
    if (libros) {
    }
  }, [libros]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

const librosOrdenados = libros?.data?.slice().sort((a, b) => {
  return (b.promedio || 0) - (a.promedio || 0);
})?.slice(0, 15);

  useEffect(() => {
    if (librosOrdenados) {
    }
  }, [librosOrdenados]);

  return (
    <div className="py-4">
      <div className="py-3">
        <h1 className="text-3xl font-bold text-blue-600">Libros destacados</h1>
      </div>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-rose-500 p-2 rounded-full shadow-md z-10 hover:bg-rose-500"
        >
          <FaArrowLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            <p>Cargando...</p>
          ) : librosOrdenados?.length ? (
            librosOrdenados.map((libro, index) => (
              <Link
                key={index}
                to={`/inicio/libro/${libro.idlibro}`}
                className="flex-none w-60 group relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={libro.urlImg}
                  alt={libro.titulo}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                  <div className="text-white font-bold text-xl">{libro.titulo}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>No hay libros disponibles</p>
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-rose-500 p-2 rounded-full shadow-md z-10 hover:bg-rose-500"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
