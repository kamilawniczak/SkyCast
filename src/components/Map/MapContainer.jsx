import React from "react";

import classes from "./MapContainer.module.css";
import Map from "./Map";

const MapContainer = ({ navData }) => {
  // const position = [navData.lon, navData.lat];
  const position = { lat: navData.lat, lng: navData.lon };
  // const position = [51.505, -0.09];
  const zoom = 10;

  return (
    <section className={classes.map}>
      <div className={classes["map-box"]}>
        <Map position={position} zoom={zoom} />
      </div>
    </section>
  );
};

export default MapContainer;
