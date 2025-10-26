import React, { useEffect, useState } from "react";

import { motion } from "motion/react";
import Otp2 from "../../components/auth/OTP";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  getOtpThunk,
  resetOtpStatus,
  resetVerifyOtpErrors,
  resetVerifyOtpStatus,
  selectLoginUser,
  selectOtpErrors,
  selectOtpStatus,
  selectVerifyOtpErrors,
  selectVerifyOtpStatus,
  setUserVerfied,
  verifyOtpThunk,
} from "../../redux/slices/auth/authSlice";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../Toast/toast";

const VerifyOpt = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const loginUser = useSelector(selectLoginUser);
  const otpStatus = useSelector(selectOtpStatus);
  const [gettingOtp, setGettingOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const verifyOtpStatus = useSelector(selectVerifyOtpStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (verifyOtpStatus == "pending") {
      setIsVerify(true);
    } else {
      setIsVerify(false);
    }

    if (verifyOtpStatus == "fullfilled") {
      dispatch(setUserVerfied());
      showToast.success("OTP Verified");

      navigate("/");
    }

    dispatch(resetVerifyOtpStatus());
    dispatch(resetVerifyOtpErrors());
  }, [verifyOtpStatus]);

  useEffect(() => {
    if (otpStatus == "pending") {
      setGettingOtp(true);
    }
    if (otpStatus == "fullfilled") {
      setShow(true);
      setGettingOtp(false);
      showToast.success("OTP sent to your email");
    }

    dispatch(resetOtpStatus());
  }, [otpStatus]);

  return (
    <div className="  w-full h-screen grid place-content-center">
      <div className="shadow space-y-6 text-center  p-8">
        <p className="text-2xl text-center font-medium  text-black">
          Verify Your Email Address
        </p>

        {show ? (
          <OTPInput
            email={loginUser?.email}
            otp={otp}
            setOtp={setOtp}
            isSubmitting={isVerify}
          />
        ) : (
          <GetOtp email={loginUser?.email} isSubmitting={gettingOtp} />
        )}
      </div>
    </div>
  );
};

function GetOtp({ email, isSubmitting }) {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getOtpThunk({ email }));
  }
  return (
    <div className="space-y-4">
      <p className="text-black opacity-75">
        We will send you a OTP on <br /> {email}
      </p>
      <Button
        title="GET OTP"
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

function OTPInput({ email, otp, setOtp, isSubmitting = false }) {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const code = otp.toString().replaceAll(",", "");

    if (code.length == 4) {
      dispatch(verifyOtpThunk({ email, otp: code }));
    } else {
      showToast.error("Enter 4 digits");
    }
  }

  return (
    <div className="  space-y-6 text-center ">
      <div className=" space-y-1">
        <p className="text-xl   text-black">
          Enter the 4 digit OTP sent on <br />
          {email}
        </p>
        <Otp2 otp={otp} setOtp={setOtp} />
      </div>
      <Button
        title="Verify"
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

function Button({ handleSubmit, title, className, isSubmitting }) {
  return (
    <motion.button
      onClick={handleSubmit}
      disabled={isSubmitting}
      type="submit"
      whileHover={{
        backgroundColor: "#DB4444",
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 1 }}
      style={{
        backgroundColor: "#18181b",
        transition: "backgroundColor 0.2s ease-in-out",
      }}
      className={`w-full disabled:bg-gray-200 disabled:opacity-50  disabled:cursor-not-allowed h-10 relative 
      rounded-sm cursor-pointer font-medium flex justify-center items-center text-center text-white ${className}`}
    >
      {isSubmitting ? (
        <div className=" size-7 border-4 border-gray-400  rounded-full border-t-white animate-spin"></div>
      ) : (
        title
      )}
    </motion.button>
  );
}

export default VerifyOpt;
