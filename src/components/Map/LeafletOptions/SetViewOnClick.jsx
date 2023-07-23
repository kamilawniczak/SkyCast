import { useMapEvent } from "react-leaflet";

const SetViewOnClick = ({ animateRef = true }) => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
};

export default SetViewOnClick;
