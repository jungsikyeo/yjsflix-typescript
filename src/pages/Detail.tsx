import React, { useEffect, useState } from "react";
import { Loader } from "../Components/Loader";
import noPosterSmall from "../assets/noPosterSmall.png";
import { Helmet } from "react-helmet";
import Star from "../Components/Star";
import { withRouter } from "react-router-dom";
import { moviesApi, tvApi } from "../api";
import Message from "../Components/Message";

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
}

const initResult = {};

const Detail = withRouter((props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<IResult>(initResult);

  const getContent = async () => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;

    if (isNaN(Number(id))) {
      return push("/");
    }
    let result = null;
    if (props.location.pathname.includes("/movie/")) {
      ({ data: result } = await moviesApi.movieDetail(Number(id)));
    } else {
      ({ data: result } = await tvApi.showDetail(Number(id)));
    }
    setResult(result);
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
          className="w-4/12 h-full bg-center bg-cover rounded"
          style={{
            backgroundImage: result.poster_path
              ? `url(https://image.tmdb.org/t/p/original${result.poster_path})`
              : noPosterSmall,
          }}
        />
        <div className="mt-10 w-8/12 ml-10">
          <span className="text-4xl font-black uppercase">
            {result.original_title
              ? result.original_title
              : result.original_name}
          </span>
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
          <p className="w-1/2 opacity-70 leading-relaxed">{result.overview}</p>
        </div>
      </div>
      {error && <Message color="#e74c3c" text={error} />}
    </div>
  );
});

export default Detail;
