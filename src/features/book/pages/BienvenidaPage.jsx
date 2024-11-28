import { Link } from "react-router-dom"
import { Barra, FondoLibro } from "../components"

export const BienvenidaPage = () => {
  return (
    <div className="min-h-screen w-full bg-fixed bg-cover bg-center">
        <FondoLibro/>
      {/* Sección de bienvenida */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Bienvenido al Mundo de los Libros
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 drop-shadow-md">
            Descubre historias que transformarán tu imaginación
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white/10 text-white hover:bg-white/20 border border-white px-4 py-2 rounded-md">
              <Link to="/security/login">Iniciar Sesión</Link>
            </button>
            <button className="bg-white/10 text-white hover:bg-white/20 border border-white px-4 py-2 rounded-md">
              <Link to="/security/registro">Crear Cuenta</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Sección de libros destacados */}
      <section className="relative z-10 py-16 bg-black/70">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Libros Destacados</h2>
          <Barra />
        </div>
      </section>
    </div>
  )
}
