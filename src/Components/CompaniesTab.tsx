import React from "react";
import { ICompanies } from "../pages/Detail";
import Message from "./Message";

const CompaniesTab = (props: any) => {
  return (
    <>
      {props.companies && props.companies.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 p-5 bg-gray-500 bg-opacity-20">
          {props.companies.map((companie: ICompanies) => (
            <div key={companie.id} className="w-full flex flex-col">
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${companie.logo_path}`,
                }}
                className="w-full"
              />
              <span>{companie.name}</span>
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

export default CompaniesTab;
