const { Router } = require("express");
const getApiGenres = require("../controllers/genresC.js");
const router = Router();
const { Videogame, Genres } = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
  let platformApi = await axios.get(
    "https://api.rawg.io/api/platforms/lists/parents?key=2e49dc74623147acb4ec2aa29cf68f35"
  );
  let apiResul = platformApi.data.results.map((e) => e.name);
  res.send(apiResul);
});

module.exports = router;
