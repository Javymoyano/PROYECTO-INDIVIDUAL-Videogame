const { Router } = require("express");
const getApiGenres = require("../controllers/genresC.js");
const router = Router();
const { Videogame, Genres } = require("../db");

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const genresAll = await getApiGenres();
    if (name) {
      let genresPerName = genresAll.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      genresPerName.length
        ? res.status(200).send(genresPerName)
        : res.status(400).send("genero no existe");
    } else {
      res.send(genresAll);
    }
    console.log("Generos cargados");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
