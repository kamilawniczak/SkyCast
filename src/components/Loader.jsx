import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ styleSpiner, styleOverflow = { borderRadius: "2rem" } }) => {
  return (
    <div className={classes.overflow} style={styleOverflow}>
      <span className={classes.loader} style={styleSpiner}>
        &nbsp;
      </span>
    </div>
  );
};

export default Loader;
