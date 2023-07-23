import React from "react";
import classes from "./Main.module.css";

const Main = ({ children }) => {
  return <main className={classes.container}>{children}</main>;
};

export default Main;
