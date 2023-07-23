import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ChangeView from "./LeafletOptions/ChangeView";
import SetViewOnClick from "./LeafletOptions/SetViewOnClick";
import { useRef } from "react";

const Map = ({ position, zoom }) => {
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
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ChangeView center={position} />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};

export default Map;
