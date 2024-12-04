import * as Yup from "yup";

export const registrarInitValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registroValidationSchema = Yup.object({
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El nombre es requerido"),
  email: Yup.string().required("El correo electrónico es requerido."),
  password: Yup.string()
    .required("La contraseña es requerida.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial."
    ),
  confirmPassword: Yup.string()
    .required("La confirmación de la contraseña es requerida.")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
});
