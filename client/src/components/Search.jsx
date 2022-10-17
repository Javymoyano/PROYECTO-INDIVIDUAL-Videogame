import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideogameByName } from "../action";
import buscar from "../components/Images/buscarblanco.png";
import styles from "../styles/search.module.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);

    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogameByName(name));
    setName("");
  }

  return (
    <div>
      <div className={styles.inputSearchFader}>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Buscar un videogame..."
          onChange={(e) => handleInputChange(e)}
        />
        <div>
          <img
            className={styles.imgSearch}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            src={buscar}
            alt="search"
          />
        </div>
      </div>
    </div>
  );
}
