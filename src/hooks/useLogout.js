

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../redux/slices/auth/authSlice";
import { Slide, toast } from "react-toastify";
import { useState } from "react";






export function useLogout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

      async function logout() {
        try {
          setSubmitting(true);
          await dispatch(logoutThunk());
        } catch (error) {
          console.log("Logout error", error);
        } finally {
          setSubmitting(false);
           toast.success('Logout Successfully', {
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
          navigate("/login");
        }
      }

      return {logout,submitting};


}