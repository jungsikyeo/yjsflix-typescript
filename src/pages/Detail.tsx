import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Star from "../Components/Star";
import Message from "../Components/Message";
import { Loader } from "../Components/Loader";
import { withRouter } from "react-router-dom";
import { moviesApi, tvApi } from "../api";
import { ReactComponent as Imdb } from "../assets/imdb.svg";
import noPosterSmall from "../assets/noPosterSmall.png";
import Tabs from "../Components/Tabs";

interface ICast {
  name: string;
  known_for_department: string;
  order: number;
}

interface ICrew {
  name: string;
  department: string;
  known_for_department: string;
}

export interface IVideo {
  id: string;
  name: string;
  key: string;
}

interface IResult {
  original_title?: string;
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  genres?: { name: string }[];
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  vote_average?: number;
  overview?: string;
  imdb_id?: string;
  casts?: {
    cast: ICast[];
    crew: ICrew[];
  };
  videos?: {
    results: IVideo[] | null;
  };
  production_companies?: [] | null;
  production_countries?: [] | null;
}

interface ITab {
  tabId: string | null;
  tabContent: object | null;
}

const initResult = {};

const Detail = withRouter((props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<IResult>(initResult);
  const [tabs, setTabs] = useState<[ITab]>([{ tabId: null, tabContent: null }]);
  const [tabIndex, setTabIndex] = useState(0);

  const getId = () => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;
    return {
      id,
      push,
    };
  };

  const getContent = async () => {
    const { id, push } = await getId();

    if (isNaN(Number(id))) {
      return push("/");
    }
    let result = null;
    let casts = null;
    if (props.location.pathname.includes("/movie/")) {
      ({ data: result } = await moviesApi.movieDetail(Number(id)));
      ({ data: casts } = await moviesApi.getCasts(Number(id)));
      result.casts = casts;
      setResult(result);
    } else {
      ({ data: result } = await tvApi.showDetail(Number(id)));
      ({ data: casts } = await tvApi.getCasts(Number(id)));
      result.casts = casts;
      setResult(result);
    }
  };

  const getTabContent = async (title: string) => {
    /*
    const tabs = (
      <div className="grid grid-cols-2 gap-10">
        {result.videos?.results.map((video) => (
          <div className="bg-red-900">{title}</div>
        ))}
      </div>
    );
    */
    setTabs([{ tabId: title, tabContent: tabs }]);
  };

  useEffect(() => {
    getContent()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | yjsflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <div className="w-full h-screen relative pt-12">
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | yjsflix
        </title>
      </Helmet>
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover filter blur-sm opacity-50 z-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`,
        }}
      />
      <div className="relative w-full h-full flex p-10 z-10">
        <div
          className="w-4/12 h-full bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: result.poster_path
              ? `url(https://image.tmdb.org/t/p/original${result.poster_path})`
              : noPosterSmall,
          }}
        />
        <div className="mt-5 w-8/12 ml-10">
          <div className="flex justify-between">
            <span className="text-4xl font-black uppercase">
              {result.original_title
                ? result.original_title
                : result.original_name}
            </span>
            {result.imdb_id && (
              <button
                onClick={() =>
                  window.open(
                    `https://www.imdb.com/title/${result.imdb_id}`,
                    `_blank`
                  )
                }
              >
                <Imdb />
              </button>
            )}
          </div>
          <div className="my-4 text-base">
            <span>
              {result?.genres &&
                result?.genres.map((genre: { name: string }, index: number) =>
                  result.genres && index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </span>
            <span className="mx-4">•</span>
            <span>
              📅
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date?.substring(0, 4)}
            </span>
            <span className="mx-4">•</span>
            <span>
              ⏱
              {result.runtime
                ? result.runtime
                : result.episode_run_time && result.episode_run_time[0]}{" "}
              min
            </span>
            <span className="mx-4">•</span>
            <span>
              {result.vote_average && <Star rating={result.vote_average / 2} />}{" "}
              ( {result.vote_average} )
            </span>
          </div>
          <div>
            <div>
              <span className="">Director: </span>
              {result.casts?.crew
                .filter(
                  (crew: ICrew) => crew.known_for_department === "Directing"
                )
                .map((crew: ICrew) => crew.name)
                .filter(
                  (name: string, index: number, self) =>
                    self.indexOf(name) === index
                )
                .map((name: string, index: number) => (
                  <span className="text-blue-400">{`${
                    index > 0 ? ` / ` : ``
                  } ${name}`}</span>
                ))}
            </div>
            <div className="mb-5">
              <span className="">Stars: </span>
              {result.casts?.cast
                .filter((cast: ICast) => cast.known_for_department === "Acting")
                .sort((a: ICast, b: ICast) => a.order - b.order)
                .filter((_, index: number) => index <= 4)
                .map((cast: ICast, index: number) => (
                  <span className="text-blue-400">{`${index > 0 ? ` / ` : ``} ${
                    cast.name
                  }`}</span>
                ))}
            </div>
          </div>
          <p className="w-full opacity-70 font-thin">{result.overview}</p>
          <div className="w-full h-3/5 mt-10">
            <Tabs
              videos={result.videos?.results}
              companies={result.production_companies}
              countries={result.production_countries}
            />
          </div>
        </div>
      </div>
      {error && <Message color="#e74c3c" text={error} />}
    </div>
  );
});

export default Detail;
