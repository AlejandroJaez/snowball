import { required, confirmed, length, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "*Campo requerido.",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match",
});

extend("positive", (value) => {
  if (value >= 0) {
    return true;
  }

  return "*El valor debe ser un numero positivo.";
});

extend("length", {
  ...length,
  message: "This field must have 2 options",
});
