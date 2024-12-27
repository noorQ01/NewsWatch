import * as yup from "yup";
export const userSchemaValidation = yup.object().shape({
  userName: yup.string().required("Username required"),
  email: yup.string().email("Not email format").required("Email required"),
  password: yup.string().min(8).max(30).required("Password required"),
});
