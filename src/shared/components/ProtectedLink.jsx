import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/security/store";
import { membresiaListConstant } from "../constants";
import { BiCheckCircle, BiLock } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const ProtectedLink = ({ to, children }) => {
  const membresia = useAuthStore((state) => state.membresia);
  const navigate = useNavigate();
  const [modal, setmodal] = useState(false);

  const handleClick = (event) => {
    if (
      ![membresiaListConstant.Premium, membresiaListConstant.Prueba].includes(
        membresia
      )
    ) {
      event.preventDefault(); // Evitar la navegación del enlace
      setmodal(true); // Mostrar el modal
    }
  };

  const handleNavigateToProfile = () => {
    setmodal(false); // Cerrar el modal
    navigate("/usuario"); // Redirigir al perfil de usuario
  };

  return (
    <>
      <Link
        to={to}
        onClick={handleClick}
      >
        {children}
      </Link>

      {/* Modal */}
        {modal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full h-full sm:max-w-md sm:h-auto transform transition-all ease-in-out duration-300 scale-100">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <BiLock className="h-8 w-8 mr-3" />
                    <h2 className="text-xl sm:text-2xl font-bold">Necesitas una Membresía</h2>
                  </div>
                  <button
                    onClick={() => setmodal(false)}
                    className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                  >
                    <IoMdCloseCircle className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-700 mb-4">
                    Para acceder a esta sección, necesitas una membresía. Tenemos dos opciones disponibles:
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                      <BiCheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Premium</h3>
                        <p className="text-blue-700 text-sm">Acceso completo a todas las funcionalidades</p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 flex items-center">
                      <BiCheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-green-800 mb-1">Prueba</h3>
                        <p className="text-green-700 text-sm">Acceso limitado por un período de tiempo</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 flex items-center"
                      onClick={() => setmodal(false)}
                    >
                      <IoMdCloseCircle className="h-5 w-5 mr-2" />
                      Cancelar
                    </button>
                    <button
                      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
                      onClick={handleNavigateToProfile}
                    >
                      <FaUser className="h-5 w-5 mr-2" />
                      Ir al Perfil
                    </button>
                  </div>
                </div>
              </div>
            </div>
      )}
    </>
  );
};


