import React, { useEffect, useState } from "react";
import Section from "../Components/Section";
import { Loader } from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import { Helmet } from "react-helmet";
import { tvApi } from "../api";

interface IPoster {
  id: number;
  poster_path: string;
  original_name: string;
  vote_average: number;
  first_air_date: string;
}

const initPoster: IPoster[] | null = [];

const TV = () => {
  const [topRated, setTopRated] = useState<IPoster[]>(initPoster);
  const [popular, setPopular] = useState<IPoster[]>(initPoster);
  const [airingToday, setAiringToday] = useState<IPoster[]>(initPoster);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getContents = async () => {
    const {
      data: { results: topRated },
    } = await tvApi.topRated();
    const {
      data: { results: popular },
    } = await tvApi.popular();
    const {
      data: { results: airingToday },
    } = await tvApi.airingToday();
    await setTopRated(topRated);
    await setPopular(popular);
    await setAiringToday(airingToday);
  };

  useEffect(() => {
    getContents()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>TV Shows | yjsflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-16 px-4">
          {topRated && topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.length > 0 && (
            <Section title="Airing Today">
              {airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
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

export default TV;
