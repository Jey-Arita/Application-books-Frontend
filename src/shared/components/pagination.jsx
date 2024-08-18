import React from 'react';

export const Pagination = ({
  totalPages,
  handlePreviousPage,
  hasPreviousPage,
  handleCurrentPage,
  currentPage,
  handleNextPage,
  hasNextPage
}) => {
  const generatePageNumbers = () => {
    // Generar números de páginas basados en totalPages
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`px-3 py-2 font-medium bg-gray-200 text-gray-600 rounded-md ${
          !hasPreviousPage ? "cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        Anterior
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handleCurrentPage(pageNumber)}
          className={`px-3 py-2 font-medium rounded-md text-gray-800 ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`px-3 py-2 font-medium bg-gray-200 text-gray-600 rounded-md ${
          !hasNextPage ? "cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};
