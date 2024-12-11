import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLibroDestacado } from "../hooks/index";
import { ProtectedLink } from "../../../shared/components";

export const Barra = () => {
  const scrollRef = useRef(null);
  const { libros, loadLibros, isLoading } = useLibroDestacado();
  const [autoScroll, setAutoScroll] = useState(true); 

  useEffect(() => {
    loadLibros("", 1);
  }, [loadLibros]);

  useEffect(() => {
    if (libros) {
    }
  }, [libros]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  const librosOrdenados = libros?.data
    ?.slice()
    .sort((a, b) => {
      return (b.promedio || 0) - (a.promedio || 0);
    })
    ?.slice(0, 15);

  useEffect(() => {
    if (librosOrdenados) {
    }
  }, [librosOrdenados]);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const interval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  
        // Si hemos llegado al final, vuelve al principio después de un pequeño retraso
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
  
          setTimeout(() => {
            scrollRef.current.scrollBy({ left: 3, behavior: "smooth" });
          }, 500);  
        } 
        // Si estamos al principio, mueve hacia la derecha
        else if (scrollLeft === 0) {
          scrollRef.current.scrollBy({ left: 3, behavior: "smooth" });
        }
        // Si estamos en algún punto intermedio, continúa moviendo hacia la derecha
        else {
          scrollRef.current.scrollBy({ left: 3, behavior: "smooth" });
        }
      }, 100);
  
      return () => clearInterval(interval);  // Limpia el intervalo cuando el componente se desmonte
    }
  }, [autoScroll]);
  

  // Maneja el evento cuando el mouse entra en la barra
  const handleMouseEnter = () => {
    setAutoScroll(false);  
  };

  // Maneja el evento cuando el mouse sale de la barra
  const handleMouseLeave = () => {
    setAutoScroll(true); 
  };
  return (
    <div className="py-4">
      <div className="py-3"></div>
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={handleMouseEnter}  
          onMouseLeave={handleMouseLeave}
        >
          {isLoading ? (
            <p>Cargando...</p>
          ) : librosOrdenados?.length ? (
            librosOrdenados.map((libro, index) => (
              <ProtectedLink
              key={index}
              to={`/inicio/libro/${libro.id}`}>
                <div
                 
                  className="flex-none w-60 group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={libro.urlImg}
                    alt={libro.titulo}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    style={{ aspectRatio: "3/4", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                    <div className="text-white font-bold text-xl">
                      {libro.titulo}
                    </div>
                  </div>
                </div>
              </ProtectedLink>
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
