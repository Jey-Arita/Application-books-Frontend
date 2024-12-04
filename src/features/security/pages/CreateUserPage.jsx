import { BsPerson } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FondoSecurity } from "../components";
import { useRegistroStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  registrarInitValues,
  registroValidationSchema,
} from "../forms/registrar.data";
import { Loading } from "../../../shared/components";

export const CreateUserPage = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const registrar = useRegistroStore((state) => state.registrar);
  const isRegistered = useRegistroStore((state) => state.isRegistered);
  const message = useRegistroStore((state) => state.message);
  const error = useRegistroStore((state) => state.error);
  const resetRegistro = useRegistroStore((state) => state.resetRegistro);

  useEffect(() => {
    if (isRegistered) {
      navigate("/inicio");
    }
  }, [isRegistered]);

  const formik = useFormik({
    initialValues: registrarInitValues,
    validationSchema: registroValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setloading(true);
      await registrar(formValues);
      resetRegistro();
      setloading(false);
    },
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <FondoSecurity />
      <div className="bg-gray-100 rounded-lg shadow-2xl overflow-y-hidden transform hover:scale-105 transition-transform duration-300 p-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-center text-blue-500">
            Crea tu cuenta
          </h2>
          <p className="py-3 text-center">
            Ingresa tus datos para comenzar tu aventura con nosotros
          </p>
        </div>
        {error ? (
          <span className="p-4 block bg-red-500 text-white text-center rounded-t-lg">
            {message}
          </span>
        ) : (
          ""
        )}
        <div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="firstName">Nombre de usuario</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <BsPerson className="w-6 h-6 mr-2" />
                </span>
                <input
                  type="firstName"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  className="pl-10 border border-gray-300 rounded-md w-full py-2"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName">Apellido de usuario</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <BsPerson className="w-6 h-6 mr-2" />
                </span>
                <input
                  type="lastName"
                  id="username"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className="pl-10 border border-gray-300 rounded-md w-full py-2"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Correo electrónico</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MdEmail className="w-6 h-6 mr-2" />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="pl-10 border border-gray-300 rounded-md w-full py-2"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Contraseña</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <RiLockPasswordLine className="w-6 h-6 mr-2" />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="pl-10 border border-gray-300 rounded-md w-full py-2"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <RiLockPasswordLine className="w-6 h-6 mr-2" />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
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
};
