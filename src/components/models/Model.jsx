import React from "react";
import { createPortal } from "react-dom";
import { grey } from "../../constraints/colors";

function Model({ children, isOpen, onClose }) {
  return createPortal(
    <div
      onClick={onClose}
      className={`absolute flex justify-center items-center  z-50
      inset-0 bg-black/40 ${isOpen ? "visible" : "invisible"}`}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById("model")
  );
}

export default Model;
