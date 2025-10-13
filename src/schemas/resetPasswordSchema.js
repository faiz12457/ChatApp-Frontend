import * as yup from "yup";
import { passRules } from "../utils/passRules";


export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .matches(passRules, {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    })
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not matched")
    .required("Confirm Password is required"),
});
