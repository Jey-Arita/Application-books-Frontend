import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Nav } from "../components";
import { InicioPage } from "../pages/InicioPage";
import { AutorPage, FavoritosPage, LibroPage, UsuarioPages, AutoresPage, BienvenidaPage, CategoriaLibros} from "../pages";

export const AppLibrosRouter = () => {
  const location = useLocation();

  // Determina si la ruta actual es "/bienvenida" para ocultar el Nav
  const isBienvenidaPage = location.pathname === "/bienvenida";
  return (
    <div className="overflow-x-hidden from-gray-200 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
      {!isBienvenidaPage && <Nav />}
      <div className="px-6 py-8">
        <div className="container mx-auto">
          <Routes>
            <Route path="/inicio" element={<InicioPage />} />
            <Route path="/autores" element={<AutoresPage />}/>
            <Route path="/inicio/libro/:id" element={<LibroPage />} className="absolute inset-0 z-10" />
            <Route path="/autor" element={<AutorPage />} />
            <Route path="/libro" element={<LibroPage />} />
            <Route path="/autor/:id" element={<AutorPage />} />
            <Route path="/favorito" element={<FavoritosPage />} />
            <Route path="/usuario" element={<UsuarioPages />} />
            <Route path="/bienvenida" element={<BienvenidaPage/>}/>
            <Route path="/categoria" element={<CategoriaLibros/>}/>
            <Route path="/*" element={<Navigate to="/bienvenida" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

