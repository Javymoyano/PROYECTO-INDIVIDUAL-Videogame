import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGenresVideogame, getPlatformVideogame } from "../action";
import "../styles/form.css";
import backHome from "../components/Images/backblanco.png";
import Mario from "../components/Images/mario.png";
import swal from "sweetalert";
import iupi from "../components/Images/iupi.png";
import AlertExito from "./AlertExito";

function validName(str) {
  if (typeof str !== "string") return true;
  if (str.length < 3) return true;
}

function validar(input) {
  let errors = {};
  if (validName(input.name)) errors.name = "Por favor introduzca un Nombre";

  if (input.rating < 1 || input.rating >= 5)
    errors.rating = "Debe ser mayor a 1 y menor a 5";

  if (!input.image) errors.image = "Debe introducir una imagen";
  if (!input.released) errors.released = "Debe introducir una fecha";
  if (!input.genres) errors.genres = "Debe seleccionar el Género";
  if (!input.description)
    errors.description = "Por favor introduzca la Descripción";
  if (!input.platforms) errors.platforms = "Por favor introduzca la Plataforma";

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  // const platforms = useSelector((state) => state.platforms);

  const platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "iOS",
    "Android",
    "Apple Macintosh",
    "Linux",
    "Nintendo",
    "Atari",
    "Commodore / Amiga",
    "SEGA",
    "3DO",
    "Neo Geo",
    "Web",
  ];

  console.log("SOY platforms", platforms);

  const [input, setInput] = useState({
    name: "",
    genres: [],
    image: "",
    released: "",
    rating: "",
    description: "",
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenresVideogame());
  }, []);
  useEffect(() => {
    dispatch(getPlatformVideogame());
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
      released: "",
      rating: "",
      description: "",
      platforms: [],
    });

    alert("Creaste un nuevo Videogame!!");
    // swal({
    //   title: "Felicitaciones!",
    //   text: "Creaste un nuevo Videogame!",
    //   icon: "success",
    //   button: "Listo!",
    // });

    console.log("Soy el submit", input);
  }
  function handleDelete(genre) {
    setInput({
      ...input,
      genres: input.genres.filter((e) => e !== genre),
    });

    console.log("Soy el submitGenres", input);
  }
  function handleDeletetPlatform(plataform) {
    setInput({
      ...input,
      platforms: input.platforms.filter((e) => e !== plataform),
    });
  }

  return (
    <div className="container-form">
      <div>
        <Link to="/home">
          <button className="irCasa">
            <img className="flechaF" src={backHome} alt="atas" />
          </button>
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
              <label>FECHA DE REALIZACIÓN</label>
              <input
                onChange={handleInputChange}
                type="date"
                placeholder="DD/MM/AAAA"
                value={input.released}
                name="released"
                className="fecha"
              />
              {errors.released ? (
                <p className="error">{errors.released}</p>
              ) : (
                false
              )}
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
                  {/* {input.genres.map((ele) => (
                    <h5>
                      {genres.find((g) => g.name === ele)?.name.toUpperCase()}
                      <button onClick={() => handleDelete(ele)}>x</button>
                    </h5>
                  ))} */}
                </li>
              </ul>
              {errors.genres ? <p className="error">{errors.genres}</p> : false}
            </div>
            <div>
              <label>PLATAFORMA*</label>
              {/* <select className="generos" onChange={handlePlatform}>
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
              </select> */}
              <select className="generos" onChange={handlePlatform}>
                {platforms.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
              <p className="elige-tipo">
                <small>*Elige hasta DOS tipos</small>
              </p>

              <ul>
                <li key={platforms.id}>
                  {input.platforms.map((e) => e.toUpperCase()).join(" - ")}
                  {/* {input.platforms.map((el) => (
                    <h5>
                      {platforms.find((p) => p === el)}
                      <button onClick={() => handleDeletetPlatform(el)}>
                        x
                      </button>
                    </h5>
                  ))} */}
                </li>
              </ul>
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
