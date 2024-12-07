import { useState, useEffect } from "react";
import { useComentario } from "../hooks/useComentario";
import { formatoTiempo } from "../../../shared/utils/index";
import { jwtDecode } from "jwt-decode";

export const Comenta = ({ libroId }) => {
  const [comenta, setComenta] = useState(""); // Comentario principal
  const [responde, setResponde] = useState(""); // Respuesta a un comentario
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState("");
  const [respondiendoId, setRespondiendoId] = useState(null);
  const [userId, setUserId] = useState(null); // Nuevo estado para el userId
  const { isLoading, loadComentario, sendComentario, deleteComentar } = useComentario(libroId);

  // Obtener el userId desde el token decodificado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken); // Inspecciona todo el token decodificado
        setUserId(decodedToken.idUsuario);
        console.log("userId extraído:", decodedToken.UserId);
      } catch (error) {
        console.error("Error al decodificar el token", error);
        setError("Token inválido o expirado. Por favor, inicia sesión nuevamente.");
      }
    } else {
      setError("No se encontró el token de usuario. Por favor, inicia sesión.");
    }
  }, []);
  

  useEffect(() => {
    if (libroId) {
      loadComentario(libroId).then((data) => {
        if (data && Array.isArray(data)) {
          // Filtramos duplicados antes de actualizar el estado
          setComentarios(data.filter((comentario, index, self) => 
            index === self.findIndex((c) => c.id === comentario.id)
          ));
        }
      });
    }
  }, [libroId]);

  const handleComentaSubmit = async (e) => {
    e.preventDefault();

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
      idComentarioPadre: null,
    };

    const result = await sendComentario(newComenta);
    if (result && result.status) {
      setComenta(""); 
      setError("");
      // Filtramos duplicados antes de actualizar el estado
      setComentarios((prev) => {
        const updatedComentarios = [result.data, ...prev];
        return updatedComentarios.filter((comentario, index, self) => 
          index === self.findIndex((c) => c.id === comentario.id)
        );
      });
    } else {
      setError("Error al enviar el comentario");
    }
  };

  const handleResponderSubmit = async (e, idComentarioPadre) => {
    e.preventDefault();

    if (!responde.trim()) {
      setError("La respuesta no puede estar vacía");
      return;
    }

    const newRespuesta = {
      idLibro: libroId,
      comentario: responde,
      fecha: new Date().toISOString(),
      idComentarioPadre,
    };

    const result = await sendComentario(newRespuesta);
    if (result && result.status) {
      setResponde(""); 
      setRespondiendoId(null); // Resetear al terminar
      setComentarios((prev) =>
        prev.map((comenta) =>
          comenta.id === idComentarioPadre
            ? { ...comenta, respuestas: [...comenta.respuestas || [], result.data] }
            : comenta
        )
      );
    } else {
      setError("Error al enviar la respuesta");
    }
  };

  const handleDeleteComentario = async (idComentario) => {
    if (!userId) {
      setError("Usuario no autenticado. No puedes eliminar comentarios.");
      return;
    }
    const result = await deleteComentar(idComentario);
    if (result && result.status) {
      setComentarios((prev) =>
        prev.filter((comenta) => comenta.id !== idComentario)
      );
    } else {
      setError("Error al eliminar el comentario");
    }
  };

  const toggleResponder = (id) => {
    setRespondiendoId((prev) => (prev === id ? null : id));
  };

  const renderComentarios = (comentarios) => {
    return comentarios.map((comenta) => (
      <div key={comenta.id} className="ml-4">
        {/* Comentario principal */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
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
              onClick={() => toggleResponder(comenta.id)}
              className="text-blue-500 mt-2"
            >
              Responder
            </button>
            {respondiendoId === comenta.id && (
              <form
                onSubmit={(e) => handleResponderSubmit(e, comenta.id)}
                className="mt-4"
              >
                <textarea
                  className="w-full p-4 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="2"
                  placeholder="Escribe tu respuesta..."
                  value={responde}
                  onChange={(e) => setResponde(e.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Enviar Respuesta
                </button>
              </form>
            )}
          </div>

          {/* Mostrar el botón de eliminar solo si el comentario fue creado por el usuario autenticado */}
          {comenta.idUsuario === userId && (
  <div className="mt-4 md:mt-0">
    <button
      onClick={() => handleDeleteComentario(comenta.id)}
      className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700"
    >
      Eliminar
    </button>
  </div>
)}


        </div>

        {/* Respuestas anidadas */}
        {comenta.respuestas && comenta.respuestas.length > 0 && (
          <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
            {renderComentarios(comenta.respuestas)}
          </div>
        )}
      </div>
    ));
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Comentarios</h2>
        <form onSubmit={handleComentaSubmit} className="grid gap-4">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows="4"
            placeholder="Escribe tu comentario..."
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Comentarios</h2>
        <div className="mt-6">{renderComentarios(comentarios)}</div>
      </div>
    </div>
  );
};
