const { Router } = require("express");
const allGames = require("../controllers/videogameC.js");
const router = Router();
const { Videogame, Genres } = require("../db");
const axios = require("axios");
const videogameId = require("../controllers/videogameIdC.js");

//!.......BUSQUEDA POR NAME.....//
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const gamesTodos = await allGames();
    if (name) {
      let gamesName = await gamesTodos.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      ); //!TODO: probar con el "===" en lugar del includes()
      console.log(gamesName);
      gamesName.length
        ? res.status(200).send(gamesName)
        : res.status(400).send("Ese nombre no existe");
    } else {
      res.status(200).send(gamesTodos);
    }
  } catch (error) {
    console.log(error);
  }
});

//!...........BUSQUEDA POR ID...........//

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const videogameInfo = await videogameId(id);
    if (!videogameInfo) return res.send("Id no existe");
    res.json(videogameInfo);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const gamesTodos = await allGames();
//     if (id) {
//       let gamesId = await gamesTodos.filter((e) => e.id == id);
//       console.log("SOY gamesId", gamesId);
//       gamesId.length
//         ? res.status(200).json(gamesId)
//         : res.status(400).send("Ese ID no corresponde con un Videogame");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
