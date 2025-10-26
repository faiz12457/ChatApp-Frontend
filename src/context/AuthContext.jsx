import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  selectLoggedInStatus,
} from "../redux/slices/auth/authSlice";
import Loader from "../Loaders/Loader";

export const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

export const Auth = ({ children }) => {
  const dispatch = useDispatch();

  const status = useSelector(selectLoggedInStatus);
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(getCurrentUserThunk());
    }
  }, []);

  return status === "pending" ? (
    <div className="w-full h-screen grid place-content-center">
      <Loader />
    </div>
  ) : (
    <AuthContext.Provider value={''}>{children}</AuthContext.Provider>
  );
};
