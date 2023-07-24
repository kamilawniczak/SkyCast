import React from "react";
import classes from "./PlaceOption.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";

const PlaceOption = ({ place, dispach, globalDispach, isSelected }) => {
  const [lon, lat] = place.geometry.coordinates;
  const info = place.properties;
  const countryCode = info.country_code.toUpperCase();

  const selectedPlaceInfo = {
    contry: info.country,
    name: info.name || info.city || info.state,
    lat,
    lon,
    formatted: info.formatted,
    loading: true,
  };
  return (
    <li className={classes["list-element"]} tabIndex="0">
      <div
        className={classes.box}
        onClick={() => {
          dispach({ type: "selectPlace", payload: selectedPlaceInfo });
          globalDispach({
            type: "receive",
            payload: selectedPlaceInfo,
          });
        }}
      >
        <div className={classes.flag}>
          <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt={info.country}
            className={classes.img}
          />
        </div>
        <div className={classes.info}>
          <p className={classes["country-name"]}>{info.country}</p>
          <p className={classes["country-info"]}>{info.formatted}</p>
        </div>
      </div>
      <button
        className={classes.handler}
        onClick={() =>
          globalDispach({
            type: `${isSelected ? "remove" : "add"}`,
            payload: selectedPlaceInfo,
          })
        }
      >
        {isSelected ? (
          <FontAwesomeIcon icon={solid} />
        ) : (
          <FontAwesomeIcon icon={regular} />
        )}
      </button>
    </li>
  );
};

export default PlaceOption;
// `${isSelected ? "remove" :"add"}`:
