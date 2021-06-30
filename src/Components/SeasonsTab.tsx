import React from "react";
import { ISeasons } from "../pages/Detail";
import Message from "./Message";
import noPosterSmall from "../assets/noPosterSmall.png";

const SeasonsTab = (props: any) => {
  return (
    <>
      {props.seasons && props.seasons.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5 p-5 bg-gray-500 bg-opacity-20">
          {props.seasons.map((season: ISeasons) => (
            <div key={season.id} className="w-full h-64 flex flex-col">
              <img
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                    : noPosterSmall
                }
                alt={season.name}
                className="w-full h-full"
              />
              <span>{season.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-5 bg-gray-500 bg-opacity-20">
          <Message color="#e74c3c" text={"No data."} />
        </div>
      )}
    </>
  );
};

export default SeasonsTab;
