import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "../src/redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import { CssBaseline } from "@mui/material";
createRoot(document.getElementById("root")).render(
 // <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastContainer />
        <CssBaseline />
        <App />
      </HelmetProvider>
    </Provider>
//  </StrictMode>
);
