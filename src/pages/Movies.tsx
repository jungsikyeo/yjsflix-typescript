import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Section from "../Components/Section";
import { Loader } from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import { moviesApi } from "../api";

interface IPoster {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  isMovie: boolean;
}

const initPoster: [IPoster] = [
  {
    id: 0,
    poster_path: "",
    original_title: "",
    vote_average: 0,
    release_date: "",
    isMovie: true,
  },
];

const Movies = () => {
  const [nowPlaying, setNowPlaying] = useState<[IPoster]>(initPoster);
  const [upcoming, setUpcoming] = useState<[IPoster]>(initPoster);
  const [popular, setPopular] = useState<[IPoster]>(initPoster);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getContents = async () => {
    const {
      data: { results: nowPlaying },
    } = await moviesApi.nowPlaying();
    const {
      data: { results: upcoming },
    } = await moviesApi.upcoming();
    const {
      data: { results: popular },
    } = await moviesApi.popular();
    await setNowPlaying(nowPlaying);
    await setUpcoming(upcoming);
    await setPopular(popular);
  };

  useEffect(() => {
    getContents()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | yjsflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-16 px-4">
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
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
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {upcoming.map((movie) => (
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
          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              {popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </div>
      )}
    </>
  );
};

export default Movies;
