import { useEffect, useRef } from "react";

export const useInsideClick = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
a
  return ref;
};
