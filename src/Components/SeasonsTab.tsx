import React from "react";
import { IVideo } from "../pages/Detail";
import Message from "./Message";

const SeasonsTab = (props: any) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {props.videos && props.videos.length > 0 ? (
        props.videos.map((video: IVideo) => (
          <div key={video.id}>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              height="220px"
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

export default SeasonsTab;
