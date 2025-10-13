import React from "react";

export function AuthButton({ type = "submit", text, isSubmitting }) {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      style={{ background: " linear-gradient(to right, #c77dff, #8c36ff)" }}
      className=" w-[279px]
       cursor-pointer h-12 rounded text-white
        flex justify-center items-center text-base font-medium disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <span className="size-7  block rounded-full border-4 border-t-transparent border-white animate-spin"></span>
      ) : (
        text
      )}
    </button>
  );
}
