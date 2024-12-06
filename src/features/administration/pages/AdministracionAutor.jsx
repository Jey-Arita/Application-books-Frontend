import { useEffect, useState } from "react";
import { MdOutlineDriveFileRenameOutline, MdDescription } from "react-icons/md";
import { FaFileImage, FaTrash, FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import { crearInitAutores, createAutorValidationSchema } from "../forms";
import { useAutor } from "../../book/hooks";
import { useDeleteAutor, useEditAutor } from "../hooks";
import { useAutorStore } from "../store/useAutorStore";

export const AdministracionAutor = () => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const addAutor = useAutorStore((state) => state.addAutor);
  const { editarAutor, isLoadingEdit, errorEdit } = useEditAutor();
  const { eliminarAutor, isLoadingDelete, errorDelete } = useDeleteAutor();

  const { autores, loadAutores, isLoading } = useAutor();

  const formik = useFormik({
    initialValues: crearInitAutores,
    validationSchema: createAutorValidationSchema,
    onSubmit: async (formValues) => {
      if (modoEdicion) {
        const result = await editarAutor(modoEdicion, formValues);
        if (result) {
          // Si se actualiza correctamente, recarga la lista
          loadAutores();
          formik.resetForm();
          setModoEdicion(null);
        }
      } else {
        await addAutor(formValues);
        formik.resetForm(); // Limpia el formulario
      }
    },
  });

  const editarAutorHandler = async (autor) => {
    setModoEdicion(autor.id);
    formik.setValues(autor); // Establece valores en el formulario
  };

  const eliminarAutorHandler = async (id) => {
    const result = await eliminarAutor(id);
    if (result) {
      loadAutores();
    }
  };

  // Cargar los autores cuando el componente se monte
  useEffect(() => {
    loadAutores();
  }, [loadAutores]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Administración de Autores
          </h1>

          {/* Formulario */}
          <div className="bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-6 mb-8">
            <form
              onSubmit={formik.handleSubmit}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col space-y-4">
                <label className="flex items-center text-lg font-medium text-gray-700">
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
                  <p className="text-red-500">{formik.errors.nombreAutor}</p>
                )}

                <label className="flex items-center text-lg font-medium text-gray-700">
                  <MdDescription className="mr-2 text-green-500" />
                  Bibliografía
                </label>
                <textarea
                  name="bibliografia"
                  value={formik.values.bibliografia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Bibliografía"
                  rows={5}
                  className="w-full p-3 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                {formik.touched.bibliografia && formik.errors.bibliografia && (
                  <p className="text-red-500">{formik.errors.bibliografia}</p>
                )}
              </div>

              <div className="flex flex-col space-y-4">
                <label className="flex items-center text-lg font-medium text-gray-700">
                  <FaFileImage className="mr-2 text-purple-500" />
                  Imagen
                </label>
                <input
                  type="text"
                  name="urlImg"
                  value={formik.values.urlImg}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="URL de Imagen"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.urlImg && formik.errors.urlImg && (
                  <p className="text-red-500">{formik.errors.urlImg}</p>
                )}
                {formik.values.urlImg && (
                  <div className="w-full h-36 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border">
                    <img
                      src={formik.values.urlImg}
                      alt="Vista previa"
                      className="w-32 h-32 max-w-xs object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
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
                <div className="flex items-center p-4">
                  {/* Imagen del autor al lado del nombre */}
                  <img
                    src={autor.urlImg}
                    alt={autor.nombreAutor}
                    className="w-32 h-32 max-w-xs object-cover rounded-lg shadow-lg mr-4" 
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold mb-2">
                      {autor.nombreAutor}
                    </h3>
                    <p className="text-gray-600 p-3">{autor.bibliografia}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => editarAutorHandler(autor)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
