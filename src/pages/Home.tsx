import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import { moviesApi } from "../api";
import { Helmet } from "react-helmet";
import { Loader } from "../Components/Loader";
import Message from "../Components/Message";

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [trendingData, setTrending] = useState([]);
  const [error, setError] = useState("");

  async function getMoviesData() {
    const {
      data: { results },
    } = await moviesApi.trending();
    setTrending(results);
  }

  useEffect(() => {
    getMoviesData()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>YJSFLIX</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <Carousel trendingData={trendingData} />
          {error && <Message text={error} color="#e50914" />}
        </div>
      )}
    </>
  );
};

export default Home;
