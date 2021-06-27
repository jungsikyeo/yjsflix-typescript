import React from "react";

interface IStar {
  rating: number;
}

const Star = ({ rating }: IStar) => {
  let ratingStar = "";
  let star = "★";
  for (let i = 1; i <= rating; i++) {
    ratingStar += star;
  }
  if (`${rating}`.split(".").length > 1) {
    ratingStar += "☆";
  }

  return <span className="text-sm text-yellow-200">{ratingStar}</span>;
};

export default Star;
