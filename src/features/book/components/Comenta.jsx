import { useState, useEffect } from "react";
import { useComentario } from "../hooks/useComentario";
import { formatoTiempo } from "../../../shared/utils/index";

export const Comenta = ({ libroId }) => {
  const [comenta, setComenta] = useState("");
  const {
    comentario,
    isLoading,
    loadComentario,
    sendComentario,
    deletComentar,
  } = useComentario(libroId);

  useEffect(() => {
    if (libroId) {
      loadComentario(libroId);
    }
  }, [libroId]);

  const handleComentaSubmit = async (e) => {
    e.preventDefault();
    const newComenta = {
      idLibro: libroId,
      idUsuario: "f7b906d7-9ea8-454b-aacd-ccbbad28902d",
      comentario: comenta,
      fecha: new Date().toISOString(),
    };

    const result = await sendComentario(newComenta);
    if (result && result.status) {
      setComenta("");
      loadComentario(libroId);
    } else {
      alert("Error al enviar el comentario");
    }
  };

  const handleDeleteComentario = async (idComentario) => {
    const result = await deletComentar(idComentario);
    if (result && result.status) {
      loadComentario(libroId);
    } else {
      alert("Error al eliminar el comentario");
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Agregar Comentarios
        </h2>
        <form onSubmit={handleComentaSubmit} className="grid gap-4">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows="4"
            placeholder="Escribe tu comentario aquí..."
            value={comenta}
            onChange={(e) => setComenta(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar Comentario
          </button>
        </form>
      </div>

      <div className="my-12 border-t border-gray-300" />

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comentarios</h2>
        <div className="grid gap-8">
          {comentario.map((comenta) => (
            <div
            className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105"
            key={comenta.idComentario}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
              <img
                src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                alt="@username"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-800">
                  {comenta.nombreUsuario || "Anonymous"}
                </div>
                <div className="text-sm text-gray-500">
                  {formatoTiempo(comenta.fecha)}
                </div>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {comenta.comentario}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => handleDeleteComentario(comenta.idComentario)}
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Eliminar
              </button>
            </div>
          </div>
          
          ))}
        </div>
      </div>
    </div>
  );
};
