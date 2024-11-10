import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { Link } from "react-router-dom";

export const UsuarioPages = () => {
  const [isMembershipActive, setIsMembershipActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("mensual");

  const toggleMembership = () => {
    setIsMembershipActive(!isMembershipActive);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6 bg-gray-100">
      <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-24 h-24 mb-2 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
            <img 
            src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
            alt="@username"
            className="w-full h-full object-cover"
            ></img>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Carlos García</h1>
          <p className="text-muted-foreground">Explorador de mundos literarios</p>
          <div className="flex mt-2 space-x-2">
            <span className="bg-gray-200 px-2 py-1 rounded">Lector ávido</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Crítico literario</span>
            {isMembershipActive && <span className="bg-blue-200 px-2 py-1 rounded">Miembro Premium</span>}
          </div>
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

      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="font-bold text-xl mb-4">Resumen de lectura</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">127</span>
            <span className="text-sm text-muted-foreground">Libros leídos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">4.7</span>
            <span className="text-sm text-muted-foreground">Calificación promedio</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">312</span>
            <span className="text-sm text-muted-foreground">En biblioteca</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">3 años</span>
            <span className="text-sm text-muted-foreground">Tiempo leyendo</span>
          </div>
        </div>
      </div>

      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="font-bold text-xl mb-4">Desafío de lectura 2024</h2>
        <div className="h-2 bg-gray-300 mb-2">
          <div className="h-full bg-blue-500" style={{ width: '65%' }} />
        </div>
        <p className="text-sm text-muted-foreground">39 de 60 libros completados</p>
      </div>

      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="font-bold text-xl mb-4">Membresía Premium</h2>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            checked={isMembershipActive} 
            onChange={toggleMembership} 
            className="form-checkbox" 
          />
          <label>
            {isMembershipActive ? "Membresía activa" : "Activar membresía"}
          </label>
        </div>
        {isMembershipActive && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="mensual" 
                checked={selectedPlan === "mensual"} 
                onChange={() => setSelectedPlan("mensual")} 
              />
              <label>Plan Mensual - $9.99/mes</label>
            </div>
            <button className="bg-blue-500 text-white w-full py-2 rounded shadow hover:bg-blue-600 transition duration-200">
              Pagar membresía
            </button>
          </div>
        )}
      </div>

      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="font-bold text-xl mb-4">Mis reseñas recientes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border rounded p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Link className="font-semibold text-gray-800">Título del libro {review}</Link>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`h-4 w-4 ${star <= review ? "text-yellow-400" : "text-gray-300"}`}><HiOutlineStar/></span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Esta es una reseña corta del libro {review}. Aquí el usuario comparte sus pensamientos y opiniones sobre la obra.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
