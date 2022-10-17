const { Router } = require("express");
const getApiGenres = require("../controllers/genresC.js");
const router = Router();
const { Videogame, Genres } = require("../db");

router.get("/", async (req, res) => {
  try {
    const genresAll = await getApiGenres();
    console.log("Generos cargados");
    res.send(genresAll);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
