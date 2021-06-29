import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../assets/slick.css";
import "../assets/slick-theme.css";

interface IContent {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path: string;
}

const Carousel = ({ trendingData }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(trendingData);

  return (
    <Slider {...settings}>
      {trendingData
        .sort(
          (dataA: IContent, dataB: IContent) =>
            dataB.popularity - dataA.popularity
        )
        .filter((_: IContent, index: number) => index < 10)
        .map((data: IContent, index: number) => (
          <div
            key={data.id}
            className="relative w-screen h-screen overflow-y-hidden"
          >
            <div
              className="w-full h-screen absolute top-0 left-0 bg-center bg-cover opacity-60 z-0"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
              }}
            />
            <div className="absolute w-full left-20 bottom-32">
              <h1 className="text-5xl">{index + 1}. {data.title}</h1>
              <div className="w-2/5 mt-5 text-gray-400">
                {data.overview.length > 120
                  ? `${data.overview.substring(0, 120)}...`
                  : data.overview}
              </div>
              <div className="mt-7">
                <Link
                  to={`/movie/${data.id}`}
                  className="p-4 rounded-md bg-gray-500 bg-opacity-60 hover:bg-opacity-40"
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default Carousel;
