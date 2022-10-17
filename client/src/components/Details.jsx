import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getClean, videogameDetails } from "../action";
import loading from "../components/Images/loading.png";
import "../styles/details.css";

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

  return (
    <div>
      {myVideogame ? (
        <div>
          <h1>{myVideogame.name}</h1>
          <img src={myVideogame.image} alt="img" />
          <p>{myVideogame.description}</p>
          <h4>
            <small>{myVideogame.rating}</small>
          </h4>
          <h4>
            <small>{myVideogame.platforms}</small>
          </h4>
          <h4>
            <small>{myVideogame.genres}</small>
          </h4>
          <h4>
            <small>{myVideogame.released}</small>
          </h4>
        </div>
      ) : (
        <div>
          <img className="loading" src={loading} alt="loading" />
        </div>
      )}

      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
