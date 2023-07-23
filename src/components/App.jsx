import React, { useEffect, useReducer } from "react";

import { useStorage } from "./Hooks/useStorage";
import { useTimer } from "./Hooks/useTimer";

import Main from "./Box/Main";
import Header from "./Box/Header";
import NavBar from "./NavBar/NavBar";
import Info from "./Info/Info";
import MapContainer from "./Map/MapContainer";
import Overview from "./Overview/Overview";
import Forecast from "./Forecast/Forecast";
import ForecastList from "./ForecastList/ForecastList";
import LoadingScreenInfo from "./Info/LoadingScreenInfo";
import LoadingScreenMap from "./Map/LoadingScreenMap";
import LoadingScreenOverview from "./Overview/LoadingScreenOverview";
import LoadingScreenForecast from "./Forecast/LoadingScreenForecast";

const initialState = {
  error: "",
  loading: true,
  refresh: false,
  data: {
    lat: 51.1089776,
    lon: 17.0326689,
    formatted: "Wrocław, Lower Silesian Voivodeship, Poland",
  },
  meteoData: {},
  favourite: [],
  settings: {
    temp: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
    forecast: 7,
    timezone: "Europe%2FBerlin",
    refreshTime: 10,
  },
  units: {
    temp: "",
    windSpeed: "",
    surface_pressure: "",
    humidity: "",
    winddirection: "",
    precipitation: "",
  },
  // refreshTime: 10,
  leftRefreshTime: 10,
  settings_panel_active: false,
  currentHour: new Date().getHours(),
  currentDay: new Date().getDate(),
  active_Btn: "Temperature",
  active_Day: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "receive":
      if (state.data.formatted === action.payload.formatted) return state;

      return { ...state, active_Day: false, data: action.payload };
    case "add":
      return { ...state, favourite: [...state.favourite, action.payload] };
    case "remove":
      const updatedFavourite = state.favourite.filter(
        (place) => place.formatted !== action.payload.formatted
      );
      return {
        ...state,
        favourite: [...updatedFavourite],
      };
    case "refresh":
      return { ...state, refresh: !state.refresh };
    case "decreseRefreashTime":
      if (state.refreshTime === 0) return state;
      return { ...state, leftRefreshTime: state.leftRefreshTime - 1 };
    case "resetRefreashTime":
      return { ...state, leftRefreshTime: state.settings.refreshTime };
    case "setMeteoData":
      return {
        ...state,
        meteoData: action.payload,
        error: "",
        loading: false,
        units: {
          temp: action.payload?.hourly_units?.temperature_2m,
          windSpeed: action.payload?.hourly_units?.windspeed_10m,
          surface_pressure: action.payload?.hourly_units?.surface_pressure,
          humidity: action.payload?.hourly_units?.relativehumidity_2m,
          winddirection: action.payload?.hourly_units?.winddirection_10m,
          precipitation: action.payload?.hourly_units?.precipitation,
          uv_index: action.payload?.hourly_units?.uv_index,
        },
      };
    case "changActiveButton":
      if (state.active_Btn === action.payload) return state;
      return { ...state, active_Btn: action.payload };
    case "changActiveDay":
      if (state.active_Day === action.payload)
        return { ...state, active_Day: false };
      return { ...state, active_Day: action.payload };
    case "setSettingVisible":
      return { ...state, settings_panel_active: !state.settings_panel_active };
    case "changeSettings":
      if (state.settings === action.payload) return state;
      return {
        ...state,
        leftRefreshTime: action.payload.refreshTime,
        settings: action.payload,
      };
    case "loading":
      return { ...state, loading: action.payload, error: "" };
    case "error":
      return { ...state, error: action.payload, loading: false, meteoData: {} };
  }
};

const App = (props) => {
  const [state, dispach] = useReducer(reducer, initialState);
  const navData = { lat: state.data.lat, lon: state.data.lon };
  const statetForInfo = {
    data: state.data.formatted,
    meteoData: state.meteoData,
    units: state.units,
  };
  const stateForecast = {
    meteoData: state.meteoData.daily,
    units: state.units,
  };
  useTimer(dispach, state.leftRefreshTime);
  useEffect(() => {
    state.settings = useStorage("get", "settings") || state.settings;
    state.favourite = useStorage("get", "favourite") || state.favourite;
  }, []);

  useEffect(() => {
    useStorage("set", "settings", state.settings);
  }, [state.settings]);
  useEffect(() => {
    useStorage("set", "favourite", state.favourite);
  }, [state.favourite]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      dispach({ type: "loading", payload: true });
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${state.data.lat}&longitude=${state.data.lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,surface_pressure,windspeed_10m,winddirection_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max&current_weather=true&temperature_unit=${state.settings.temp}&windspeed_unit=${state.settings.windSpeed}&precipitation_unit=${state.settings.precipitation}&timezone=${state.settings.timezone}&forecast_days=${state.settings.forecast}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong with fetching data");

        const data = await res.json();

        dispach({ type: "setMeteoData", payload: data });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispach({ type: "error", payload: error.message });
        }
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [state.data, state.refresh, state.settings]);

  return (
    <>
      <Header>
        <NavBar globalState={state} globalDispach={dispach}></NavBar>
      </Header>
      <Main>
        {state.loading ? (
          <LoadingScreenInfo />
        ) : (
          <Info
            waetherData={statetForInfo}
            currentHour={state.currentHour}
            isLoading={state.loading}
          />
        )}
        {state.loading ? (
          <LoadingScreenMap />
        ) : (
          <MapContainer navData={navData} info={state.data.formatted} />
        )}
        {state.loading ? (
          <LoadingScreenOverview />
        ) : (
          <Overview
            dispach={dispach}
            active_Btn={state.active_Btn}
            meteoData={state.meteoData}
            units={state.units}
            active_Day={state.active_Day}
          />
        )}
        {state.loading ? (
          <LoadingScreenForecast />
        ) : (
          <Forecast
            weatherData={stateForecast}
            currentDay={state.currentDay}
            dispach={dispach}
            active_Day={state.active_Day}
          />
        )}
        {state.favourite.length && (
          <ForecastList
            dispach={dispach}
            favourite={state.favourite}
            units={state.units}
            settings={state.settings}
            refresh={state.refresh}
          />
        )}
      </Main>
    </>
  );
};

export default App;
