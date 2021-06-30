import React from "react";
import { ICompanies } from "../pages/Detail";
import Message from "./Message";
import noPosterSmall from "../assets/noPosterSmall.png";

const CompaniesTab = (props: any) => {
  return (
    <>
      {props.companies && props.companies.length > 0 ? (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 p-5 bg-gray-500 bg-opacity-20">
          {props.companies.map((companie: ICompanies) => (
            <div key={companie.id} className="w-full h-40 flex flex-col">
              <img
                src={
                  companie.logo_path
                    ? `https://image.tmdb.org/t/p/original${companie.logo_path}`
                    : noPosterSmall
                }
                alt={companie.name}
                className="w-full h-full"
              />
              <span>{companie.name}</span>
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

export default CompaniesTab;
