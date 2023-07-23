import React, { useEffect } from "react";
import classes from "./Favourite.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// fa-solid fa-trash
import Loader from "../Loader";
import { useState } from "react";
import { useWeatherIcon } from "../Hooks/useWeatherIcon";
const Favourite = ({ place, units, settings, dispach, refresh }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [icon, _] = useWeatherIcon(info.weathercode);
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current_weather=true&temperature_unit=${settings.temp}&windspeed_unit=${settings.windSpeed}&precipitation_unit=${settings.precipitation}&timezone=${settings.timezone}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong with fetching data");

        const data = await res.json();

        setInfo(data.current_weather);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();

    return () => controller.abort();
  }, [settings, refresh]);

  const splitData = place.formatted.split(",");
  const country = splitData[splitData.length - 1];
  const position = splitData.slice(0, splitData.length - 1);
  const readyPosition = position.join("");

  let finalPosition = readyPosition;

  if (readyPosition.length > 75) {
    let slicedPosition = readyPosition.slice(0, 75);
    for (
      let i = slicedPosition.length - 1;
      i > 0 && slicedPosition.at(slicedPosition.length - 1) === " ";
      i--
    ) {
      slicedPosition = slicedPosition.slice(0, i);
    }
    finalPosition = slicedPosition + "...";
  }

  return (
    <div className={classes.box}>
      <div
        className={classes.card}
        onClick={() => {
          if (!error || !loading)
            return dispach({
              type: "receive",
              payload: {
                lat: place.lat,
                lon: place.lon,
                formatted: place.formatted,
              },
            });
        }}
      >
        {loading && (
          <Loader
            styleSpiner={{ fontSize: "1.5rem" }}
            styleOverflow={{ borderRadius: "4rem" }}
          />
        )}
        {loading || error || (
          <>
            <div className={classes.place}>
              <p>{finalPosition}</p>
              {position.length ? (
                <p className={classes.country}>{country}</p>
              ) : (
                <p className={classes.bigCountry}>{country}</p>
              )}
            </div>
            <span className={classes.icon}>{icon}</span>

            <div>
              <p className={classes.name}>Wind Speed</p>
              <p className={classes.data}>
                {info?.windspeed} ({units.windSpeed})
              </p>
            </div>
            <div>
              <p className={classes.name}>Wind direction</p>
              <p className={classes.data}>
                {info?.winddirection} ({units.winddirection})
              </p>
            </div>
            <div className={classes.temp}>
              <p className={classes.name}>Temperature</p>
              <p className={`${classes.data} ${classes["temp-important"]}`}>
                {info?.temperature} ({units.temp})
              </p>
            </div>
          </>
        )}
      </div>
      <p className={classes.removeBtn}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => dispach({ type: "remove", payload: place })}
        />
      </p>
    </div>
  );
};

export default Favourite;
