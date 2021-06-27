import React, { useState } from "react";
import { Link } from "react-router-dom";
import noPosterSmall from "../assets/noPosterSmall.png";
import Star from "./Star";

interface IPoster {
  id: number;
  imageUrl?: string;
  title: string;
  rating?: number;
  year?: string;
  isMovie?: boolean;
}

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
}: IPoster) => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <div className="text-sm">
        <div
          className="mb-1 relative"
          onMouseOver={() => setHoverState(true)}
          onMouseOut={() => setHoverState(false)}
        >
          <div
            className={`h-48 bg-cover bg-center rounded transition-opacity ${
              hoverState ? `opacity-30` : `opacity-100`
            }`}
            style={{
              backgroundImage: `${
                imageUrl
                  ? `url("https://image.tmdb.org/t/p/w300${imageUrl}")`
                  : `url(${noPosterSmall})`
              }`,
            }}
          />
          <span
            className={`bottom-2 right-2 absolute ${
              hoverState ? `opacity-100` : `opacity-0`
            } transition-opacity`}
          >
            <span role="img" aria-label="rating">
              <Star rating={(rating ? rating : 0) / 2} />
            </span>{" "}
            {rating}/10
          </span>
        </div>
        <span className="block mb-0.5 overflow-hidden whitespace-nowrap">
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </span>
        <span className="text-xs text-gray-500">{year}</span>
      </div>
    </Link>
  );
};
export default Poster;
