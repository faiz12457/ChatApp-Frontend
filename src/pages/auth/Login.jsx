import React, { useEffect } from "react";
import { useFormik } from "formik";
import AuthInput from "../../components/auth/AuthInput";
import { loginSchema } from "../../schemas/loginSchema";
import { AuthButton } from "../../components/auth/AuthButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  resetLoginErrors,
  resetLoginStatus,
  selectLoginErrors,
  selectLoginStatus,
  selectLoginUser,
} from "../../redux/slices/auth/authSlice";
import { Slide, toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector(selectLoginStatus);
  const loginErrors = useSelector(selectLoginErrors);
  const loginUser = useSelector(selectLoginUser);


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

      await dispatch(loginThunk(values));
      actions.resetForm();
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      actions.setSubmitting(false);
    }
  }

  useEffect(() => {
    if (loginStatus === "fullfilled" && loginUser.isVerified == true) {
        
      toast.success("Login Successfull", {
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

      navigate("/");
    }

    if (loginStatus === "fullfilled" && loginUser.isVerified == false) {
      toast.success("Login Successfull", {
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

      navigate("/verifyOtp");
    }

    dispatch(resetLoginStatus());
    dispatch(resetLoginErrors());
  }, [loginStatus]);

  useEffect(() => {
    if (loginErrors) {
      toast.error(loginErrors, {
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
  }, [loginErrors]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
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
  const { email, password } = values;

  return (
    <div
      style={{ backgroundImage: "url(./bgImage.svg)" }}
      className="w-full  h-screen bg-center bg-contain"
    >
      <div className="flex justify-evenly items-center border backdrop-blur-2xl   h-full">
        <div className="flex w-fit flex-col items-center justify-center ">
          <img src="./favicon.svg" className="size-30" />
          <h3 className="font-semibold text-4xl text-white">Quick Chat</h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" rounded-xl  flex flex-col gap-6 p-6 border-2 border-[#826A72]   text-white"
        >
          <p className="text-2xl font-semibold text-white">Login</p>

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
          <AuthButton text={"Login Now"} isSubmitting={isSubmitting} />

<div className="flex justify-between">
          <p className="text-xs font-medium text-[#654A55]">
            Create an account{" "}
            <NavLink
              to={"/register"}
              className=" hover:underline text-[#8c36ff]"
            >
              Click here
            </NavLink>
          </p>

       <NavLink to={'/forgotPassword'}  className=" text-xs hover:underline text-[#8c36ff]">Forgot Password?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
