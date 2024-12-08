import * as Yup from "yup";

export const crearInitMembresia = {
    tipoMembresia : "", 
};

export const createMembresiaValidationSchema = Yup.object({
    tipoMembresia: Yup.string().oneOf(['Gratis', 'Premium'], 'Tipo de membresía inválido').required("El tipo de membresía es requerido."),
})
