import React from "react";
import { IVideos } from "../pages/Detail";
import Message from "./Message";

const VideosTab = (props: any) => {
  return (
    <>
      {props.videos && props.videos.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 p-5 bg-gray-500 bg-opacity-20">
          {props.videos.map((video: IVideos) => (
            <div key={video.id} className="w-full flex flex-col">
              <iframe
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                className="w-full"
              />
              <span>{video.name}</span>
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

export default VideosTab;
