import React, { useState } from "react";
import classes from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const options_Temp = [
  { value: "celsius", label: "Celsius °C" },
  { value: "fahrenheit", label: "Fahrenheit °F" },
];
const options_WindSpeed = [
  { value: "kmh", label: "Km/h" },
  { value: "ms", label: "m/s" },
  { value: "mph", label: "Mph" },
  { value: "kn", label: "Knots" },
];
const options_Precipitation = [
  { value: "mm", label: "Millimeter" },
  { value: "inch", label: "Inch" },
];
const options_Forecast = [
  { value: 4, label: "4 days" },
  { value: 7, label: "7 days" },
  { value: 14, label: "14 days" },
];
const options_Timezone = [
  { value: "America%2FAnchorage", label: "America/Anchorage" },
  { value: "America%2FLos_Angeles", label: "America/Los_Angeles" },
  { value: "America%2FDenver", label: "America/Denver" },
  { value: "America%2FChicago", label: "America/Chicago" },
  { value: "America%2FNew_York", label: "America/New_York" },
  { value: "America%2FSao_Paulo", label: "America/Sao_Paulo" },
  { value: "Europe%2FLondon", label: "Europe/London" },
  { value: "Europe%2FBerlin", label: "Europe/Berlin" },
  { value: "Europe%2FMoscow", label: "Europe/Moscow" },
  { value: "Africa%2FCairo", label: "Africa/Cairo" },
  { value: "Asia%2FBangkok", label: "Asia/Bangkok" },
  { value: "Asia%2FSingapore", label: "Asia/Singapore" },
  { value: "Asia%2FTokyo", label: "Asia/Tokyo" },
  { value: "Australia%2FSydney", label: "Australia/Sydney" },
  { value: "Pacific%2FAuckland", label: "Pacific/Auckland" },
];

const style = {
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    fontSize: "3rem",
    border: "none",
    outline: "none",
    height: "6rem",
    borderRadius: "1rem",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#2d2f31",
    fontSize: "2rem",
    color: "#FFF",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#cae6e9" : "#2d2f31",
    fontSize: "1.5rem",
    color: state.isFocused ? "#2d2f31" : "#FFF",
  }),
  //   input: (baseStyles) => ({
  //     ...baseStyles,
  //     fontSize: "1.5rem",
  //     color: "#FFF",
  //   }),
};

const Settings = ({ globalDispach, globalState }) => {
  const [settings, setSettings] = useState(globalState.settings);

  return (
    <div className={classes.modal}>
      <span
        className={classes.overlay}
        onClick={() => {
          globalDispach({
            type: "setSettingVisible",
          });
          globalDispach({ type: "changeSettings", payload: settings });
        }}
      ></span>
      <div className={classes.card}>
        <div className={classes["modal__header"]}>
          <span>Change Settings</span>
          <button
            className={classes["modal__btn"]}
            onClick={() => {
              globalDispach({ type: "setSettingVisible" });
              globalDispach({ type: "changeSettings", payload: settings });
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={classes.body}>
          <div className={`${classes.select}`}>
            <Select
              inputValue=""
              defaultValue={{
                label: options_Timezone.filter(
                  (e) => e.value === settings.timezone
                )[0].label,
                value: settings.timezone,
              }}
              options={options_Timezone}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, timezone: e.value };
                })
              }
              styles={style}
            />

            <p className={classes.label}>Timezone Unit</p>
          </div>
          <div className={`${classes.select}`}>
            <Select
              inputValue=""
              defaultValue={{
                label: options_WindSpeed.filter(
                  (e) => e.value === settings.windSpeed
                )[0].label,
                value: settings.windSpeed,
              }}
              options={options_WindSpeed}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, windSpeed: e.value };
                })
              }
              styles={style}
            />

            <p className={classes.label}>Wind Speed Unit</p>
          </div>
          <div className={`${classes.select}`}>
            <Select
              inputValue=""
              defaultValue={{
                label: options_Precipitation.filter(
                  (e) => e.value === settings.precipitation
                )[0].label,
                value: settings.precipitation,
              }}
              options={options_Precipitation}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, precipitation: e.value };
                })
              }
              styles={style}
            />
            <p className={classes.label}>Precipitation Unit</p>
          </div>
          <div className={`${classes.select}`}>
            <Select
              inputValue=""
              defaultValue={{
                label: options_Forecast.filter(
                  (e) => e.value === settings.forecast
                )[0].label,
                value: settings.forecast,
              }}
              options={options_Forecast}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, forecast: e.value };
                })
              }
              styles={style}
            />
            <p className={classes.label}>Forecast Unit</p>
          </div>
          <div className={`${classes.select}`}>
            <Select
              inputValue=""
              defaultValue={{
                label: options_Temp.filter((e) => e.value === settings.temp)[0]
                  .label,
                value: settings.temp,
              }}
              options={options_Temp}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, temp: e.value };
                })
              }
              styles={style}
            />
            <p className={classes.label}>Temperature Unit</p>
          </div>
          <div className={`${classes.range}`}>
            <p className={classes.label}>
              Refresh time ({settings.refreshTime} min)
            </p>
            <input
              type="range"
              min="1"
              max="60"
              id="range"
              value={settings.refreshTime}
              className={classes.inputRange}
              onChange={(e) =>
                setSettings((curr) => {
                  return { ...curr, refreshTime: +e.target.value };
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
