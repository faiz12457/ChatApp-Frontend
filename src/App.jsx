import React, { useEffect, useMemo, lazy } from "react";
import { io } from "socket.io-client";
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  selectLoggedInStatus,
} from "./redux/slices/auth/authSlice";
import NotFound from "./pages/NotFound";





const VerifyOpt=lazy(()=>import("./pages/auth/VerifyOpt"));
const ForgotPassword =lazy(()=>import("./pages/auth/ForgotPassword"))
const ProtectedRoute=lazy(()=>import("./components/auth/ProtectedRoute")) ;
const Register=lazy(()=>import("./pages/auth/Register"))
const ResetPassword = lazy(()=>import("./pages/auth/ResetPassword")) ;
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const Group = lazy(() => import("./pages/Group"));
const About = lazy(() => import("./pages/About"));
const Chat=lazy(()=>import("./pages/Chat"))


const socket=io(import.meta.env.VITE_LOCAL_URL);
function App() {
 // const socket = useMemo(() => io(import.meta.env.VITE_LOCAL_URL),[]);
  const dispatch = useDispatch();

  const status = useSelector(selectLoggedInStatus);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(getCurrentUserThunk());
    }
  }, []);





  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute Component={<Home socket={socket} />} /> ,
    },
    {
      path: "/about",
      element: <ProtectedRoute Component={<About />} /> ,
    },

    {
      path: "/chat/:chatId",
      element: <ProtectedRoute Component={<Chat />} /> ,
    },

    {
      path: "/groups",
      element:<ProtectedRoute Component={<Group />} /> ,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/verifyOtp",
      element: <VerifyOpt />,
    },

    {
      path:'/forgotPassword',
      element:<ForgotPassword />
    },

    {
      path:'/reset-password/:userId',
      element:<ResetPassword />
    },

    {
      path:'*',
      element:<NotFound />
    }
  ]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
