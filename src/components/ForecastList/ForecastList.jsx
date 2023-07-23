import React from "react";
import classes from "./ForecastList.module.css";
import Favourite from "./Favourite";

const ForecastList = ({ dispach, favourite, units, settings, refresh }) => {
  return (
    <section className={classes.forecastList}>
      <div className={classes.box}>
        {favourite.map((place) => (
          <Favourite
            place={place}
            units={units}
            favourite={favourite}
            key={place.formatted}
            dispach={dispach}
            refresh={refresh}
            settings={settings}
          />
        ))}
      </div>
    </section>
  );
};

export default ForecastList;
