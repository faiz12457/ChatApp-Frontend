import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../../redux/slices/auth/authSlice";

function ProtectedRoute({ Component }) {
  const loginUser = useSelector(selectLoginUser);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  if (token && loginUser?.isVerified === false) {
    return <Navigate to={"/verifyOtp"} state={{ from: location }} />;
  }

  return <>{Component}</>;
}

export default ProtectedRoute;
