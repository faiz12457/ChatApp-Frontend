import React, { useEffect } from "react";
import { useFormik } from "formik";
import AuthInput from "../../components/auth/AuthInput";
import { AuthButton } from "../../components/auth/AuthButton";
import { NavLink, useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas/registerSchema";
import {
  registerUserThunk,
  resetRegisterUserErrors,
  resetRegisterUserStatus,
  selectLoginUser,
  selectRegisterUserErrors,
  selectRegisterUserStatus,
} from "../../redux/slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerStatus = useSelector(selectRegisterUserStatus);
  const loginUser = useSelector(selectLoginUser);
  const registerError=useSelector(selectRegisterUserErrors);

  
  
      useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token && loginUser?.isVerified) {
        navigate("/");
      } else if (token && loginUser?.isVerified == false) {
        navigate("/verifyOtp");
      }
    }, [loginUser]);

  async function onSubmit(values, actions) {
    try {
      actions.setSubmitting(true);

      await dispatch(registerUserThunk(values));

      actions.resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      actions.setSubmitting(false);
    }
  }

  useEffect(() => {
    if (registerStatus === "fullfilled") {
      toast.success("Welcome! Verify your email to start Chating.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      localStorage.setItem("accessToken", loginUser?.accessToken);

      navigate("/verifyOtp");
    }
  }, [registerStatus]);

   useEffect(()=>{
    if(registerError){
        toast.error(registerError, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
           
    }

    dispatch(resetRegisterUserStatus());
    dispatch(resetRegisterUserErrors());
  },[registerError])

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;
  const { email, password, userName } = values;

  return (
    <div
      style={{ backgroundImage: "url(./bgImage.svg)" }}
      className="w-full  h-screen bg-center bg-contain"
    >
      <div className="flex justify-evenly items-center border backdrop-blur-2xl  h-full">
        <div className="flex w-fit flex-col items-center justify-center ">
          <img src="./favicon.svg" className="size-30" />
          <h3 className="font-semibold text-4xl text-white">Quick Chat</h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" rounded-xl flex flex-col gap-6 p-6 border-2 border-[#826A72]   text-white"
        >
          <p className="text-2xl font-semibold text-white">Sign up</p>

          <AuthInput
            name={"userName"}
            type={"text"}
            placeholder={"Full Name"}
            value={userName}
            handlechange={handleChange}
            handleblur={handleBlur}
            errors={errors.userName}
            touched={touched.userName}
          />
          <AuthInput
            name={"email"}
            type={"email"}
            placeholder={"Email Address"}
            value={email}
            handlechange={handleChange}
            handleblur={handleBlur}
            errors={errors.email}
            touched={touched.email}
          />

          <AuthInput
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            value={password}
            handlechange={handleChange}
            handleblur={handleBlur}
            errors={errors.password}
            touched={touched.password}
          />
          <AuthButton text={"Create Account"} isSubmitting={isSubmitting} />

          <p className="text-xs font-medium text-[#654A55]">
            Already have an account?{" "}
            <NavLink to={"/login"} className=" hover:underline text-[#8c36ff]">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
