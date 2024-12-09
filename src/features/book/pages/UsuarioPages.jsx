import React, { useEffect, useState } from "react";
import { HiBookOpen, HiUser } from "react-icons/hi";
import { FaCalendarAlt, FaCrown } from "react-icons/fa";
import { Paypal } from "../components";
import { jwtDecode } from "jwt-decode";
import { useMembresiaStore } from "../store";
import { useFormik } from "formik";
import { crearInitMembresia, createMembresiaValidationSchema } from "../forms";
import { FaCheck, FaClock, FaHeart, FaTrash, FaTrophy } from "react-icons/fa6";
import { useMembresia } from "../hooks";
import { ImBooks } from "react-icons/im";
import { TbCreditCardPay } from "react-icons/tb";
import { Link } from "react-router-dom";

export const UsuarioPages = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);
  const [isMembershipActive, setIsMembershipActive] = useState(false);
  const addMembresia = useMembresiaStore((state) => state.addMembresia);
  const { loadMembresia, membresia, loading } = useMembresia();
  const [favoritos, setFavoritos] = useState([]);

  const formik = useFormik({
    initialValues: crearInitMembresia,
    validationSchema: createMembresiaValidationSchema,
    onSubmit: async (form) => {
      try {
        const membershipData = {
          tipoMembresia: form.tipoMembresia,
        };
        if (isMembershipActive) {
          await addMembresia(membershipData);
          formik.resetForm();
          setMembershipStatus({
            success: true,
            message: `Membresía ${membershipData.tipoMembresia} actualizada con éxito`,
          });
        } else {
          setMembershipStatus({
            success: false,
            message: "Debes completar el pago para activar la membresía.",
          });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.errors ||
          error.message ||
          "Hubo un problema al procesar la membresía";

        setError(errorMessage);
        setMembershipStatus({
          success: false,
          message: errorMessage,
        });
      }
    },
  });

  const onPaymentSuccess = () => {
    setIsMembershipActive(true); // Establecer la suscripción como activa
  };

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

  useEffect(() => {
    loadMembresia();
  }, [loadMembresia]);



  useEffect(() => {
    const loadFavoritos = () => {
      // Esto es solo un ejemplo, deberías cargar los favoritos desde una API o estado global
      const favoritosData = [
        { id: 1, title: "Libro 1", author: "Autor 1" },
        { id: 2, title: "Libro 2", author: "Autor 2" },
      ];
      setFavoritos(favoritosData);
    };

    loadFavoritos();
  }, []);

  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter((libro) => libro.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-blue-500 mb-8">Mi Perfil</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Perfil y Detalles de Membresía */}
          <div className="md:col-span-1 bg-gradient-to-br from-blue-500 to-gray-500 rounded-2xl shadow-lg p-8">
            <div className="relative">
              {membresia.activaMembresia && (
                <div className="absolute top-0 right-0 flex items-center bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  <FaCrown className="mr-2" />
                  Premium
                </div>
              )}

              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <HiUser className="text-black w-20 h-20 opacity-90" />
                </div>
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  {email || "Usuario"}
                </h2>
                <p className="text-gray-200">
                  {membresia.tipoMembresia} Membership
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <FaCalendarAlt className="mr-3 text-blue-500" />
                  <span>
                    Inicio:{" "}
                    {new Date(membresia.fechaInicio).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaClock className="mr-3 text-green-500" />
                  <span>
                    Fin: {new Date(membresia.fechaFin).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaTrophy className="mr-3 text-purple-500" />
                  <span>Días Restantes: {membresia.diasRestantes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cambio de Membresía */}
          <div className="md:col-span-1 bg-slate-200 rounded-2xl shadow-lg p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="bg-stale-300 rounded-xl">
                <label className="block text-gray-700 font-semibold mb-4 text-center">
                  <TbCreditCardPay className="mx-auto text-6xl mb-4 text-rose-500" />
                  Seleccionar Tipo de Membresía
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  name="tipoMembresia"
                  value={formik.values.tipoMembresia}
                  onChange={formik.handleChange}
                >
                  <option value="Gratis">Gratis</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <Paypal onPaymentSuccess={onPaymentSuccess} />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-xl"
                >
                  Confirmar Membresía
                </button>
              </div>
            </form>

            {(membershipStatus || error) && (
              <div
                className={`mt-6 p-4 rounded-lg shadow-md text-center ${
                  membershipStatus?.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <p>{membershipStatus?.message || error}</p>
              </div>
            )}
          </div>

          {/* Libros Favoritos */}
          <div className="md:col-span-1 bg-gray-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              <ImBooks className="mx-auto text-6xl mb-4 text-green-500" /> Mis
              Libros Favoritos
            </h2>
            {favoritos.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <HiBookOpen className="mx-auto text-6xl mb-4 text-blue-700" />
                <p>No tienes libros favoritos aún</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favoritos.map((libro) => (
                  <div
                    key={libro.id}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col">
                      <h3 className="font-bold text-gray-800">{libro.title}</h3>
                      <span className="text-gray-600">{libro.author}</span>
                    </div>
                    <Link
                      onClick={() => removeFavorito(libro.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
