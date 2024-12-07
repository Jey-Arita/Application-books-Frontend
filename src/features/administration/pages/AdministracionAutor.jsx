import { useEffect, useState } from "react";
import { 
  MdOutlineDriveFileRenameOutline, 
  MdDescription, 
  MdClose 
} from "react-icons/md";
import { 
  FaFileImage, 
  FaTrash, 
  FaEdit, 
  FaPlusCircle 
} from "react-icons/fa";
import { useFormik } from "formik";
import { crearInitAutores, createAutorValidationSchema } from "../forms";
import { useAutor } from "../../book/hooks";
import { useDeleteAutor, useEditAutor } from "../hooks";
import { useAutorStore } from "../store/useAutorStore";

export const AdministracionAutor = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);
  const addAutor = useAutorStore((state) => state.addAutor);
  const { editarAutor, isLoadingEdit, errorEdit } = useEditAutor();
  const { eliminarAutor, isLoadingDelete, errorDelete } = useDeleteAutor();

  const { autores, loadAutores, isLoading } = useAutor();

  const formik = useFormik({
    initialValues: crearInitAutores,
    validationSchema: createAutorValidationSchema,
    onSubmit: async (formValues) => {
      if (autorSeleccionado) {
        // Modo edición
        const result = await editarAutor(autorSeleccionado.id, formValues);
        if (result) {
          loadAutores();
          formik.resetForm();
          setModalVisible(false);
          setAutorSeleccionado(null);
        }
      } else {
        // Modo creación
        await addAutor(formValues);
        loadAutores();
        formik.resetForm();
        setModalVisible(false);
      }
    },
  });

  const abrirModalCreacion = () => {
    formik.resetForm();
    setAutorSeleccionado(null);
    setModalVisible(true);
  };

  const abrirModalEdicion = (autor) => {
    setAutorSeleccionado(autor);
    formik.setValues({
      nombreAutor: autor.nombreAutor,
      bibliografia: autor.bibliografia,
      urlImg: autor.urlImg
    });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setAutorSeleccionado(null);
    formik.resetForm();
  };

  const eliminarAutorHandler = async (id) => {
    const result = await eliminarAutor(id);
    if (result) {
      loadAutores();
    }
  };

  useEffect(() => {
    loadAutores();
  }, [loadAutores]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Administración de Autores
          </h1>
          <button
            onClick={abrirModalCreacion}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition"
          >
            <FaPlusCircle className="mr-2" /> Añadir Nuevo Autor
          </button>
        </div>

        {/* Lista de Autores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autores.map((autor) => (
            <div
              key={autor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
            >
              <div className="relative">
                <img
                  src={autor.urlImg}
                  alt={autor.nombreAutor}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => abrirModalEdicion(autor)}
                    className="bg-blue-500/80 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => eliminarAutorHandler(autor.id)}
                    className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{autor.nombreAutor}</h3>
                <p className="text-gray-600 line-clamp-3">{autor.bibliografia}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Creación/Edición */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8 relative">
              <button
                onClick={cerrarModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <MdClose size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {autorSeleccionado ? "Editar Autor" : "Añadir Nuevo Autor"}
              </h2>

              <form onSubmit={formik.handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500" />
                    Nombre del Autor
                  </label>
                  <input
                    type="text"
                    name="nombreAutor"
                    value={formik.values.nombreAutor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nombre Completo"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.nombreAutor && formik.errors.nombreAutor && (
                    <p className="text-red-500 mt-1">{formik.errors.nombreAutor}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <FaFileImage className="mr-2 text-purple-500" />
                    URL de Imagen
                  </label>
                  <input
                    type="text"
                    name="urlImg"
                    value={formik.values.urlImg}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="URL de la Imagen"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.urlImg && formik.errors.urlImg && (
                    <p className="text-red-500 mt-1">{formik.errors.urlImg}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <MdDescription className="mr-2 text-green-500" />
                    Bibliografía
                  </label>
                  <textarea
                    name="bibliografia"
                    value={formik.values.bibliografia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Breve biografía del autor"
                    rows={5}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  {formik.touched.bibliografia && formik.errors.bibliografia && (
                    <p className="text-red-500 mt-1">{formik.errors.bibliografia}</p>
                  )}
                </div>

                {formik.values.urlImg && (
                  <div className="md:col-span-2 flex justify-center">
                    <img
                      src={formik.values.urlImg}
                      alt="Vista previa"
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoadingEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {autorSeleccionado ? "Guardar Cambios" : "Añadir Autor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};