import { useEffect, useRef } from "react";

export const useInsideClick = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
a
  return ref;
};
