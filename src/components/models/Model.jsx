import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

function Model({ children, isOpen, onClose }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="absolute flex justify-center items-center z-50 inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("model")
  );
}

export default Model;
