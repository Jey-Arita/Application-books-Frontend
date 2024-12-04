import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";  // Ícono de check
import { Paypal } from "../components";

export const UsuarioPages = () => {
  const [isMembershipActive, setIsMembershipActive] = useState(false);

  const toggleMembership = () => {
    setIsMembershipActive(!isMembershipActive);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6 bg-gray-100">
      <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-24 h-24 mb-2 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
            {/* Imagen del perfil */}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Carlos García</h1>
          <p className="text-muted-foreground">carlos@gmail.com</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 transition duration-200">
            Editar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200">
            Compartir perfil
          </button>
        </div>
      </header>

      <div className="border rounded-lg p-6 bg-gradient-to-r bg-slate-200 text-black shadow-lg">
        <h2 className="font-bold text-2xl mb-4">Membresía Premium</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isMembershipActive}
              onChange={toggleMembership}
              className="form-checkbox h-6 w-6 border-gray-300 text-indigo-600"
            />
            <label className="text-lg font-semibold">
              {isMembershipActive ? "Membresía activa" : "Activar membresía"}
            </label>
          </div>
          {isMembershipActive && (
            <FaCheckCircle className="text-green-400 h-8 w-8" />
          )}
        </div>
        {isMembershipActive && (
          <div className="mt-4">
            <Paypal />
          </div>
        )}
      </div>

      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="font-bold text-xl mb-4">Mis reseñas recientes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border rounded p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Link className="font-semibold text-gray-800">
                  Título del libro {review}
                </Link>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`h-4 w-4 ${star <= review ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      <HiOutlineStar />
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Esta es una reseña corta del libro {review}. Aquí el usuario
                comparte sus pensamientos y opiniones sobre la obra.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
