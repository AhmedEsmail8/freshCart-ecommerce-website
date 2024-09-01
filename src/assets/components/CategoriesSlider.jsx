import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../images/slider-image-1.jpeg'
import img2 from '../images/slider-image-2.jpeg'
import img3 from '../images/slider-image-3.jpeg'
import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion"

export default function CategoriesSlider({data}) {

  console.log(data);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 2 ,
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 2 ,
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 2 ,
        }
      }
    ]
  };
  
  return (
    <div className="mb-7">
      <Slider {...settings}>
      {data?.map((category)=>{
          console.log(category);
          
          return <div key={category._id}>
          <img src={category.image} className="lg:h-[280px] lg:w-[280px] h-[100px] w-[100%] object-cover" alt="" />
          <h2 className="text-center md:text-xl mt-2 font-[500]">{category.slug}</h2>
        </div>
        }
      )}
    </Slider>
    </div>
  );
}