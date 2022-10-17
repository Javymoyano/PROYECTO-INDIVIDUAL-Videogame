import React from "react";
import "../styles/pages.css";

export default function Pages({ videogamePerPage, allVideogames, paginado }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamePerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map((number) => {
            return (
              <li key={number} className="number">
                <button className="btn" onClick={() => paginado(number)}>
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
