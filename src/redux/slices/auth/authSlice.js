import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  getOTP,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "./authApi";

const initialState = {
  successMessage: null,

  loginStatus: "idle",
  loginErrors: null,
  loggedInStatus:'idle',
  loginUser: null,

  logoutStatus: "idle",
  logoutErrors: null,

  registerUserStatus: "idle",
  registerUserError: null,

  otpStatus: "idle",
  otpError: null,

  verifyOtpStatus: "idle",
  verifyOtpError: null,
};

export const loginThunk = createAsyncThunk("/auth/login", async (values) => {
  const res = await loginUser(values);
  return res;
});

export const logoutThunk = createAsyncThunk("/auth/logout", async () => {
  const res = await logoutUser();
  return res;
});

export const registerUserThunk = createAsyncThunk(
  "/auth/register",
  async (values) => {
    const res = await registerUser(values);
    return res;
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "/auth/getme",
  async () => {
    const res = await getMe();
    return res;
  }
);

export const getOtpThunk = createAsyncThunk("/auth/getOtp", async (values) => {
  const res = await getOTP(values);
  return res;
});

export const verifyOtpThunk = createAsyncThunk(
  "/auth/veryOtp",
  async (values) => {
    const res = await verifyOtp(values);
    return res;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
    resetLoginErrors: (state) => {
      state.loginErrors = null;
    },

    resetAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },

    resetLogoutStatus: (state) => {
      state.logoutStatus = "idle";
    },
    resetLogoutErrors: (state) => {
      state.logoutErrors = null;
    },
    resetLoginUser: (state) => {
      state.loginUser = null;
    },

    resetRegisterUserStatus: (state) => {
      state.registerUserStatus = "idle";
    },

    resetRegisterUserErrors: (state) => {
      state.registerUserError = null;
    },

    resetOtpStatus: (state) => {
      state.otpStatus = "idle";
    },
    resetOtpErrors: (state) => {
      state.otpError = null;
    },
    resetVerifyOtpStatus: (state) => {
      state.verifyOtpStatus = "idle";
    },
    resetVerifyOtpErrors: (state) => {
      state.verifyOtpError = null;
    },

    resetLoggedInStatus:(state)=>{
      state.loggedInStatus='idle'
    },

    setUserVerfied:(state)=>{
      state.loginUser.isVerified=true
    }


  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loginStatus = "fullfilled";
        state.successMessage = action.payload.message;
        state.loginUser = action.payload.user;
        state.loginErrors = null;

        localStorage.setItem("accessToken", action.payload.user.accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginErrors = action.error.message;
        state.loginStatus = "rejected";
        state.successMessage = null;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.logoutStatus = "pending";
        state.logoutErrors = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.logoutStatus = "fullfilled";
        state.logoutErrors = null;
        state.loginUser=null;
        localStorage.removeItem("accessToken");
        state.successMessage = action.payload.message;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.logoutStatus = "rejected";
        state.logoutErrors = action.error.message;
        state.successMessage = null;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.registerUserStatus = "pending";
        state.registerUserError = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.registerUserStatus = "fullfilled";
        state.successMessage = action.payload.message;
        state.loginUser = action.payload.user;
        state.registerUserError = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.registerUserStatus = "rejected";
        state.registerUserError = action.error.message;
        state.successMessage = null;
      })
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.loggedInStatus="pending"
        state.loginUser = null;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
         state.loggedInStatus="fullfilled"
        state.loginUser = action.payload.user;
      })
      .addCase(getCurrentUserThunk.rejected, (state) => {
         state.loggedInStatus="rejected"
        state.loginUser = null;
      })
      .addCase(getOtpThunk.pending, (state) => {
        state.otpStatus = "pending";
        state.otpError = null;
      })
      .addCase(getOtpThunk.fulfilled, (state) => {
        state.otpStatus = "fullfilled";
        state.otpError = null;
      })
      .addCase(getOtpThunk.rejected, (state, action) => {
        state.otpStatus = "rejected";
        state.otpError = action.error.message;
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.verifyOtpStatus = "pending";
        state.verifyOtpError = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.verifyOtpStatus = "fullfilled";
        state.verifyOtpError = null;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.verifyOtpStatus = "rejected";
        state.verifyOtpError = action.error.message;
      });
  },
});

export const {
  resetAuthSuccessMessage,
  resetLoginErrors,
  resetLogoutStatus,
  resetLogoutErrors,
  resetLoginStatus,
  resetLoginUser,
  resetRegisterUserErrors,
  resetRegisterUserStatus,
  resetOtpErrors,
  resetOtpStatus,
  resetVerifyOtpStatus,
  resetVerifyOtpErrors,
  resetLoggedInStatus,
  setUserVerfied,
} = authSlice.actions;

export const selectLoginStatus = (state) => state.authSlice.loginStatus;
export const selectLoginErrors = (state) => state.authSlice.loginErrors;
export const selectLoginUser = (state) => state.authSlice.loginUser;
export const selectAuthSuccessMsg = (state) => state.authSlice.successMessage;
export const selectLogoutStatus = (state) => state.authSlice.logoutStatus;
export const selectLogoutErrors = (state) => state.authSlice.logoutErrors;
export const selectRegisterUserStatus = (state) =>
  state.authSlice.registerUserStatus;
export const selectRegisterUserErrors = (state) =>
  state.authSlice.registerUserError;
export const selectOtpStatus = (state) => state.authSlice.otpStatus;
export const selectOtpErrors = (state) => state.authSlice.otpError;
export const selectVerifyOtpStatus = (state) => state.authSlice.verifyOtpStatus;
export const selectVerifyOtpErrors = (state) => state.authSlice.verifyOtpError;
export const selectLoggedInStatus=(state)=>state.authSlice.loggedInStatus;
export default authSlice.reducer;
