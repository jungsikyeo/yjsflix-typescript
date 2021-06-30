import React from "react";
import { ICountries } from "../pages/Detail";
import Message from "./Message";

const CountriesTab = (props: any) => {
  return (
    <div className="flex justify-center items-center p-5 bg-gray-500 bg-opacity-20">
      {props.countries && props.countries.length > 0 ? (
        props.countries.map((country: ICountries) => (
          <span className="mt-4">{country.name}</span>
        ))
      ) : (
        <Message color="#e74c3c" text={"No data."} />
      )}
    </div>
  );
};

export default CountriesTab;
