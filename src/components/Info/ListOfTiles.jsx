import React, { useRef } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./ListOfTiles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Slider from "react-slick";
import Tile from "./Tile";

const currentHour = new Date().getHours();

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  initialSlide: currentHour,
  arrows: null,
  responsive: [
    {
      breakpoint: 1534,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
        arrows: null,
      },
    },
    ,
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: false,
        arrows: null,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: null,
      },
    },
    ,
  ],
};

const ListOfTiles = ({ hourlyMeteoDataArray }) => {
  const slider = useRef();

  return (
    <div className={classes["slider-box"]}>
      <Slider {...settings} ref={slider}>
        {hourlyMeteoDataArray.map((hour, e) => {
          return <Tile info={hour} key={e} active={e === currentHour} />;
        })}
      </Slider>
      <button
        onClick={() => slider.current.slickPrev()}
        className={classes["slider-box__button--prev"]}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={() => slider.current.slickNext()}
        className={classes["slider-box__button--next"]}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default ListOfTiles;
