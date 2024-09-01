import React from "react";
import Slider from "react-slick";
// import { baseUrl } from "./config";

function CustomPaging({ images }) {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={images[i]} alt={`thumbnail-${i}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images?.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`slide-${index}`} className="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
