import React, { useMemo } from "react";
import classes from "./Info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as regular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solid } from "@fortawesome/free-solid-svg-icons";

import ListOfTiles from "./ListOfTiles";
import { useWeatherIcon } from "../Hooks/useWeatherIcon";

// const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);
const options = {
  hour: "numeric",
};
// const convertToNiceTime = (dateString) => {
//   // const date = new Date(dateString);
//   // const hours = date.getHours();
//   // const minute = date.getMinutes();

//   return `${addLeadingZero(hours)}:${addLeadingZero(minute)}`;
// };

const Info = ({
  waetherData,
  currentHour,
  isLoading,
  defaultData,
  currentSelectedPlace,
  dispach,
}) => {
  const [icon, description] = useWeatherIcon(
    waetherData.meteoData.current_weather?.weathercode
  );

  const units = waetherData.units;

  const info_Temp = waetherData?.meteoData?.current_weather?.temperature;
  const info_Windspeed = waetherData?.meteoData?.current_weather?.windspeed;
  const info_Humidity = waetherData?.meteoData?.hourly?.relativehumidity_2m.at(
    currentHour
  );
  const info_Wind_Direction =
    waetherData?.meteoData?.current_weather?.winddirection;
  // const info_Temp = waetherData?.meteoData?.current_weather?.temperature;
  const info_Surface_pressure = waetherData?.meteoData?.hourly?.surface_pressure?.at(
    currentHour
  );

  const splitData = waetherData?.data.split(",");
  const country = splitData[splitData.length - 1];
  const place = splitData.slice(0, splitData.length - 1);

  const hourlyMeteoData = waetherData.meteoData.hourly;
  const hourlyMeteoData_Units = waetherData.meteoData.hourly_units;

  const handleInfo = (index) => {
    const id = index;
    const temp = hourlyMeteoData?.temperature_2m?.at(index);
    const weathercode = hourlyMeteoData?.weathercode?.at(index);
    const windSpeed = hourlyMeteoData?.windspeed_10m?.at(index);
    const precipitation = hourlyMeteoData?.precipitation?.at(index);
    const windDirection = hourlyMeteoData?.winddirection_10m?.at(index);
    const surface_pressure = hourlyMeteoData?.surface_pressure?.at(index);
    // const time = convertToNiceTime(hourlyMeteoData?.time?.at(index));
    const time = Intl.DateTimeFormat("en-US", options).format(
      new Date(hourlyMeteoData?.time?.at(index))
    );
    return {
      id,
      temp,
      weathercode,
      windSpeed,
      precipitation,
      windDirection,
      surface_pressure,
      time,
      units,
    };
  };

  const hourlyMeteoDataArray = new Array(24)
    .fill(0)
    .map((_, index) => handleInfo(index));

  const faBookmark =
    waetherData?.data === defaultData.formatted ? solid : regular;

  return (
    <section className={classes.info}>
      <div className={classes.main}>
        <div className={classes.panel}>
          <div className={classes.place}>
            {place.length ? (
              <>
                <h3 className={classes["place__h3"]}>{place}</h3>
                <h4 className={classes["place__h4"]}>{country}</h4>
              </>
            ) : (
              <h2 className={classes["place__h2"]}>{country}</h2>
            )}
          </div>
          <p>{icon}</p>
          <p className={classes["icon-description"]}>{description}</p>
        </div>
        <div className={classes.meteoInfo}>
          <p className={classes.temperature}>
            <span>Temperature</span>
            <span className={classes.metaData}>
              {info_Temp}
              {units.temp}
            </span>
          </p>
          <p className={classes.humadity}>
            <span>Humadity</span>
            <span className={classes.metaData}>
              {info_Humidity}
              {units.humidity}
            </span>
          </p>
          <p className={classes.windSpeed}>
            <span>Wind speed</span>
            <span className={classes.metaData}>
              {info_Windspeed}
              {units.windSpeed}
            </span>
          </p>
          <p className={classes["WindDirection"]}>
            <span>Wind direction</span>
            <span className={classes.metaData}>
              {info_Wind_Direction}
              {units.winddirection}
            </span>
          </p>
          <p className={classes["SurfacePressure"]}>
            <span>Pressure</span>
            <span className={classes.metaData}>
              {info_Surface_pressure}
              {units.surface_pressure}
            </span>
          </p>
        </div>
        <div className={classes.list}>
          {useMemo(
            () => (
              <ListOfTiles
                hourlyMeteoDataArray={hourlyMeteoDataArray}
                currentHour={currentHour}
              />
            ),
            [hourlyMeteoDataArray]
          )}
        </div>
        <button className={classes.btn}>
          <FontAwesomeIcon
            icon={faBookmark}
            onClick={() =>
              dispach({
                type: "setDefaultData",
                payload: {
                  lat: waetherData?.meteoData?.latitude,
                  lon: waetherData?.meteoData?.longitude,
                  formatted: waetherData?.data,
                },
              })
            }
          />
        </button>
      </div>
    </section>
  );
};

export default Info;
