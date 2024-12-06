import { useEffect, useState } from "react";
import { MdOutlineDriveFileRenameOutline, MdDescription } from "react-icons/md";
import { FaFileImage, FaTrash, FaEdit, FaTags, FaLink } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { ListaLibrosAdministracion } from "../components";
import { useFormik } from "formik";
import { crearInitLibro, createLibroValidationSchema } from "../forms";
import { useLibrosStore } from "../store";
import { useEditLibro } from "../hooks/useEditLibro";
import { useDeleteLibro } from "../hooks";
import { useAutor, useGeneroList } from "../../book/hooks";

export const AdministracionLibro = () => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const addLibro = useLibrosStore((state) => state.addLibro);
  const { editarLibro, isLoadingEdit, errorEdit } = useEditLibro();
  const { eliminarLibro, isLoadingDelete, errorDelete } = useDeleteLibro();
  const { autores, loadAutores } = useAutor();
  const { generos, loadGenero } = useGeneroList();



  const formik = useFormik({
    initialValues: crearInitLibro,
    validationSchema: createLibroValidationSchema,
    onSubmit: async (form) => {
      if (modoEdicion) {
        const result = await editarLibro(modoEdicion, form);
        console.log(result);
        if (result) {
          // Si se actualiza correctamente, recarga la lista
          loadAutores();
          formik.resetForm();
        }
      } else {
        await addLibro(form);
        formik.resetForm(); // Limpia el formulario
      }
    },
  });

  const editarLibroHandler = async (libro) => {
    setModoEdicion(libro.id);
    formik.setValues(libro); // Establece valores en el formulario
  };

  const eliminarLibroHandler = async (id) => {
    const result = await eliminarLibro(id);
    if (result) {
      loadAutores();
    }
  };

  // Cargar los autores cuando el componente se monte
  useEffect(() => {
    loadGenero();
    loadAutores();
  }, [loadAutores]);

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            Administración de Libros
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500" />
                Título del Libro
              </label>
              <input
                type="text"
                name="titulo"
                value={formik.values.titulo || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Título del Libro"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.titulo && formik.errors.titulo && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.titulo}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaTags className="mr-2 text-rose-500" />
                Género
              </label>
              <select
                name="idGenero"
                value={formik.values.idGenero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Género</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.idGenero && formik.errors.idGenero && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.idGenero}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaFileImage className="mr-2 text-purple-500" />
                URL Imagen
              </label>
              <input
                type="text"
                name="urlImg"
                value={formik.values.urlImg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="URL de la Imagen"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.urlImg && formik.errors.urlImg && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.urlImg}
                </p>
              )}
              {formik.values.urlImg && (
                <img
                  src={formik.values.urlImg}
                  alt="Vista previa"
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <BsPerson className="mr-2 text-gray-500" />
                Autor
              </label>
              <select
                name="idAutor"
                value={formik.values.idAutor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Autor</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nombreAutor}
                  </option>
                ))}
              </select>
              {formik.touched.idAutor && formik.errors.idAutor && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.idAutor}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaLink className="mr-2 text-yellow-500" />
                URL del PDF
              </label>
              <input
                type="text"
                name="urlPdf"
                value={formik.values.urlPdf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="URL del PDF"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.urlPdf && formik.errors.urlPdf && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.urlPdf}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdDescription className="mr-2 text-green-500" />
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Descripción"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.descripcion && formik.errors.descripcion && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.descripcion}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="col-span-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {modoEdicion ? "Guardar Cambios" : "Añadir Libro"}
            </button>
          </form>

          <ListaLibrosAdministracion
            onEditLibro={editarLibroHandler}
            onDeleteLibro={eliminarLibroHandler}
          />
        </div>
      </div>
    </div>
  );
};
