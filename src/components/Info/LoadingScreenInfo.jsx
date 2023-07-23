import React from "react";
import classes from "./LoadingScreenInfo.module.css";
import Loader from "../Loader";

const LoadingScreenInfo = () => {
  return (
    <div className={classes.info}>
      <div className={classes.main}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingScreenInfo;
