import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../images/slider-image-1.jpeg'
import img2 from '../images/slider-image-2.jpeg'
import img3 from '../images/slider-image-3.jpeg'
import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query";
import { getBrandsApi } from "../API/brands";

export default function HomeSlider() {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fade: true,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: current => setActiveSlide2(current)
  };
  return (
    <div className="home-slider h-full">
      <Slider className="h-full" {...settings}>
      <div className="relative">
        <img src={img1} className="object-cover h-full w-full" alt="" />
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={activeSlide==0?{ opacity: 1, scale: 1 }: { opacity: 0, scale: 0 }} className="lg:block hidden absolute top-[30%] left-6 w-[300px]">
          <h2 className="font-extrabold text-2xl mb-1">Fresh Picks, Just for You!</h2>
          <p className="mb-6 text-gray-500">Discover the finest selection of groceries, handpicked for quality and freshness. Don't miss out on our exclusive offers!</p>
          <button className="bg-black text-white px-3 py-1">Explore Now</button>
        </motion.div>
      </div>
      <div className="relative">
        <img src={img3} className="object-cover h-full w-full" alt="" />
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={activeSlide==1?{ opacity: 1, scale: 1 }: { opacity: 0, scale: 0 }} className="lg:block hidden absolute top-[30%] left-6 w-[300px]">
          <h2 className="font-extrabold text-2xl mb-1">Your Daily Essentials, Delivered!</h2>
          <p className="mb-6 text-gray-500">Stock up on the groceries you love with ease. Freshness guaranteed, right to your doorstep.</p>
          <button className="bg-black text-white px-3 py-1">Explore Now</button>
        </motion.div>
      </div>
    </Slider>
    </div>
  );
}