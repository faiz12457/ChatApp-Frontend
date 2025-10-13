import * as yup from "yup";
import { passRules } from "../utils/passRules";

export const registerSchema = yup.object().shape({
  userName:yup.string().required("Full name is requried"),
  
    email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passRules, {
      message:
        "Password must include upper and lower case, number, and special character",
    })
    .required('Password is required'),
});
