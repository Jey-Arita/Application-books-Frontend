import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { FaTags, FaUsers } from "react-icons/fa6";
import { ImBooks, ImExit } from "react-icons/im";
import { MdDashboard } from "react-icons/md";

export const Menu = () => {
  return (
    <div className="w-66 bg-white rounded-lg">
      {/* Encabezado de usuario */}
      <div className="px-6 py-4 bg-white rounded-t-lg">
        <div className="flex items-center">
          <FaUserCircle className="w-12 h-12 mr-4 text-blue-500" />
          <div>
            <p className="text-lg font-bold text-black">Jane Doe</p>
            <p className="text-sm text-gray-600">janedoe@example.com</p>
          </div>
        </div>
      </div>

      {/* Sección de Administración */}
      <div className="py-2 border-t border-gray-200">
      <Link
          to="/admin/dashboard"
          className="flex items-center px-6 py-3 text-xl font-medium text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <MdDashboard className="w-6 h-6 mr-3 text-blue-500" />
          Dashboard
        </Link>
        <Link
          to="/admin/autor"
          className="flex items-center px-6 py-3 text-xl font-medium text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <BsFileEarmarkPersonFill className="w-6 h-6 mr-3 text-blue-500" />
          Autores
        </Link>
        <Link
          to="/admin/libro"
          className="flex items-center px-6 py-3 text-xl font-medium text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <ImBooks className="w-6 h-6 mr-3 text-green-500" />
          Libros
        </Link>
        <Link
          to="/admin/genero"
          className="flex items-center px-6 py-3 text-xl font-medium text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <FaTags className="w-6 h-6 mr-3 text-rose-500" />
          Generos
        </Link>
        <Link
          to="#"
          className="flex items-center px-6 py-3 text-xl font-medium text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <FaUsers className="w-6 h-6 mr-3 text-purple-500" />
          Usuarios
        </Link>
      </div>

      {/* Botón de salir */}
      <div className="py-2 border-t border-gray-200">
        <Link
          to="#"
          className="flex items-center px-6 py-3 text-xl font-medium text-red-600 hover:text-red-800 hover:bg-red-100 transition duration-200"
        >
          <ImExit className="w-6 h-6 mr-3" />
          Salir
        </Link>
      </div>
    </div>
  );
};
