import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "../src/redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Title from "../src/components/shared/Title.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { Socket } from "./context/socketContext.jsx";
import { Auth } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <Title />
      <ToastContainer />
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Auth>
          <Socket>
            <App />
          </Socket>
        </Auth>
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>
  //  </StrictMode>
);
