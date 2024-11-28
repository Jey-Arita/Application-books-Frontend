import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaHouseChimney, FaUser, FaBook } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";
import { GoPerson } from "react-icons/go";
import { GiBookPile } from "react-icons/gi";

export const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
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
          <div>
            <button
              className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
              onClick={toggleProfileMenu}
            >
              <FaUser className="w-5 h-5 mr-2" /> Perfil
              {isProfileMenuOpen ? (
                <IoIosArrowDropdownCircle className="w-5 h-5" />
              ) : (
                <IoIosArrowDropupCircle className="w-5 h-5" />
              )}
            </button>
            {isProfileMenuOpen && (
              <div className="bg-white shadow-lg absolute mt-1 rounded-md">
                <Link
                  to="/usuario"
                  className="px-4 py-2 flex items-center w-full text-left  hover:bg-gray-100 transition-colors rounded-md"
                >
                  <GoPerson className="w-4 h-4 mr-1" />
                  Tu Perfil
                </Link>
                <Link
                  to="/settings"
                  className="px-4 py-2 flex items-center w-full text-left  hover:bg-gray-100 transition-colors"
                >
                  {" "}
                  <GrConfigure className="w-4 h-4 mr-1" />
                  Configuración
                </Link>
                <Link
                  to="/signout"
                  className="px-4 py-2 flex items-center w-full text-left  hover:bg-gray-100 transition-colors rounded-md"
                >
                  <IoMdExit className="w-4 h-4 mr-1" />
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/categoria"
            className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <BiSolidCategory className="w-5 h-5 mr-2" /> Categorías
          </Link>
          <Link
            to="/favorito"
            className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <MdFavorite className="w-5 h-5 mr-2" /> Favoritos
          </Link>
          <Link
            to="/autores"
            className="flex items-center text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <FaBook className="w-5 h-5 mr-2" /> Autores
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        <div className="h-14 border-b bg-gradient-to-br from-gray-600 to-blue-600 flex items-center px-4">
          <span className="text-lg font-semibold text-white">Menú</span>
          <button onClick={handleSidebarToggle} className="ml-auto">
            <FaWindowClose className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="px-4 py-2">
          <Link
            to="/inicio"
            className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
            onClick={handleSidebarToggle}
          >
            <FaHouseChimney className="w-5 h-5 mr-2" /> Inicio
          </Link>

          {/* Menú de perfil */}
          <div>
            <button
              className="flex items-center w-full justify-between py-2 hover:bg-gray-100 transition-colors"
              onClick={toggleProfileMenu}
            >
              <span className="flex items-center">
                <FaUser className="w-5 h-5 mr-2" /> Perfil
              </span>
              {isProfileMenuOpen ? (
                <IoIosArrowDropdownCircle className="w-5 h-5" />
              ) : (
                <IoIosArrowDropupCircle className="w-5 h-5" />
              )}
            </button>
            {isProfileMenuOpen && (
              <div className="pl-4">
                <Link
                  to="/usuario"
                  className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
                  onClick={handleSidebarToggle}
                >
                  <GoPerson className="w-4 h-4 mr-1" /> Tu Perfil
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
                  onClick={handleSidebarToggle}
                >
                  <GrConfigure className="w-4 h-4 mr-1" /> Configuración
                </Link>
                <Link
                  to="/signout"
                  className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
                  onClick={handleSidebarToggle}
                >
                  <IoMdExit className="w-4 h-4 mr-1" /> Cerrar sesión
                </Link>
              </div>
            )}
          </div>

          {/* Menú de categorías */}
          <div>
            <button
              className="flex items-center w-full justify-between py-2 hover:bg-gray-100 transition-colors"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span className="flex items-center">
                <BiSolidCategory className="w-5 h-5 mr-2" /> Categorías
              </span>
              {categoriesOpen ? (
                <IoIosArrowDropdownCircle className="w-5 h-5" />
              ) : (
                <IoIosArrowDropupCircle className="w-5 h-5" />
              )}
            </button>
            {categoriesOpen && (
              <div className="pl-4">
                <Link
                  to="/categoria/"
                  className="block w-full text-left py-1 hover:bg-gray-100 transition-colors"
                  onClick={handleSidebarToggle}
                >
                  Tecnología
                </Link>
                {/* Puedes agregar más categorías aquí */}
              </div>
            )}
          </div>

          <Link
            to="/favorito"
            className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
            onClick={handleSidebarToggle}
          >
            <MdFavorite className="w-5 h-5 mr-2" /> Favoritos
          </Link>
          <Link
            to="/autores"
            className="flex items-center w-full text-left py-2 hover:bg-gray-100 transition-colors"
            onClick={handleSidebarToggle}
          >
            <FaBook className="w-5 h-5 mr-2" /> Autores
          </Link>
        </div>
      </div>
    </>
  );
};
