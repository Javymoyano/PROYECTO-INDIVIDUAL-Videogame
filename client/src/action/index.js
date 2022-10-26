import axios from "axios";
import swal from "sweetalert";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const ALPHABETICAL_FILTER = "ALPHABETICAL_FILTER";
export const FILTER_RATING = "FILTER_RATING";
export const GET_VIDEOGAME_NAME = "GET_VIDEOGAME_NAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_PLATFORMS = "FILTER_BY_PLATFORMS";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const GET_GENRES_VIDEOGAME = "GET_GENRES_VIDEOGAME";
export const GET_PLATFORM_VIDEOGAME = "GET_PLATFORM_VIDEOGAME";
export const VIDEOGAME_DETAILS = "VIDEOGAME_DETAILS";
export const GET_CLEAN = "GET_CLEAN";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      let videogameName = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_VIDEOGAME_NAME",
        payload: videogameName.data,
      });
    } catch (error) {
      alert("UPS! Ese videogame no existe");
    }
  };
}

// swal({
//   title: "Ups!",
//   text: "Videogame no encontrado!",
//   icon: "error",
//   button: "Volver a Buscar!",
// });

// alert("Videogame no encontrado");

export function getGenresVideogame() {
  return async function (dispatch) {
    try {
      let jsonGenres = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES_VIDEOGAME",
        payload: jsonGenres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getPlatformVideogame() {
  return async function (dispatch) {
    try {
      let jsonPlatform = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_PLATFORM_VIDEOGAME",
        payload: jsonPlatform.data.map((e) => e.parent_platforms),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function videogameDetails(id) {
  return async function (dispatch) {
    try {
      let jsonId = await axios.get("http://localhost:3001/videogames/" + id);
      return dispatch({
        type: "VIDEOGAME_DETAILS",
        payload: jsonId.data,
      });
    } catch (error) {
      alert("No se encontró ningun Videogame con ese ID");
    }
  };
}
export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:3001/create", payload);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterAlphabetical(payload) {
  return {
    type: "ALPHABETICAL_FILTER",
    payload,
  };
}

export function filterByRating(payload) {
  return {
    type: "FILTER_RATING",
    payload,
  };
}

export function filterByGenres(payload) {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}
export function filterByPlatforms(payload) {
  return {
    type: "FILTER_BY_PLATFORMS",
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}
export function getClean() {
  return {
    type: "GET_CLEAN",
  };
}
