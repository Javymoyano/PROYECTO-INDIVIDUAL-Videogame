const axios = require("axios");
const { Videogame, Genres } = require("../db");

const { API_GENRES } = process.env;

const getApiGenres = async () => {
  const apiGenres = await axios.get(API_GENRES);
  const genresResults = await apiGenres.data.results;
  console.log("SOY genresResults", genresResults);
  //   const genresMap = genresResults.map((e) => {
  //     return {
  //       id: e.id,
  //       name: e.name,
  //     };
  //   });

  //const genresMap = await genresResults.map((e) => e.name);

  genresResults.forEach(async (genero) => {
    await Genres.findOrCreate({
      where: { name: genero.name },
    });
  });

  const allGenres = await Genres.findAll();
  console.log("Soy allGenres", allGenres);
  return allGenres;
};

module.exports = getApiGenres;
