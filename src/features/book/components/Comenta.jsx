import { useState } from "react";

export const Comenta = () => {
  // Mueve los hooks useState al nivel superior
  const [comenta, setComenta] = useState("");
  const [comentas, setComentas] = useState([
    {
      id: 1,
      name: "John Doe",
      text: "Increíble Libro tiene una historia fascinante",
    },
  ]);

  const handleComentaSubmit = (e) => {
    e.preventDefault();
    const newComenta = {
      id: comentas.length + 1,
      name: "Anonymous",
      text: comenta,
    };
    setComentas([...comentas, newComenta]);
    setComenta("");
  };

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
          {comentas.map((comenta) => (
            <div
              className="flex gap-4 p-4 border border-gray-300 rounded-md shadow-sm"
              key={comenta.id}
            >
              <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                <img
                  src="https://img.asmedia.epimg.net/resizer/v2/6OTABRTH3NFIPBIGSREW7C6ACA.jpg?auth=f5f14d21cc8dc0271f90eb98fcb2fa949d7bf56df64218ceb8cfa1e595afe8c5&width=1472&height=1104&smart=true"
                  alt="@username"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-800">
                    {comenta.name}
                  </div>
                </div>
                <p className="text-gray-600">{comenta.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};