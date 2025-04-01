import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    lazyLoad: "ondemand",
  };

  const images = [
    "/concert.jpg",
    "/workshop1.webp",
    "/aboutBanner.png",
 
  ];

  return (
    <div className="hero-banner relative">
      <Slider {...settings} className="slick-carousel">
        {images.map((image, index) => (
          <div key={index} className="w-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[100px] object-cover"
            />
          </div>
        ))}
      </Slider>

      <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-4xl text-white font-bold">Excellence Events</h1>
        <p className="text-lg text-white mt-4">
          are waiting for you!
        </p>
      </div>
    </div>
  );
};

export default SlideBanner;
