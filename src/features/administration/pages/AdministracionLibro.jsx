import { useEffect, useState } from "react";
import {
  MdOutlineDriveFileRenameOutline,
  MdDescription,
  MdClose,
} from "react-icons/md";
import { FaFileImage, FaTags, FaLink } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { useFormik } from "formik";
import { crearInitLibro, createLibroValidationSchema } from "../forms";
import { useLibrosStore } from "../store";
import { useEditLibro } from "../hooks/useEditLibro";
import { useDeleteLibro, useLibros } from "../hooks";
import { useAutor, useGeneroList } from "../../book/hooks";
import { ListaLibrosAdministracion } from "../components";

export const AdministracionLibro = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const addLibro = useLibrosStore((state) => state.addLibro);
  const { editarLibro, isLoadingEdit } = useEditLibro();
  const { eliminarLibro } = useDeleteLibro();
  const { autores, loadAutores } = useAutor();
  const { generos, loadGenero } = useGeneroList();
  const { libro, isLoading } = useLibros(libroSeleccionado?.id);

  const formik = useFormik({
    initialValues: crearInitLibro,
    validationSchema: createLibroValidationSchema,
    onSubmit: async (form) => {
      try {
        if (libroSeleccionado) {
          // Modo edición
          const result = await editarLibro(libroSeleccionado.id, form);
          if (result) {
            loadAutores(); // Recargar lista de autores
            formik.resetForm();
            setModalVisible(false);
            setLibroSeleccionado(null);
          }
        } else {
          // Modo creación
          await addLibro(form);
          formik.resetForm();
          setModalVisible(false);
        }
      } catch (error) {
        console.error("Error al guardar el libro:", error);
      }
    },
  });

  const abrirModalCreacion = () => {
    formik.resetForm();
    setLibroSeleccionado(null);
    setModalVisible(true);
  };

  const abrirModalEdicion = (id) => {
    setLibroSeleccionado({ id }); // Establece el id del libro para cargar sus detalles
    setModalVisible(true); // Muestra el modal de edición
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setLibroSeleccionado(null);
    formik.resetForm();
  };

  useEffect(() => {
    loadGenero();
    loadAutores();
  }, [loadAutores]);

  useEffect(() => {
    if (libroSeleccionado?.id && libro) {
      formik.setValues({
        titulo: libro.titulo || '',
        idGenero: libro.idGenero || '',
        urlImg: libro.urlImg || '',
        idAutor: libro.idAutor || '',
        urlPdf: libro.urlPdf || '',
        descripcion: libro.descripcion || ''
      });
    }
  }, [libro, libroSeleccionado?.id]);

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          Administración de Libros
        </h1>

        <button
          onClick={abrirModalCreacion}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Añadir Nuevo Libro
        </button>

        <ListaLibrosAdministracion
          onEditLibro={(libro) => abrirModalEdicion(libro)}
          onDeleteLibro={eliminarLibro}
        />

        {/* Modal de Edición/Creación */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={cerrarModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <MdClose size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {libroSeleccionado ? "Editar Libro" : "Añadir Nuevo Libro"}
              </h2>

              <form
                onSubmit={formik.handleSubmit}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Título */}
                <div>
                  <label className="flex items-center text-lg font-medium text-gray-700">
                    <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500" />
                    Título del Libro
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formik.values.titulo ?? ""}
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

                {/* Género */}
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

                {/* URL Imagen */}
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

                {/* Autor */}
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

                {/* URL PDF */}
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

                {/* Descripción */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-lg font-medium text-gray-700">
                    <MdDescription className="mr-2 text-blue-500" />
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Descripción del Libro"
                    className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.descripcion && formik.errors.descripcion && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.descripcion}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isLoadingEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    {libroSeleccionado ? "Guardar Cambios" : "Añadir Libro"}
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
