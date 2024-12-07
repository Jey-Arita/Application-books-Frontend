import * as Yup from "yup";

export const crearInitGenero = {
    nombre: ""
};

export const createGeneroValidationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del genero es requerido."),
});
