import React from "react";

interface IMessage {
  text: string;
  color: string;
}

const Message = ({ text, color }: IMessage) => (
  <div className="w-full flex justify-center">
    <span className={color}>{text}</span>
  </div>
);

export default Message;
