import { useEffect, useRef } from "react";

export const useOutsideClick = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current &&!ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return ref;
};
