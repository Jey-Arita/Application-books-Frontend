import { useEffect, useState } from "react";
import { loginInitValues, loginValidationSchema } from "../forms";
import { useFormik } from "formik";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../shared/components";
import { useAuthStore } from "../store";
import { FondoSecurity } from "../components";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setloading(true);
      await login(formValues);
      setloading(false);
    },
  });
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <FondoSecurity/>
      <div className="w-full max-w-lg mx-auto my-4">
        {" "}
        {/* Expandimos el contenedor */}
        <div className="bg-gray-100 rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <h1 className="py-5 text-4xl font-bold text-center text-blue-600 mb-8 animate-fade-in-down">
            Iniciar Sesión
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200" >
            {error ? (
                <span className="p-4 block bg-red-500 text-white text-center rounded-t-lg">
                    {message}
                </span>
            ) : (
                ""
            )}
          </div>
          <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                 {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.email}
              </div>
            )}
            </div>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.password}
              </div>
            )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-gray-600  hover:from-gray-700 hover:to-blue-700 text-white  py-2 rounded-lg hover:opacity-90 transform hover:scale-105"
            >
              <span className="inline-block mr-2">Ingresar</span>
              <FaArrowRight className="inline-block" />
            </button>
          </form>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <Link
              to="/security/registro"
              className="text-center text-sm text-blue-500 hover:underline"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
