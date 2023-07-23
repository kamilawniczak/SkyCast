import React from "react";
import classes from "./Error.module.css";

const Error = ({ error }) => {
  return <div className={classes.box}>{error}</div>;
};

export default Error;
