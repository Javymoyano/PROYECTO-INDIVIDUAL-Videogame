import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGenresVideogame } from "../action";
import "../styles/form.css";

function validName(str) {
  if (typeof str !== "string") return true;
  if (str.length < 3) return true;
}

function validar(input) {
  let errors = {};
  if (validName(input.name)) errors.name = "Por favor introduzca un Nombre";

  if (input.rating < 1 || input.attack >= 100)
    errors.rating = "Debe ser mayor a 1 y menor a 1000";

  if (!input.genres) errors.genres = "Debe seleccionar el Género";
  if (!input.description)
    errors.description = "Por favor introduzca la Descripción";
  if (!input.platforms) errors.platforms = "Por favor introduzca la Plataforma";

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [input, setInput] = useState({
    name: "",
    genres: [],
    image: "",
    rating: "",
    description: "",
    platforms: "",
  });

  useEffect(() => {
    dispatch(getGenresVideogame());
  }, []);

  const [errors, setErrors] = useState({});
  const [errorBoton, setErrorBoton] = useState(
    Object.values(errors).length > 0 ? true : false
  );

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validar(input));
  }
  console.log("SOY EL INPUT", input);

  function handleGenres(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
  }
  console.log("Soy GENRES", input);
  function handlePlatform(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
  }
  console.log("Soy platforms", input);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(validar(input));
    await axios.post("http://localhost:3001/create", input);
    setInput({
      name: "",
      genres: [],
      image: "",
      rating: "",
      description: "",
      platforms: [],
    });
    alert("Videogame creado con éxito");

    console.log("Soy el submit", input);
  }

  return (
    <div className="container-form">
      <div>
        <Link to="/home">
          <button className="atras">ATRÁS</button>
        </Link>

        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            <h1>CREA TU VIDEOGAME</h1>
          </div>
          <div className="input_label">
            <label>NOMBRE</label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              value={input.name}
              name="name"
              className="input"
            />
            {errors.name ? <p className="error">{errors.name}</p> : false}
            <div>
              <label>RATING</label>
              <input
                onChange={handleInputChange}
                type="number"
                value={input.rating}
                name="rating"
                className="input"
              />
              {errors.rating ? <p className="error">{errors.rating}</p> : false}
            </div>
            <div>
              <label>DESCRIPCIÓN</label>
              <input
                onChange={handleInputChange}
                type="text"
                value={input.description}
                name="description"
                className="input"
              />
              {errors.description ? (
                <p className="error">{errors.description}</p>
              ) : (
                false
              )}
            </div>

            <div>
              <label>IMAGEN</label>
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Introduzca URL de la Imagen..."
                value={input.image}
                name="image"
                className="input"
              />
              {errors.image ? <p className="error">{errors.image}</p> : false}
            </div>
            <div>
              <label>GÉNERO*</label>
              <select className="generos" onChange={handleGenres}>
                {genres.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
              <p className="elige-tipo">
                <small>*Elige hasta DOS tipos</small>
              </p>

              <ul>
                <li key={genres.id}>
                  {input.genres.map((e) => e.toUpperCase()).join(" - ")}
                </li>
              </ul>
              {errors.genres ? <p className="error">{errors.genres}</p> : false}
            </div>
            <div>
              <label>PLATAFORMA*</label>
              <select className="generos" onChange={handlePlatform}>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="AppleMacintosh">Apple Macintosh</option>
                <option value="Linux">Linux</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Atari">Atari</option>
                <option value="CommodoreAmiga">Commodore / Amiga</option>
                <option value="SEGA">SEGA</option>
                <option value="3DO">3DO</option>
                <option value="NeoGeo">Neo Geo</option>
                <option value="Web">Web</option>
              </select>
              {/* <select className="platforms" onChange={handlePlatform}>
            {platforms.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select> */}
              <p className="elige-tipo">
                <small>*Elige hasta DOS tipos</small>
              </p>

              {/* <ul>
            <li key={platforms.id}>
              {input.platforms.map((e) => e.toUpperCase()).join(" - ")}
            </li>
          </ul> */}
              {errors.platforms ? (
                <p className="error">{errors.platforms}</p>
              ) : (
                false
              )}
            </div>
          </div>
          <div>
            <button className="bottom" type="submit" disabled={errorBoton}>
              Crear Videogame
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
