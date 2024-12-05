import * as Yup from "yup";

export const crearInitAutores = {
  nombreAutor: "",
  bibliografia: "",
  urlImg: "",
};

export const createAutorValidationSchema = Yup.object({
  nombreAutor: Yup.string().required("El nombre del Autor es requerido."),
  bibliografia: Yup.string().required("La bibliografía es requerida."),
  urlImg: Yup.string().required("La imagen del Autor es requerida"),
});
