import React, { useState, useEffect } from "react";

import { useGeneroStore } from "../store";
import { useDeleteGenero, useEditGenero } from "../hooks";
import { useGeneroList } from "../../book/hooks";
import { useFormik } from "formik";
import { crearInitGenero, createGeneroValidationSchema } from "../forms";
import { FaBookOpen, FaPencilAlt, FaRegTrashAlt, FaTags } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";

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
    formik.setValues(genero);
  };

  const eliminarGeneroHandler = async (id) => {
    const result = await eliminarGenero(id);
    if (result) {
      loadGenero();
    }
  };

  useEffect(() => {
    loadGenero();
  }, [loadGenero]);


  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-2xl rounded-xl">
      <div className="flex items-center mb-6">
        <FaTags className="w-6 h-6 mr-4 text-rose-500" />
        <h1 className="text-3xl font-bold text-black">
          Gestión de Géneros Literarios
        </h1>
      </div>

      {/* Sección de Errores */}
      {(errorEdit || errorDelete) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-center">
          <GoXCircle className="text-red-500 mr-3" />
          <div>
            {errorEdit && <p className="text-red-700">Error al editar: {errorEdit}</p>}
            {errorDelete && <p className="text-red-700">Error al eliminar: {errorDelete}</p>}
          </div>
        </div>
      )}

      {/* Formulario de Géneros */}
      <form onSubmit={formik.handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <div className="flex-grow relative">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del género"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 pl-10 border-2 rounded-lg transition-all ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-blue-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
            />
            <FaPencilAlt 
    
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" 
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.nombre}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoadingEdit || isLoadingDelete}
            className="bg-blue-600 text-white p-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {modoEdicion ? (
              <>
                <CiCircleCheck className="mr-2" />
                Actualizar
              </>
            ) : (
              <>
                <CiCirclePlus className="mr-2" />
                Añadir
              </>
            )}
          </button>
        </div>
      </form>

      {/* Lista de Géneros */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <FaBookOpen size={24} className="mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold text-blue-800">
            Géneros Registrados
          </h2>
        </div>

        {generos.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <FaBookOpen className="mx-auto mb-4 text-gray-300" />
            <p>No hay géneros disponibles</p>
          </div>
        ) : (
          <div className="space-y-3">
            {generos.map((genero) => (
              <div
                key={genero.id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-gray-700 font-medium">{genero.nombre}</span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => editarGeneroHandler(genero)}
                    disabled={isLoadingEdit || isLoadingDelete}
                    className="text-yellow-500 hover:text-yellow-600 disabled:opacity-50"
                  >
                    <FaPencilAlt /> 
                  </button>
                  <button
                    onClick={() => eliminarGeneroHandler(genero.id)}
                    disabled={isLoadingEdit || isLoadingDelete}
                    className="text-red-500 hover:text-red-600 disabled:opacity-50"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contador de Géneros */}
      <div className="mt-6 flex justify-end items-center space-x-2">
        <FaBookOpen  className="text-blue-500" />
        <span className="text-gray-700 font-medium">
          Total de géneros: {generos.length}
        </span>
      </div>
    </div>
  );
};