import { configureStore} from "@reduxjs/toolkit";
import authSlice from "../redux/slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    authSlice,
  },
});
