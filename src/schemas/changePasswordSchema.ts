import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6).max(32).required("Old password is required"),
  newPassword: yup.string().min(6).max(32).required("Old password is required"),
});
