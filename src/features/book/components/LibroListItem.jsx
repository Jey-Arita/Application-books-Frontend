import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineStar } from "react-icons/hi";

const LibroListItem = ({ libro }) => {
  const estrellasLlenas = Math.floor(libro.promedio);
  const estrellas = Array(estrellasLlenas).fill(0);

  return (
    <div
      key={libro.idlibro}
      className="group relative rounded-lg border p-4 shadow-md bg-white border-gray-300"
    >
      <Link to={`/inicio/libro/${libro.idlibro}`} className="absolute inset-0 z-10"></Link>
      <div className="flex h-40 items-center justify-center">
        <img
          src={libro.urlImg}
          alt={libro.titulo}
          className="max-h-full max-w-full rounded-md object-contain"
          style={{ aspectRatio: "160/240", objectFit: "cover" }}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {libro.titulo}
        </h3>
        <div className="flex items-center">
          {estrellas.map((_, index) => (
            <HiOutlineStar key={index} className="w-6 h-6 text-yellow-500" />
          ))}
        </div>
      </div>
      <div className="absolute top-2 right-2 hidden group-hover:flex">
        <button className="text-rose-500" size="icon">
          <FaPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default LibroListItem;