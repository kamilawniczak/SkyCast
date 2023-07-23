import React, { useEffect } from "react";

const useOvervlow = (update) => {
  useEffect(() => {
    if (update) document.body.style.overflow = "hidden";
    if (!update) document.body.style.overflow = "visible";
  }, [update]);
};

export { useOvervlow };
