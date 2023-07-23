import React, { useRef } from "react";
import Slider from "react-slick";
import ForecastListElement from "./ForecastListElement";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
};
const List = ({
  weatherData,
  currentDay,
  handleListRef,
  dispach,
  active_Day,
}) => {
  const slider = useRef();
  useEffect(() => handleListRef(slider), [slider]);

  const handleInfo = (index) => {
    const id = index;
    const time = weatherData.meteoData?.time?.at(index);
    const tempMin = weatherData.meteoData?.temperature_2m_min?.at(index);
    const tempMax = weatherData.meteoData?.temperature_2m_max?.at(index);
    const weathercode = weatherData.meteoData?.weathercode?.at(index);
    const windSpeed = weatherData.meteoData?.windspeed_10m_max?.at(index);
    const units = weatherData.units;
    return {
      id,
      tempMin,
      tempMax,
      time,
      weathercode,
      windSpeed,
      units,
    };
  };
  const forecastNumOfDays = weatherData?.meteoData?.time?.length ?? 7;
  const daleyMeteoDataArray = new Array(forecastNumOfDays)
    .fill(0)
    .map((_, index) => handleInfo(index));

  return (
    <Slider {...settings} ref={slider}>
      {daleyMeteoDataArray.map((day) => (
        <ForecastListElement
          key={day.id}
          dayForecast={day}
          currentDay={currentDay}
          dispach={dispach}
          active_Day={new Date(day.time).getDate() === active_Day}
        />
      ))}
    </Slider>
  );
};

export default List;
