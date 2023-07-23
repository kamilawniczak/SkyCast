import React from "react";
import classes from "./Forecast.module.css";
import List from "./List";
let listRef = {};
const Forecast = ({ weatherData, currentDay, dispach, active_Day }) => {
  const handleListRef = (ref) => {
    listRef = ref.current;
  };

  return (
    <section className={classes.forecast}>
      <div className={classes.box}>
        <button
          className={classes["triangle-buttons"]}
          onClick={() => listRef.slickNext()}
        >
          <div
            className={`${classes["triangle-buttons__triangle"]} ${classes["triangle-buttons__triangle--t"]}`}
          ></div>
        </button>
        <List
          weatherData={weatherData}
          currentDay={currentDay}
          handleListRef={handleListRef}
          dispach={dispach}
          active_Day={active_Day}
        />
        <button
          className={classes["triangle-buttons"]}
          onClick={() => listRef.slickPrev()}
        >
          <div
            className={`${classes["triangle-buttons__triangle"]} ${classes["triangle-buttons__triangle--b"]}`}
          ></div>
        </button>
      </div>
    </section>
  );
};

export default Forecast;
