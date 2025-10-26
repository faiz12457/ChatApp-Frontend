import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  selectLoggedInStatus,
} from "./redux/slices/auth/authSlice";
import NotFound from "./pages/NotFound";
import Loader from "./Loaders/Loader";

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const VerifyOpt = lazy(() => import("./pages/auth/VerifyOpt"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const Register = lazy(() => import("./pages/auth/Register"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const Group = lazy(() => import("./pages/Group"));
const About = lazy(() => import("./pages/About"));
const Chat = lazy(() => import("./pages/Chat"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute Component={<Home />} />,
    },
    {
      path: "/about",
      element: <ProtectedRoute Component={<About />} />,
    },

    {
      path: "/chat/:chatId",
      element: <ProtectedRoute Component={<Chat />} />,
    },

    {
      path: "/groups",
      element: <ProtectedRoute Component={<Group />} />,
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
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },

    {
      path: "/reset-password/:userId",
      element: <ResetPassword />,
    },

    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen grid place-content-center">
          <Loader />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
