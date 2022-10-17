import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="títuloLanding">
        <h1>VIDEOGAMES FOR GAMERS</h1>
      </div>
      <div class="explora">
        <p>EXPLORA</p>

        <b>
          <div className="mensaje">
            todos los títulos <br />
            todas las reseñas <br />
            todos tus sentidos
            <br />
            todas las emociones
            <br />
            TODOS LOS JUEGOS...
          </div>
        </b>
      </div>

      <div className="in">
        <Link to="/home">
          <button className="buttonIn">PLAY THE GAME</button>
        </Link>
      </div>
    </div>
  );
}
