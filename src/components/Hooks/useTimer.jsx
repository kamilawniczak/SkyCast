import React, { useEffect } from "react";

export const useTimer = (dispach, leftRefreshTime) => {
  useEffect(() => {
    const callback = () => {
      if (leftRefreshTime === 0) {
        dispach?.({ type: "resetRefreashTime" });
        dispach?.({ type: "refresh" });
      }
      if (leftRefreshTime > 0) dispach({ type: "decreseRefreashTime" });
    };

    const id = setInterval(callback, 1000 * 60);

    return () => clearInterval(id);
  }, [leftRefreshTime, dispach]);
};
