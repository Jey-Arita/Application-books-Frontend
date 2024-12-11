import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { FaTags, FaUsers } from "react-icons/fa6";
import { ImBooks, ImExit } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Menu = () => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const email =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        setEmail(email || "Usuario desconocido");
      } catch (err) {
        setError("Token inválido. Por favor, inicia sesión.");
      }
    }
  }, []);

  return (
    <div className="w-66 bg-white rounded-lg">
      {/* Encabezado de usuario */}
      <div className="px-6 py-4 bg-white rounded-t-lg">
        <div className="flex items-center">
          <FaUserCircle className="w-12 h-12 mr-4 text-blue-500" />
          <div>
            <p className="text-lg text-gray-600">{email}</p>
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
      </div>
    </div>
  );
};
