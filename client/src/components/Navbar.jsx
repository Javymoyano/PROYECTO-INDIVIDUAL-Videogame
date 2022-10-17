import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/navbar.css";
import Crear from "../components/Images/masblanco.png";
import Search from "./Search";
import { getVideogames } from "../action";
import Refresh from "../components/Images/refreshblanco.png";

export default function Navbar() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }
  return (
    <div className="nav-container">
      <div
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <img
          className="refresh"
          src={Refresh}
          alt="refresh"
          title="Cargar todos los Pokémons"
        />
      </div>
      <div>
        <h1 className="encuentra">Videogames for Gamers</h1>
      </div>

      <div className="ambos">
        <div>
          <Search />
        </div>
        <div>
          <Link to="/create">
            <img
              className="crearVideogame"
              src={Crear}
              alt="crear"
              title="Crear nuevo Videogame"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
