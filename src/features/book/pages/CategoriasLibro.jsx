import { useState } from "react";
import { Link } from "react-router-dom"

export const CategoriaLibros = () => {
  const generos = [
    "Romance", 
    "Misterio", 
    "Aventura", 
    "Ciencia Ficción",
    "Fantasía", 
    "Clásicos", 
    "Thriller", 
    "Histórica",
    "Poesía", 
    "Drama", 
    "Humor", "Biografía"
  ]
  const [searchTerm, setSearchTerm] = useState("");

  if (searchTerm) {
    result = result.filter(
      (genero) =>
        genero.generos.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-blue-600">Explora los Géneros Literarios</h1>
        <p className="text-xl text-blue-500 mb-8">Descubre nuevos mundos a través de la lectura</p>
        <div className="flex justify-center max-w-md mx-auto">
        <input
              type="text"
              placeholder="Buscar genero..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full py-2 px-4 rounded border border-gray-600"
            />
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {generos.map((genero, index) => (
          <div 
            key={genero.genero}
            className={`
              p-6 rounded-lg shadow-md transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
              ${index % 2 === 0 ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'}
            `}
          >
            <h2 className="text-2xl font-semibold text-center">
              <Link to="#" className="text-rose-900 hover:text-rose-700 transition-colors duration-300">
                {genero}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}