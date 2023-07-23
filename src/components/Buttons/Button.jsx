import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, callback }) => {
  return (
    <button className={classes.button} onClick={() => callback?.()}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
