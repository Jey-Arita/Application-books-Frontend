import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaHouseChimney, FaUser, FaBook } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";
import { rolesListConstant } from "../../../shared/constants";
import { RiAdminFill } from "react-icons/ri";
import { useAuthStore } from "../../security/store";
import { IoCloseCircle } from "react-icons/io5";
import { ProtectedComponent, ProtectedLink } from "../../../shared/components";

export const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    useAuthStore.setState({ user: null, isAuthenticated: false });
    navigate("/bienvenida"); // Redirige al usuario
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="px-6 py-3 bg-gradient-to-br from-gray-600 to-blue-600 shadow-md md:flex md:items-center md:justify-between fixed w-full top-0 left-0 z-50">
        <div className="flex items-center justify-between">
          {/* Botón que controla la barra lateral */}
          <button
            type="button"
            onClick={handleSidebarToggle}
            className="block text-white hover:text-rose-500 md:hidden"
          >
            <CiMenuBurger className="w-6 h-6 fill-current" />
          </button>
          <Link
            to={"/inicio"}
            className="flex items-center text-white font-semibold text-xl"
          >
            <GiBookPile className="w-8 h-8 mr-2" />
            BibliotecaVIP
          </Link>
        </div>
        {/* Enlaces para pantallas grandes */}
        <div className="hidden md:flex md:items-center">
          <Link
            to={"/inicio"}
            className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <GiBookPile className="w-8 h-8 mr-2" />
            Inicio
          </Link>
          <Link
            to="/usuario"
            className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <FaUser className="w-5 h-5 mr-2" /> Perfil
          </Link>
          <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
            <Link
              to="/admin/dashboard"
              className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              <RiAdminFill className="w-5 h-5 mr-2" /> Administración
            </Link>
          </ProtectedComponent>
          <ProtectedLink to={"/genero"}>
            <div className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors">
              <BiSolidCategory className="w-5 h-5 mr-2" /> Genero
            </div>
          </ProtectedLink>
          <ProtectedLink to={"/favorito"}>
            <div className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors">
              <MdFavorite className="w-5 h-5 mr-2" /> Favoritos
            </div>
          </ProtectedLink>
          <ProtectedLink to={"/autores"}>
            <div className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors">
              <FaBook className="w-5 h-5 mr-2" /> Autores
            </div>
          </ProtectedLink>
          <button
            onClick={cerrarSesion}
            className="flex items-center text-white px-4 py-2 hover:bg-red-500 transition-colors"
          >
            <IoCloseCircle className="w-5 h-5 mr-2" /> Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "100%" }}
      >
        <div className="h-14 border-b bg-gradient-to-br from-gray-600 to-blue-600 flex items-center px-4">
          <span className="text-lg font-semibold text-white">Menú</span>
          <button className="ml-auto" onClick={handleSidebarToggle}>
            <FaWindowClose className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="px-4 py-2">
          <Link
            to="/inicio"
            className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
          >
            <FaHouseChimney className="w-5 h-5 mr-2" /> Inicio
          </Link>
          <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
            <Link
              to="/admin/dashboard"
              className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
            >
              <RiAdminFill className="w-5 h-5 mr-2" /> Administración
            </Link>
          </ProtectedComponent>

          <Link
            to="/usuario"
            className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
          >
            <FaUser className="w-5 h-5 mr-2" /> Perfil
          </Link>
          <ProtectedLink to={"/genero"}>
            <div className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors">
              <BiSolidCategory className="w-5 h-5 mr-2" /> Genero
            </div>
          </ProtectedLink>
          <ProtectedLink to={"/favorito"}>
            <div className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors">
              <MdFavorite className="w-5 h-5 mr-2" /> Favoritos
            </div>
          </ProtectedLink>
          <ProtectedLink to={"/autores"}>
            <div className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors">
              <FaBook className="w-5 h-5 mr-2" /> Autores
            </div>
          </ProtectedLink>
          <button
            onClick={cerrarSesion}
            className="flex items-center text-black text-left py-2 hover:bg-red-500 transition-colors"
          >
            <IoCloseCircle className="w-5 h-5 mr-2" /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
