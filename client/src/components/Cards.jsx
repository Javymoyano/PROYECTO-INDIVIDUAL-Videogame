import React from "react";
import "../styles/cards.css";
export default function Cards({ image, name, genres, rating }) {
  return (
    <div className="stylesCard">
      <div>
        <img src={image} alt="img not found" />
      </div>
      <div>
        <h4 className="rating">{rating}</h4>
      </div>
      <div className="name">
        <h3>{name}</h3>
      </div>

      <div>
        <p className="genres_p">Géneros</p>
        <p className="genereos_list">{genres.join(" · ")}</p>
      </div>
    </div>
  );
}
