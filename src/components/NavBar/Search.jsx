import React, { useReducer } from "react";
import classes from "./Search.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ state, dispach }) => {
  return (
    <div className={classes.positon}>
      <div
        className={classes["search-box"]}
        onClick={() => dispach({ type: "toggleModal" })}
      >
        <input
          type="text"
          placeholder="Type to search"
          className={classes["search-input"]}
          disabled
        />
        <button className={classes["search-btn"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Search;
