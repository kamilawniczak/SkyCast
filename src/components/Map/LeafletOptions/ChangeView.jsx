import React from "react";
import { useMap } from "react-leaflet";

const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
};

export default ChangeView;
