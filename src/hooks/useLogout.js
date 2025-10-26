import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../redux/slices/auth/authSlice";
import { useState } from "react";
import { showToast } from "../Toast/toast";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function logout() {
    const toastId = showToast.loading("Logging out...");
    setSubmitting(true);

    try {
      await dispatch(logoutThunk()).unwrap(); 
      showToast.updateSuccess(toastId, "Logout Successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      showToast.updateError(toastId, "Logout Failed");
    } finally {
      setSubmitting(false);
    }
  }

  return { logout, submitting };
}
