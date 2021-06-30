import React, { useState } from "react";
import { Loader } from "../Components/Loader";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import { Helmet } from "react-helmet";
import { moviesApi, tvApi } from "../api";

interface IMovie {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  isMovie: boolean;
}

interface ITV {
  id: number;
  poster_path: string;
  original_name: string;
  vote_average: number;
  first_air_date: string;
}

const initMovie: IMovie[] | null = [];

const initTV: ITV[] | null = [];

const Search = () => {
  const [movieResults, setMovieResults] = useState<IMovie[]>(initMovie);
  const [tvResults, setTvResults] = useState<ITV[]>(initTV);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const searchByTerm = async () => {
    try {
      setLoading(true);
      setSearching(true);
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      await setMovieResults(movieResults);
      await setTvResults(tvResults);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    if (value === "") {
      return;
    }
    searchByTerm()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const updateTerm = (event: any) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  return (
    <div className="p-10">
      <Helmet>
        <title>Search | yjsflix</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-14 mb-10 flex justify-center"
      >
        <input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
          className="w-1/2 ml-4 text-4xl text-gray-100 border-0 outline-none bg-transparent text-center"
        />
      </form>
      {searching ? (
        loading ? (
          <Loader />
        ) : (
          <>
            <div className="mb-10">
              <Message
                color="#000000"
                text={`Result Count : ${
                  movieResults.length + tvResults.length
                }`}
              />
            </div>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Show Results">
                {tvResults.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.original_name}
                    rating={show.vote_average}
                    year={show.first_air_date?.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
            {tvResults &&
              movieResults &&
              tvResults.length < 1 &&
              movieResults.length < 1 && (
                <Message color="#95a5a6" text="Nothing found" />
              )}
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
