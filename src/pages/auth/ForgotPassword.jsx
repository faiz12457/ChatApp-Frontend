import React, { useState } from "react";

import { motion, useSpring } from "motion/react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

import { Slide, toast } from "react-toastify";
import api from "../../api" 
import { ForgotPassSchema } from "../../schemas/forgotPasswordSchema";
import AuthInput from "../../components/auth/AuthInput";
import { AuthButton } from "../../components/auth/AuthButton";


 const ForgotPassword=()=> {
  const [send, setSend] = useState(false);
  async function onSubmit(values, actions) {
    try {
      actions.setSubmitting(true);
      const res = await api.post("/auth/forgotPassword", values);
      if (res.status === 200) {
        setSend(true);
        toast.success(res.data.message, {
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
    } catch (error) {
    } finally {
      actions.setSubmitting(false);
      actions.resetForm();
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema,
    onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;
  const { email } = values;
  return (
    
    <div className="grid place-content-center w-full h-screen">
      {!send ? (
        <>
          <form
            onSubmit={handleSubmit}
            className=" h-[268px]  shadow p-6 flex items-center "
          >
            <div className="flex flex-col gap-4    ">
              <div className="space-y-2">
                <h5 className=" text-2xl md:text-3xl font-bold text-black">
                  {" "}
                  Forgot Your Password?
                </h5>
                <p className="text-black opacity-70">
                  Enter your registered email below to receive password reset
                  link
                </p>
              </div>

              <AuthInput
                type="email"
                name={"email"}
                placeholder={"Enter email"}
                value={email}
                touched={touched.email}
                errors={errors.email}
                handlechange={handleChange}
                handleblur={handleBlur}
              />
              <AuthButton
                text={"SEND PASSWORD RESET LINK"}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </>
      ) : (
       
        <SentEmailBox />
       
      )}
      <motion.p
        className="cursor-pointer  ml-1.5 text-zinc-800 text-[1.2rem] mt-2 "
        whileHover={{
          x: "3px",
        }}
      >
        <NavLink to={"/login"}>
          Go back to <span className= " text-[#db4444] hover:underline">login</span>
        </NavLink>
      </motion.p>
    </div>
  );
}

function SentEmailBox() {
  return (

    
    <div className="  ">

    <div className=" w-[480px] h-[132px] shadow p-6">
      <div className="space-y-2  text-center  ">
        <h5 className="text-2xl font-bold text-black">Email has been sent!</h5>
        <p className="text-black opacity-70">
          Please check your inbox and click on the received link to reset your
          password
        </p>
      </div>
    </div>
    </div>
  );
}


export default ForgotPassword