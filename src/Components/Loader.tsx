import React from "react";
import loading from "../assets/loading.png";

export const Loader = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <img src={loading} alt="loading" className="w-16 h-16"/>
        </div>
    );
};
