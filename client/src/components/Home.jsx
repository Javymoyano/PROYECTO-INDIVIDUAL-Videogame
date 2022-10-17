import React from "react";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAlphabetical,
  filterByCreated,
  filterByGenres,
  filterByRating,
  getVideogames,
} from "../action";
import { Link } from "react-router-dom";
import Pages from "./Pages";
// import Search from "./Search";
// import Refresh from "../components/Images/refresh.png";
import "../styles/home.css";
import Navbar from "./Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage, setVideogamePerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamePerPage; // resultado:15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamePerPage; // resultado: 0 --> la cantida de personajes - la cantidad de personajes por pagina
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  if (
    currentPage > Math.ceil(allVideogames.length / videogamePerPage) &&
    currentPage !== 1
  ) {
    setCurrentPage(1);
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getVideogames());
  // }

  function handleSortAz(e) {
    e.preventDefault();
    dispatch(filterAlphabetical(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="home-cont">
        <Navbar />
        {/* <Link to="/create">Crear Videojuego</Link>
        <h1>SOY EL HOME</h1> */}
        {/* <div
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
        </div> */}
        <div></div>
        {/* <div>
          <Search />
        </div> */}
        <div>
          <select onChange={(e) => handleSortAz(e)}>
            <option value="all">ORDEN ALFABÉTICO</option>
            <option value="az">A/Z</option>
            <option value="za">Z/A</option>
          </select>
          <select onChange={(e) => handleRating(e)}>
            <option value="Rating">RATING</option>
            <option value="asc">Mayor Rating</option>
            <option value="desc">Menor Rating</option>
          </select>

          <select onChange={(e) => handleGenres(e)}>
            <option value="Genres">GÉNERO</option>
            <option value="Adventure"> Adventure </option>
            <option value="Strategy"> Strategy </option>
            <option value="RPG"> RPG </option>
            <option value="Action"> Action </option>
            <option value="Indie"> Indie </option>
            <option value="Puzzle"> Puzzle </option>
            <option value="Shooter"> Shooter </option>
            <option value="Casual"> Casual </option>
            <option value="Simulation"> Simulation </option>
            <option value="Arcade"> Arcade </option>
            <option value="Platformer"> Platformer </option>
            <option value="Racing"> Racing </option>
            <option value="Massively Multiplayer">
              {" "}
              Massively Multiplayer{" "}
            </option>
            <option value="Sports"> Sports </option>
            <option value="Fighting"> Fighting </option>
            <option value="Family"> Family </option>
            <option value="Board Games"> Board Games </option>
            <option value="Educational"> Educational </option>
            <option value="Card"> Card </option>
          </select>
          <select onChange={(e) => handleCreated(e)}>
            <option value="all"> TODOS </option>
            <option value="creados"> Creados </option>
            <option value="existentes"> Existentes </option>
          </select>
          <div>
            <Pages
              videogamePerPage={videogamePerPage}
              allVideogames={allVideogames.length}
              paginado={paginado}
            />
          </div>
          {currentVideogames ? (
            currentVideogames.map((e) => {
              return (
                <>
                  <Link to={"/videogames/" + e.id}>
                    <Cards
                      image={e.image}
                      name={e.name}
                      rating={e.rating}
                      genres={e.genres}
                    />
                  </Link>
                </>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
}
