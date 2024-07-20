import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { MediaContext } from "./../../Context/MediaStore";
import PaginationComp from "./../Pagination/PaginationComp";
import Items from "../Items/Items";

export default function () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  let { trendingMovies } = useContext(MediaContext);
  return (
    <>
      {!isLoading ? (
        <div className="row py-4 gy-3">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Movies</title>
          </Helmet>

          <div className="col-md-4">
            <div>
              <div className="brdr mb-3 w-25"></div>
              <h3>Trending</h3>
              <h3>Movies</h3>
              <h3>To watch now</h3>
              <span className="text-muted">most watched movies by day</span>
              <div className="brdr mt-4 w-100"></div>
            </div>
          </div>
          {trendingMovies
            .slice(0, 20)
            .filter((ele) => ele.poster_path !== null)
            .map((item, index) => (
              <Items item={item} key={index} />
            ))}
          <PaginationComp />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
