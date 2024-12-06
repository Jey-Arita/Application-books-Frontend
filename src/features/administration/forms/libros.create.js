import * as Yup from "yup";

export const crearInitLibro = {
    titulo: "",
    descripcion: "",
    idGenero: "",
    urlImg: "",
    urlPdf: "",
    idAutor: "",
};

export const createLibroValidationSchema = Yup.object({
    titulo: Yup.string().required("El nombre del Libro es requerido."),
    descripcion: Yup.string().required("La descripción es requerida."),
    idGenero: Yup.string().required("El genero del Libro es requerida"),
    urlImg: Yup.string().required("La imagen del Libro es requerida"),
    urlPdf: Yup.string().required("El documento del Libro es requerida"),
    idAutor: Yup.string().required("El autor del Libro es requerida"),
});
