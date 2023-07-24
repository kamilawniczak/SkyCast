import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ChangeView from "./LeafletOptions/ChangeView";
import SetViewOnClick from "./LeafletOptions/SetViewOnClick";
import { useRef } from "react";

const Map = ({ position, zoom, info }) => {
  const animateRef = useRef(true);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{info}</Popup>
      </Marker>
      <ChangeView center={position} />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};

export default Map;
{
  /* <FontAwesomeIcon icon={faLocationDot} /> */
}
