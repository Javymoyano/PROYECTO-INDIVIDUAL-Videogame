import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getClean, videogameDetails } from "../action";
import loading from "../components/Images/loading.png";
import "../styles/details.css";
import rating from "../components/Images/ratingblanco.png";
import platforms from "../components/Images/playblanco.png";
import generos from "../components/Images/genresblanco.png";
import realizado from "../components/Images/calendarblanco.png";
import Loading from "./Loading";
import back from "../components/Images/backblanco.png";

export default function Details(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(videogameDetails(id));
    return () => {
      dispatch(getClean());
    };
  }, [id, dispatch]);

  const myVideogame = useSelector((state) => state.details);
  console.log(myVideogame);

  if (myVideogame.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        {myVideogame ? (
          <div className="content_ds">
            <div className="cont_img_ds">
              <img className="img_ds" src={myVideogame.image} alt="img" />
            </div>
            <div className="game_name">
              <h1>{myVideogame.name}</h1>
            </div>
            <div className="description">
              <p>{myVideogame.description}</p>
            </div>
            <div>
              <div className="rt">
                <img className="rt_img" src={rating} alt="rating" />
              </div>
              <h4 className="rt_a">{myVideogame.rating}</h4>
            </div>

            <div>
              <div className="rt">
                <img className="rt_img" src={platforms} alt="rating" />
              </div>
              <h4 className="rt_a">{myVideogame.platforms}</h4>
            </div>
            <div>
              <div className="rt">
                <img className="rt_img" src={generos} alt="rating" />
              </div>
              <h4 className="rt_a">{myVideogame.genres}</h4>
            </div>
            <div>
              <div className="rt">
                <img className="rt_img" src={realizado} alt="rating" />
              </div>
              <h4 className="rt_a">{myVideogame.released}</h4>
            </div>
          </div>
        ) : (
          <div>
            <img className="loading" src={loading} alt="loading" />
          </div>
        )}
        <div>
          <Link to="/home">
            <button className="back_to_home">
              <img className="atrasImg" src={back} alt="atas" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
