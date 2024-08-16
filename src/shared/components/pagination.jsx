import React from 'react'
import { generateid } from '../utils'

export const pagination = ({
    totalPages,
    handlePreviousPage = () => {},
    hasPreviousPage,
    setCurrentPage,
    currentPAge,
    hasNexpages = () => {},
}) => {
  return (
    <div className="flex">
      <button
        onClick={handlePreviousPage}
        // disabled={!posts?.data?.hasPreviosPage}
        className={`px-3 py-2 mx-1 font-medium bg-white text-gray-500 rounded-md ${
          !posts?.data?.hasNexpages
            ? "cursor-not-allowed"
            : "hover:bg-unah-blue hover:text-white"
        }`}
      >
        Anterior
      </button>
      {[...Array(totalPages)].map((value, index) => (
        <button 
          key={generateid()}
          onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-2 mx-1 font-medium rounded-md text-gray-700 ${
          currentPAge === index + 1
          ? "bg-unah-blue text-white"
          : " hover:bg-unah-blue hover:text-white"
        }`}>
          {index + 1}
        </button>
      ))}

      <button className="px-3 py-2 mx-1 font-medium bg-white text-gray-500 rounded-md cursor-not-allowed">
        Siguiente
      </button>
    </div>
  )
}
