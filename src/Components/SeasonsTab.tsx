import React from "react";
import { ISeasons } from "../pages/Detail";
import Message from "./Message";

const SeasonsTab = (props: any) => {
  return (
    <>
      {props.seasons && props.seasons.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 p-5 bg-gray-500 bg-opacity-20">
          {props.seasons.map((season: ISeasons) => (
            <div key={season.id} className="w-full flex flex-col">
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${season.poster_path})`,
                }}
                className="w-full"
              />
              <span>{season.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Message color="#e74c3c" text={"No data."} />
        </div>
      )}
    </>
  );
};

export default SeasonsTab;
