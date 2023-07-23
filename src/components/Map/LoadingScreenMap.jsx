import React from "react";
import classes from "./LoadingScreenMap.module.css";
import Loader from "../Loader";

const LoadingScreenMap = () => {
  return (
    <div className={classes.info}>
      <div className={classes.main}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingScreenMap;
