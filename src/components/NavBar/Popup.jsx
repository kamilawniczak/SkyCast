import React, { useEffect, useRef } from "react";

import classes from "./Popup.module.css";

import Error from "./Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import ListOfPlaces from "./ListOfPlaces";
import { useKey } from "../Hooks/useKey";
import Loader from "../Loader";

const Popup = ({ state, globalState, dispach, globalDispach }) => {
  const inputId = useRef();
  useEffect(() => {
    inputId.current.focus();
  }, [inputId]);

  const handleClick = () => {
    if (state.data.length === 0) {
      dispach({ type: "error", payload: "Empty input !!!" });
      return;
    }

    const choosedPlace = state.data[0];
    const [lon, lat] = choosedPlace.geometry.coordinates;

    const info = choosedPlace.properties;

    const selectedPlaceInfo = {
      contry: info.country,
      name: info.name || info.city || info.state,
      lat,
      lon,
      formatted: info.formatted,
    };
    dispach({ type: "selectPlace", payload: selectedPlaceInfo });

    globalDispach({
      type: "receive",
      payload: selectedPlaceInfo,
    });
  };

  useKey("escape", () => dispach({ type: "toggleModal" }));
  useKey("enter", () => handleClick());

  return (
    <div className={classes.modal}>
      <span
        className={classes.overley}
        onClick={() => {
          dispach({ type: "toggleModal" });
        }}
      ></span>
      <div className={classes["modal__box"]}>
        <div className={classes["modal__header"]}>
          <span>Search Locations</span>
          <button
            className={classes["modal__btn"]}
            onClick={() => {
              dispach({ type: "toggleModal" });
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={classes["modal__body"]}>
          <div className={classes["input-group"]}>
            <input
              className={classes["input-group__input"]}
              value={state.value}
              onChange={(e) =>
                dispach({ type: "setValue", payload: e.target.value })
              }
              ref={inputId}
            />
            <button
              className={classes["input-group__btn"]}
              onClick={() => handleClick()}
            >
              <FontAwesomeIcon icon={faLocationArrow} />
            </button>
          </div>
          {state.error && <Error error={state.error} />}
          {state.loading && (
            <div className={classes.loader}>
              <Loader
                styleOverflow={{
                  position: "relative",
                  height: "7rem",
                  borderRadius: "2rem",
                }}
              />
            </div>
          )}
          {state.data.length === 0 || state.loading || (
            <div className={classes["list-group"]}>
              <ListOfPlaces
                state={state}
                globalState={globalState}
                dispach={dispach}
                globalDispach={globalDispach}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
