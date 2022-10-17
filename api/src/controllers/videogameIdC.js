const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API, API_KEY } = process.env;

const videogameId = async (id) => {
  try {
    const dataApi = await axios.get(
      `https:api.rawg.io/api/games/${id}?key=2e49dc74623147acb4ec2aa29cf68f35`
    );

    const videogameDataId = {
      name: dataApi.data.name,
      image: dataApi.data.background_image,
      released: dataApi.data.released,
      rating: dataApi.data.rating,
      genres: dataApi.data.genres.map((el) => el.name).join(" - "),
      platforms: dataApi.data.platforms
        .map((el) => el.platform.name)
        .join(" - "),
      description: dataApi.data.description.replace(/<[^>]*>/g, ""),
    };
    console.log("SOY videgameIdData", videogameDataId);
    return videogameDataId;
  } catch (error) {
    console.log(error);
  }

  try {
    const videogameDbId = await Videogame.findByPk(id, { include: Genres });

    const videogameBaseDatos = {
      name: videogameDbId.name,
      image: videogameDbId.background_image,
      released: videogameDbId.released,
      rating: videogameDbId.rating,
      genres: videogameDbId.genres.map((el) => el.name),
      platforms: videogameDbId.platforms,
      description: videogameDbId.description,
    };
    return videogameBaseDatos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = videogameId;
