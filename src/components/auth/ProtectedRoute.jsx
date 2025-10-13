import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../../redux/slices/auth/authSlice";


function ProtectedRoute({ Component }) {
  const navigate = useNavigate();
  const loginUser = useSelector(selectLoginUser);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    } else if (token && loginUser?.isVerified === false) {
      navigate("/verifyOtp");
      return;
    }

    
  }, [loginUser]);

  return <>{Component}</>;
}

export default ProtectedRoute;
