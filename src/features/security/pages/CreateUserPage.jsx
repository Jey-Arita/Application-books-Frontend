import { BsPerson } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FondoSecurity } from "../components";

export const CreateUserPage = () => {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <FondoSecurity/>
        <div className="bg-gray-100 rounded-lg shadow-2xl overflow-y-hidden transform hover:scale-105 transition-transform duration-300 p-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-center text-blue-500">Crea tu cuenta</h2>
            <p className="py-3 text-center">
              Ingresa tus datos para comenzar tu aventura con nosotros
            </p>
          </div>
          <div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username">Nombre de usuario</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><BsPerson className="w-6 h-6 mr-2"/></span>
                  <input
                    id="username"
                    placeholder="TuNombreDeUsuario"
                    className="pl-10 border border-gray-300 rounded-md w-full py-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="username">Apellido de usuario</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><BsPerson className="w-6 h-6 mr-2"/></span>
                  <input
                    id="username"
                    placeholder="TuApellidoDeUsuario"
                    className="pl-10 border border-gray-300 rounded-md w-full py-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Correo electrónico</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><MdEmail className="w-6 h-6 mr-2"/></span>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    className="pl-10 border border-gray-300 rounded-md w-full py-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Contraseña</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><RiLockPasswordLine className="w-6 h-6 mr-2"/></span>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border border-gray-300 rounded-md w-full py-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><RiLockPasswordLine className="w-6 h-6 mr-2"/></span>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border border-gray-300 rounded-md w-full py-2"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-gray-600 hover:from-gray-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-white py-2 rounded-md"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  