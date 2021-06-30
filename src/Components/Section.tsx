import React from "react";

interface ISection {
  title: string;
  children?: object;
}

const Section = ({ title, children }: ISection) => (
  <div className="mb-12">
    <span className="text-base text-gray-300">{title}</span>
    <div className="mt-6 grid grid-cols-3 sm:grid-cols-base gap-4">{children}</div>
  </div>
);

export default Section;
