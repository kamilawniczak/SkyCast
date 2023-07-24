import React from "react";
import PlaceOption from "./PlaceOption";

import classes from "./ListOfPlaces.module.css";

const ListOfPlaces = ({ state, globalState, dispach, globalDispach }) => {
  const isSelected = (currPlace) =>
    globalState.favourite.some((place) => place.formatted === currPlace);

  return (
    <ul className={classes.list}>
      {state.data.map((place) => (
        <PlaceOption
        
          isSelected={isSelected(place.properties.formatted)}
          place={place}
          dispach={dispach}
          globalDispach={globalDispach}
          key={place.properties.formatted}
        />
      ))}
    </ul>
  );
};

export default ListOfPlaces;
