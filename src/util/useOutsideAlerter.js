import { useEffect } from "react";

const useOutsideAlerter = (ref, ref2, setIsOpen) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        ref2.current &&
        !ref.current.contains(event.target) &&
        !ref2.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ref2, setIsOpen]);
};

export default useOutsideAlerter;