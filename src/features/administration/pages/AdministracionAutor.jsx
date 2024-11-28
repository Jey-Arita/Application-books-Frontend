import { useState } from "react";
import { MdOutlineDriveFileRenameOutline, MdDescription } from "react-icons/md";
import { FaFileImage, FaTrash, FaEdit } from "react-icons/fa";

export const AdministracionAutor = () => {
  const [autores, setAutores] = useState([
    {
      id: 1,
      nombre: "Gabriel García Márquez",
      descripcion:
        "Maestro del realismo mágico, revolucionó la literatura latinoamericana con 'Cien años de soledad'.",
      imagenUrl:
        "https://www.biografiasyvidas.com/biografia/g/fotos/garcia_marquez_gabriel.jpg",
    },
    {
      id: 2,
      nombre: "Jorge Luis Borges",
      descripcion:
        "Escritor argentino, considerado uno de los autores más importantes del siglo XX.",
      imagenUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Jorge_Luis_Borges_1951.jpg",
    },
  ]);

  const [modoEdicion, setModoEdicion] = useState(null);
  const [nuevoAutor, setNuevoAutor] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoAutor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarAutor = (e) => {
    e.preventDefault();
    const nuevoId =
      autores.length > 0 ? Math.max(...autores.map((a) => a.id)) + 1 : 1;

    setAutores([...autores, { ...nuevoAutor, id: nuevoId }]);
    setNuevoAutor({ nombre: "", descripcion: "", imagenUrl: "" });
  };

  const editarAutor = (autor) => {
    setModoEdicion(autor.id);
    setNuevoAutor(autor);
  };

  const actualizarAutor = () => {
    setAutores(
      autores.map((autor) => (autor.id === modoEdicion ? nuevoAutor : autor))
    );
    setModoEdicion(null);
    setNuevoAutor({ nombre: "", descripcion: "", imagenUrl: "" });
  };

  const eliminarAutor = (id) => {
    setAutores(autores.filter((autor) => autor.id !== id));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Gestión de Autores
        </h1>

        {/* Formulario de Autor */}
        <div className="bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-6 mb-8">
          <form
            onSubmit={modoEdicion ? actualizarAutor : agregarAutor}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col space-y-4">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500" />
                Nombre Autor
              </label>
              <input
                type="text"
                name="nombre"
                value={nuevoAutor.nombre}
                onChange={handleChange}
                placeholder="Nombre Completo"
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdDescription className="mr-2 text-green-500" />
                Bibliografía
              </label>
              <textarea
                name="descripcion"
                value={nuevoAutor.descripcion}
                onChange={handleChange}
                placeholder="Bibliografía"
                required
                rows={5}
                className="w-full p-3 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-4">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaFileImage className="mr-2 text-purple-500" />
                Imagen
              </label>
              <input
                type="text"
                name="imagenUrl"
                value={nuevoAutor.imagenUrl}
                onChange={handleChange}
                placeholder="URL de Imagen"
                required
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {nuevoAutor.imagenUrl && (
                <div className="w-full h-36 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border">
                  <img
                    src={nuevoAutor.imagenUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition flex items-center justify-center"
              >
                {modoEdicion ? (
                  <>
                    <MdDescription className="mr-2" />
                    Actualizar Autor
                  </>
                ) : (
                  <>
                    <FaEdit className="mr-2" />
                    Agregar Autor
                  </>
                )}
              </button>
              {modoEdicion && (
                <button
                  type="button"
                  onClick={() => {
                    setModoEdicion(null);
                    setNuevoAutor({
                      nombre: "",
                      descripcion: "",
                      imagenUrl: "",
                    });
                  }}
                  className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition flex items-center justify-center"
                >
                  <FaTrash className="mr-2" />
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Autores */}
        <div className="grid md:grid-cols-2 gap-6">
          {autores.map((autor) => (
            <div
              key={autor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
            >
              <div className="relative">
                <img
                  src={autor.imagenUrl}
                  alt={autor.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => editarAutor(autor)}
                    className="bg-blue-500/80 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => eliminarAutor(autor.id)}
                    className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{autor.nombre}</h3>
                <p className="text-gray-600">{autor.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
