import React from "react";
import { IVideo } from "../pages/Detail";
import Message from "./Message";

const VideosTab = (props: any) => {
  return (
    <div className="grid grid-cols-2 gap-5 p-5 bg-gray-500 bg-opacity-20">
      {props.videos && props.videos.length > 0 ? (
        props.videos.map((video: IVideo) => (
          <div key={video.id} className="w-full flex flex-col">
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              className="w-full"
            />
            <span>{video.name}</span>
          </div>
        ))
      ) : (
        <Message color="#e74c3c" text={"No data."} />
      )}
    </div>
  );
};

export default VideosTab;
