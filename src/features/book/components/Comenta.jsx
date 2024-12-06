import { useState, useEffect } from "react";
import { useComentario } from "../hooks/useComentario";
import { formatoTiempo } from "../../../shared/utils/index";

export const Comenta = ({ libroId }) => {
  const [comenta, setComenta] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState("");
  const { isLoading, loadComentario, sendComentario, deleteComentar } = useComentario(libroId);

  useEffect(() => {
    console.log("ID del libro:", libroId); // Asegúrate de que no sea undefined o null
    if (libroId) {
      loadComentario(libroId).then((data) => {
        if (data && Array.isArray(data)) {
          setComentarios(data); // Actualiza los comentarios
        }
      });
    }
  }, [libroId]);

  const handleComentaSubmit = async (e, idComentarioPadre = null) => {
    e.preventDefault();

    // Verifica si libroId está presente
    if (!libroId) {
      setError("ID del libro no disponible");
      return;
    }

    if (!comenta.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    const newComenta = {
      idLibro: libroId,
      comentario: comenta,
      fecha: new Date().toISOString(),
      idComentarioPadre: idComentarioPadre || null,
    };

    const result = await sendComentario(newComenta);
    if (result && result.status) {
      setComenta("");
      setError("");
      if (idComentarioPadre) {
        setComentarios((prev) =>
          prev.map((comenta) =>
            comenta.id === idComentarioPadre
              ? { ...comenta, respuestas: [...comenta.respuestas, result.data] }
              : comenta
          )
        );
      } else {
        setComentarios((prev) => [result.data, ...prev]);
      }
    } else {
      setError("Error al enviar el comentario");
    }
  };

  const handleDeleteComentario = async (idComentario) => {
    const result = await deleteComentar(idComentario);
    if (result && result.status) {
      setComentarios((prev) =>
        prev.filter((comenta) => comenta.id !== idComentario)
      );
    } else {
      setError("Error al eliminar el comentario");
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Comentarios</h2>
        <form onSubmit={(e) => handleComentaSubmit(e)} className="grid gap-4">
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
          {comentarios.map((comenta) => (
            <div
              className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105"
              key={comenta.id}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                <img
                  src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                  alt={comenta.nombreUsuario || "Anónimo"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {comenta.nombreUsuario || "Anónimo"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatoTiempo(comenta.fecha)}
                  </div>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {comenta.comentario}
                </p>
                <button
                  onClick={(event) => handleComentaSubmit(event, comenta.id)}
                  className="text-blue-500 mt-2"
                >
                  Responder
                </button>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => handleDeleteComentario(comenta.id)}
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700"
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
