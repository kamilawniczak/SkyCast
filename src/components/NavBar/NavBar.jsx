import React, { useEffect, useReducer } from "react";
import classes from "./NavBar.module.css";
import Search from "./Search";
import CurrentDate from "./CurrentDate";
import SwichTemp from "./SwichTemp";
import Refresh from "./Refresh";
import Popup from "./Popup";
import useFetchv2 from "./useFetchv2";
import Settings from "./Settings";
import { useOvervlow } from "../Hooks/useOvervlow";
// import { useFetch } from "./useFetch";

const initialState = {
  data: [],
  status: "start",
  toggleModal: false,
  refeash: null,
  error: "",
  loading: false,
  value: "",
  selectedPlace: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "toggleModal":
      return {
        ...state,
        toggleModal: state.toggleModal ? false : true,
        error: "",
      };
    case "setValue":
      return { ...state, value: action.payload, error: "" };
    case "setData":
      return { ...state, data: action.payload, error: "", loading: false };
    case "loading":
      return { ...state, loading: action.payload, error: "" };
    case "error":
      return { ...state, error: action.payload, loading: false, data: [] };
    case "selectPlace":
      return { ...initialState, selectedPlace: action.payload };
    default:
      throw new Error("Wrong wrong wrong!!!");
  }
};

const NavBar = ({ globalState, globalDispach }) => {
  const [state, dispach] = useReducer(reducer, initialState);
  // useOvervlow(state.toggleModal);
  // useOvervlow(globalState.settings_panel_active);
  useFetchv2(state.value, dispach);

  return (
    <nav className={classes.navBar}>
      <CurrentDate />
      <Search dispach={dispach} />
      {state.toggleModal && (
        <Popup
          dispach={dispach}
          globalState={globalState}
          state={state}
          globalDispach={globalDispach}
        />
      )}

      <Refresh globalDispach={globalDispach} />
      <SwichTemp globalDispach={globalDispach} />
      {globalState.settings_panel_active && (
        <Settings globalDispach={globalDispach} globalState={globalState} />
      )}
    </nav>
  );
};

export default NavBar;
