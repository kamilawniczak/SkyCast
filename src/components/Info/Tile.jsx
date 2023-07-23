import React from "react";
import classes from "./Tile.module.css";
import { useWeatherIcon } from "../Hooks/useWeatherIcon";

const Tile = ({ info, active }) => {
  const [icon, description] = useWeatherIcon(info.weathercode);
  const {
    temp,
    windSpeed,
    surface_pressure,
    humidity,
    winddirection,
    precipitation,
  } = info.units;
  return (
    <div className={`${classes["list-element"]} `}>
      <div
        className={`${classes["list-element-card"]} ${
          classes["list-element-front"]
        } ${active ? classes["list-element--active"] : ""}`}
      >
        <p className={classes["list-element--hour"]}> {info.time}</p>
        <p className={classes["list-element--icon"]}>{icon}</p>
        <p className={classes["list-element--temp"]}>
          {info.temp}
          <span>{temp}</span>
        </p>
      </div>
      <div
        className={`${classes["list-element-card"]} ${
          classes["list-element-back"]
        } ${active ? classes["list-element--active"] : ""}`}
      >
        <div>
          <p className={classes.name}>Pressure</p>
          <p className={classes.data}>
            {info?.surface_pressure} ({surface_pressure})
          </p>
        </div>
        <div>
          <p className={classes.name}>Precipitation</p>
          <p className={classes.data}>
            {info?.precipitation} ({precipitation})
          </p>
        </div>
        <div>
          <p className={classes.name}>Wind Speed</p>
          <p className={classes.data}>
            {info?.windSpeed} ({windSpeed})
          </p>
        </div>
        <div>
          <p className={classes.name}>Wind direction</p>
          <p className={classes.data}>
            {info?.windDirection} ({winddirection})
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tile;
