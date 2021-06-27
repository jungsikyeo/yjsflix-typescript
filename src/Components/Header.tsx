import React from "react";
import { Link, withRouter } from "react-router-dom";

export default withRouter(({ location: { pathname } }) => (
  <header className="fixed top-0 left-0 w-full h-12 px-4 flex items-center bg-black opacity-80 z-10 shadow-2xl text-white">
    <div className="w-full flex justify-between">
      <ul className="flex">
        <li
          className={`w-12 h-12 text-center border-b-2 ${
            pathname === "/" ? `border-blue-500` : `border-transparent`
          }`}
        >
          <Link to="/" className="h-12 flex justify-center items-center">
            Movies
          </Link>
        </li>
        <li
          className={`w-12 h-12 text-center border-b-2 pl-2 ${
            pathname === "/tv" ? `border-blue-500` : `border-transparent`
          }`}
        >
          <Link to="/tv" className="h-12 flex justify-center items-center">
            TV
          </Link>
        </li>
      </ul>
      <ul className="flex">
        <li
          className={`w-12 h-12 text-center border-b-2 ${
            pathname === "/search" ? `border-blue-500` : `border-transparent`
          }`}
        >
          <Link to="/search" className="h-12 flex justify-center items-center">
            Search
          </Link>
        </li>
      </ul>
    </div>
  </header>
));
