import React, { useContext, useEffect, useState} from "react";
import { Offline } from "react-detect-offline";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { MediaContext } from "../../Context/MediaStore";
import Items from "../Items/Items";
import Loading from "../Loading/Loading";
import Disconnected from "./../Disconnected/Disconnected";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);
  let { trendingMovies, trendingTvs, trendingPersons, trends } =
    useContext(MediaContext);

  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <Offline>
        <Disconnected />
      </Offline>

      {!isLoading? (
        <>
          <div className="my-2">
            <Slider {...settings} autoplaySpeed={1000}>
              {trends
                ?.filter((ele) => ele.poster_path !== null)
                .map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        height={500}
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        className="w-100  cursor-pointer slid"
                        alt="trendingMovies"
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div className="row py-4 gy-3">
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
          </div>

          <div className="row py-4 gy-3">
            <div className="col-md-4">
              <div>
                <div className="brdr mb-3 w-25"></div>
                <h3>Trending</h3>
                <h3>Tv</h3>
                <h3>To watch now</h3>
                <span className="text-muted">most watched tvshows by day</span>
                <div className="brdr mt-4 w-100"></div>
              </div>
            </div>
            {trendingTvs
              .slice(0, 20)
              .filter((ele) => ele.poster_path !== null)
              .map((item, index) => (
                <Items item={item} key={index} />
              ))}
          </div>

          <div className="row py-4 gy-3">
            <div className="col-md-4">
              <div>
                <div className="brdr mb-3 w-25"></div>
                <h3>Trending</h3>
                <h3>People</h3>
                <h3>To watch now</h3>
                <span className="text-muted">most watched people by day</span>
                <div className="brdr mt-4 w-100"></div>
              </div>
            </div>
            {trendingPersons
              .slice(0, 20)
              .filter((ele) => ele.profile_path !== null)
              .map((item, index) => (
                <Items item={item} key={index} />
              ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
