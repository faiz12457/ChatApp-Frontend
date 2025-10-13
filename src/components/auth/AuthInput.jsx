import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

function AuthInput({
  type,
  placeholder,
  name,
  handlechange,
  handleblur,
  errors,
  value,
  touched,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-[279px]">
      <div className="w-full h-10 flex items-center justify-center   border rounded border-[#826A72]">
        <input
          className="w-full h-full  outline-none pl-2 "
          type={type === "password" && show ? "text" : type}
          value={value}
          onChange={handlechange}
          onBlur={handleblur}
          name={name}
          placeholder={placeholder}
        />

        {type === "password" && (
          <span onClick={() => setShow(!show)} className="mr-2 cursor-pointer">
            {" "}
            {show ? <FaRegEyeSlash size={22} /> : <FaRegEye size={23} />}
          </span>
        )}
      </div>

      <p className="text-[#DB4444] ml-1 mt-0.5 text-xs break-words whitespace-normal leading-tight">
        {errors && touched ? errors : null}{" "}
      </p>
    </div>
  );
}

export default AuthInput;
