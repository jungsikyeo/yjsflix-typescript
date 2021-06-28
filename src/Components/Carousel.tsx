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
    <div className="h-screen">
      <Slider {...settings}>
        {trendingData.map((data: any) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt={data.original_title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
