import React, { useEffect, useMemo } from "react";
import classes from "./Overview.module.css";
import ChartContainer from "./ChartContainer";

const Overview = ({ dispach, active_Btn, meteoData, units, active_Day }) => {
  const prepearDataForCharts = useMemo(
    () => (state, type) => {
      let option = "Temperature";
      switch (type) {
        case "Humadity":
          option = "relativehumidity_2m";
          break;
        case "Pressure":
          option = "surface_pressure";
          break;
        case "UV_index":
          option = "uv_index";
          break;
        case "Temperature":
          option = "temperature_2m";
          break;
        case "Wind":
          option = "windspeed_10m";
          break;
        default:
          option = "temperature_2m";
          break;
      }

      const arrayForTime = [];
      const assembleDataForChart = state?.hourly?.[option]
        .filter((_, i) => {
          if (active_Day === false) return true;
          const check =
            new Date(meteoData?.hourly?.time?.at(i))?.getDate() === active_Day;
          if (check) arrayForTime.push(meteoData?.hourly?.time?.at(i));
          return check;
        })
        .map((data, index) => {
          if (active_Day) {
            const dataObject = new Date(arrayForTime?.at(index));
            return [dataObject, data];
          }
          if (!active_Day) {
            const dataObject = new Date(meteoData?.hourly?.time?.at(index));
            return [dataObject, data];
          }
        });
      return assembleDataForChart;
    },
    [meteoData, active_Btn, active_Day]
  );
  const prepearUnitForCharts = useMemo(
    () => (active_Btn) => {
      let unit = "";
      switch (active_Btn) {
        case "Humadity":
          unit = "humidity";
          break;
        case "Pressure":
          unit = "surface_pressure";
          break;
        case "UV_index":
          unit = "uv_index";
          break;
        case "Temperature":
          unit = "temp";
          break;
        case "Wind":
          unit = "windSpeed";
          break;
        default:
          unit = "";
          break;
      }
      return units?.[unit];
    },
    [active_Btn, units]
  );

  const stateForCharts = prepearDataForCharts(meteoData, active_Btn);
  const state_UnitsForCharts = prepearUnitForCharts(active_Btn);

  return (
    <section className={classes.overview}>
      <div className={classes.box}>
        <nav className={classes.buttons}>
          <button
            className={`${classes.btn} ${
              active_Btn === "Humadity" ? classes["btn--active"] : ""
            }`}
            value="Humadity"
            onClick={(e) =>
              dispach({ type: "changActiveButton", payload: e.target.value })
            }
          >
            Humadity
          </button>
          <button
            className={`${classes.btn} ${
              active_Btn === "Pressure" ? classes["btn--active"] : ""
            }`}
            value="Pressure"
            onClick={(e) =>
              dispach({ type: "changActiveButton", payload: e.target.value })
            }
          >
            Pressure
          </button>
          <button
            className={`${classes.btn} ${
              active_Btn === "UV_index" ? classes["btn--active"] : ""
            }`}
            value="UV_index"
            onClick={(e) =>
              dispach({ type: "changActiveButton", payload: e.target.value })
            }
          >
            UV index
          </button>
          <button
            className={`${classes.btn} ${
              active_Btn === "Temperature" ? classes["btn--active"] : ""
            }`}
            value="Temperature"
            onClick={(e) =>
              dispach({ type: "changActiveButton", payload: e.target.value })
            }
          >
            Temperature
          </button>
          <button
            className={`${classes.btn} ${
              active_Btn === "Wind" ? classes["btn--active"] : ""
            }`}
            value="Wind"
            onClick={(e) =>
              dispach({ type: "changActiveButton", payload: e.target.value })
            }
          >
            Wind
          </button>
        </nav>
        <ChartContainer
          meteoData={stateForCharts}
          className={classes.chart}
          active_Btn={active_Btn}
          unitsData={state_UnitsForCharts}
        />
      </div>
    </section>
  );
};

export default Overview;
