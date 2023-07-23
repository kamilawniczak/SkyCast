import React from "react";
import classes from "./LoadingScreenOverview.module.css";
import Loader from "../Loader";

const LoadingScreenOverview = () => {
  return (
    <div className={classes.info}>
      <div className={classes.main}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingScreenOverview;
