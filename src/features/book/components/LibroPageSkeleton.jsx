import React from "react";
const LibroPageSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 py-14 sm:px-6 lg:px-8 bg-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen del libro */}
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg shadow-lg"></div>
          </div>
  
          <div className="grid gap-6 animate-pulse">
            {/* Título del libro */}
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            
            {/* Género del libro */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  
            {/* Estrellas */}
            <div className="flex items-center mt-2 space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
  
            {/* Descripción */}
            <div className="h-20 bg-gray-200 rounded mt-4"></div>
  
            {/* Autor */}
            <div className="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
  
            {/* Botones */}
            <div className="flex gap-3 mt-4">
              <div className="w-40 h-9 bg-blue-600 rounded"></div>
              <div className="w-40 h-9 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LibroPageSkeleton;