import { Slide, toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

export const showToast = {
  success: (msg) => toast.success(msg, defaultOptions),
  error: (msg) => toast.error(msg, defaultOptions),
  warning: (msg) => toast.warn(msg, defaultOptions),
  loading: (msg = "Loading...") =>
    toast.loading(msg, { ...defaultOptions, autoClose: false }),

  updateSuccess: (toastId, message = "Success") =>
    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 1500,
      ...defaultOptions,
    }),

  // ✅ NEW: update loading toast to error
  updateError: (toastId, message = "Error") =>
    toast.update(toastId, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 1500,
      ...defaultOptions,
    }),
};
