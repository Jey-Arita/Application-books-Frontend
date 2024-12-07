import React, { useState, useEffect } from "react";
import { useGeneroStore } from "../store";
import { useDeleteGenero, useEditGenero } from "../hooks";
import { useGeneroList } from "../../book/hooks";
import { useFormik } from "formik";
import { crearInitGenero, createGeneroValidationSchema } from "../forms";

export const AdministracionGenero = () => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const addGenero = useGeneroStore((state) => state.addGenero);
  const { editarGenero, isLoadingEdit, errorEdit } = useEditGenero();
  const { eliminarGenero, isLoadingDelete, errorDelete } = useDeleteGenero();
  const { generos, loadGenero, isLoading, error } = useGeneroList();

  const formik = useFormik({
    initialValues: crearInitGenero,
    validationSchema: createGeneroValidationSchema,
    onSubmit: async (form) => {
      if (modoEdicion) {
        // Editar género
        const result = await editarGenero(modoEdicion, form);
        if (result) {
          loadGenero();
          formik.resetForm();
          setModoEdicion(null);
        }
      } else {
      await addGenero(form);
          loadGenero();
          formik.resetForm();
    
      }
    },
  });

  const editarGeneroHandler = (genero) => {
    setModoEdicion(genero.id);
    formik.setValues(genero); // Establecer valores en el formulario
  };

  const eliminarGeneroHandler = async (id) => {
    const result = await eliminarGenero(id);
    if (result) {
      loadGenero();
    }
  };

  useEffect(() => {
    loadGenero(); // Cargar géneros al iniciar el componente
  }, [loadGenero]);

  if (isLoading) {
    return <div>Cargando géneros...</div>;
  }

  if (error) {
    return <div>Error al cargar los géneros: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="w-full border p-4 rounded-md shadow-lg">
        <div className="text-2xl font-bold mb-2 text-blue-700">
          Gestión de Géneros Literarios
        </div>
        <div className="mb-4 text-gray-600">
          Añade, visualiza, edita y elimina géneros literarios
        </div>

        {/* Mostrar errores de edición o eliminación */}
        {(errorEdit || errorDelete) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {errorEdit && <p>Error al editar: {errorEdit}</p>}
            {errorDelete && <p>Error al eliminar: {errorDelete}</p>}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nuevo género"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`flex-grow border rounded-md p-2 ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
            )}
            <button
              type="submit"
              disabled={isLoadingEdit || isLoadingDelete}
              className={`bg-blue-500 text-white p-2 rounded-md flex items-center 
                ${isLoadingEdit || isLoadingDelete ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              <span className="mr-2">+</span>
              {modoEdicion ? "Editar" : "Añadir"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          {/* Visualización de géneros */}
          <div className="text-xl font-semibold mb-2">Lista de Géneros</div>
          {generos.length === 0 ? (
            <div className="text-gray-600">No hay géneros disponibles.</div>
          ) : (
            <div className="space-y-2">
              {generos.map((genero) => (
                <div
                  key={genero.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span>{genero.nombre}</span>
                  <div className="flex space-x-2">
                    <button
                      className="text-yellow-500 hover:text-yellow-700"
                      onClick={() => editarGeneroHandler(genero)}
                      disabled={isLoadingEdit || isLoadingDelete}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => eliminarGeneroHandler(genero.id)}
                      disabled={isLoadingEdit || isLoadingDelete}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 text-right">
          <span className="border border-gray-400 px-3 py-1 rounded-md">
            Total de géneros: {generos.length}
          </span>
        </div>
      </div>
    </div>
  );
};
