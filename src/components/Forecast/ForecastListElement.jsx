import React from "react";
import classes from "./ForecastListElement.module.css";
import { useWeatherIcon } from "../Hooks/useWeatherIcon";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ForecastListElement = ({
  dayForecast,
  currentDay,
  dispach,
  active_Day,
}) => {
  const [icon, description] = useWeatherIcon(dayForecast.weathercode);
  const date = new Date(dayForecast?.time);

  const options = {
    month: "short",
  };
  const dayNum = date.getDate();
  const day = dayNames[date.getDay()];
  const month = date.toLocaleString("en-US", options);
  return (
    <div
      className={`${classes.item} ${
        currentDay === dayNum ? classes["item-active"] : ""
      } ${active_Day ? classes["item--active--Day"] : ""}`}
      onClick={() => dispach({ type: "changActiveDay", payload: dayNum })}
    >
      <div className={classes.icon}>{icon}</div>
      <div className={classes.temp}>
        {dayForecast?.tempMax}
        {dayForecast?.units?.temp} / {dayForecast?.tempMin}
        {dayForecast?.units?.temp}
      </div>

      <div className={classes.dayContainer}>
        <span className={classes.dayContainer_Day}>{dayNum}</span>
        <span className={classes.dayContainer_Month}>{month}</span>
        <span className={classes.dayContainer_DayShort}>({day})</span>
      </div>
    </div>
  );
};

export default ForecastListElement;
