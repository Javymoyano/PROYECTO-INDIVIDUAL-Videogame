const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API, API_KEY } = process.env;

//!...........GET DATOS A LA API............//

const getAPIinfo = async () => {
  var gets = [1, 2, 3, 4].map(
    async (e) =>
      await axios.get(
        `https://api.rawg.io/api/games?key=2e49dc74623147acb4ec2aa29cf68f35&page_size=25&page=${e}`
      )
  );
  let allGets = await Promise.all(gets);
  let apiURL = allGets.reduce((prev, curr) => {
    return prev.concat(curr.data.results);
  }, []);

  const apiDATA = apiURL.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      rating: el.rating,
      genres: el.genres.map((el) => el.name),
      platforms: el.platforms.map((el) => el.platform.name),
      description: el.description_raw,
    };
  });
  //console.log("SOY aiDATA", apiDATA);
  return apiDATA;
};

//!.............GET DATOS BASE DE DATOS.............//

const getGamesDB = async () => {
  let gamesDB = await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let videogameAux = gamesDB.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.image,
      rating: el.rating,
      genres: el.genres.map((el) => el.name),
      platforms: el.platforms,
      description: el.description,
    };
  });
  console.log("SOY videogameAux", videogameAux);
  return videogameAux;
};

//!...........CONCATENAR CONSULTA APY Y CONSULTA DB..........//

const allGames = async () => {
  const apiGames = await getAPIinfo();
  const dbGames = await getGamesDB();
  const totalGames = apiGames.concat(dbGames);
  // const totalGames= [...apiGames, ...dbGames]
  return totalGames;
};

module.exports = allGames;
