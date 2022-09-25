import { useEffect } from "react";

const useShooting = () => {
  const shoot = () => {};

  useEffect(() => {
    window.addEventListener("dblclick", shoot);

    return () => {
      window.removeEventListener("dblclick", shoot);
    };
  }, []);
};

export default useShooting;
