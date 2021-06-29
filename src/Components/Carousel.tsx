import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ trendingData }: any) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(trendingData);
  return (
    <Slider {...settings} className="h-screen">
      {trendingData.map((data: any) => (
        <div key={data.id} className="relative w-screen h-screen">
          <div className="w-full h-screen absolute top-0 left-0 bg-center bg-cover opacity-60 z-0" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
