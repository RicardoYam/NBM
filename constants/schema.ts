import * as Yup from "yup";
import { REQUIRED_MESSAGE, WRONG_FORMAT_MESSAGE } from "@/constants/strings";

export const VALIDATIONSCHEMA_SIGN_UP = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED_MESSAGE("first name")),
  lastName: Yup.string().required(REQUIRED_MESSAGE("last name")),
  email: Yup.string()
    .email(WRONG_FORMAT_MESSAGE)
    .required(REQUIRED_MESSAGE("email")),
  password: Yup.string()
    .matches(/\d/, "Password must include at least one number.")
    .matches(/[^A-Za-z0-9]/, "Password must include at least one symbol.")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include both uppercase and lowercase letters."
    )
    .required(REQUIRED_MESSAGE("password")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match.")
    .required(REQUIRED_MESSAGE("confirm password")),
});

export const VALIDATIONSCHEMA_UPDATE_PASSWORD = Yup.object().shape({
  currentPassword: Yup.string().required(REQUIRED_MESSAGE("current password")),
  newPassword: Yup.string()
    .matches(/\d/, "Password must include at least one number.")
    .matches(/[^A-Za-z0-9]/, "Password must include at least one symbol.")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include both uppercase and lowercase letters."
    )
    .required(REQUIRED_MESSAGE("new password")),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match.")
    .required(REQUIRED_MESSAGE("confirm new password")),
});

export const VALIDATIONSCHEMA_CREATE_POST = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
});
