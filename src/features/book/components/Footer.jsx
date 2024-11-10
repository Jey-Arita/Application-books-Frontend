import { useState } from "react";
import { Link } from "react-router-dom"

export const Footer = () => {
  const [year] = useState(new Date().getFullYear()); 
    return(
        <footer className="bg-gradient-to-br from-gray-600 to-blue-600 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-lg font-semibold">BibliotecaVIP</h4>
              <p className="text-sm mt-1">
                &copy; {year} Biblioteca VIP. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
}
