import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import classes from "./SwichTemp.module.css";
import Button from "../Buttons/Button";

const SwichTemp = ({ globalDispach }) => {
  return (
    <p className={classes.position}>
      <Button callback={() => globalDispach({ type: "setSettingVisible" })}>
        <FontAwesomeIcon icon={faGear} />
      </Button>
    </p>
  );
};

export default SwichTemp;

/* <button
        className={`${classes["btn--left"]} ${classes.btn} ${classes["btn--active"]}`}
      >
        °C
      </button>
      <button className={`${classes["btn--right"]} ${classes.btn}`}>°F</button> */
