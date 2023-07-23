import React from "react";
import classes from "./LoadingScreenForecast.module.css";
import Loader from "../Loader";

const LoadingScreenForecast = () => {
  return (
    <div className={classes.info}>
      <div className={classes.main}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingScreenForecast;
