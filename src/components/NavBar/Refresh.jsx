import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import classes from "./Refresh.module.css";
import Button from "../Buttons/Button";

const Refresh = ({ globalDispach }) => {
  return (
    //     {/* <FontAwesomeIcon icon={faArrowsRotate} /> */}
    //     {/* <FontAwesomeIcon icon={faArrowsRotate} spin /> */}

    <p className={classes.positon}>
      <Button callback={() => globalDispach({ type: "refresh" })}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </Button>
    </p>
  );
};

export default Refresh;
