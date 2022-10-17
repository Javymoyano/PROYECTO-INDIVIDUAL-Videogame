const { Router } = require("express");
const { Videogame, Genres } = require("../db");
const router = Router();

//!...........POST PARA CREAR VIDEOGAMES..............//

router.post("/", async (req, res) => {
  const { name, image, rating, description, platforms, genres } = req.body;

  try {
    // if (!name || !image) {
    //         res.status(400).send("Falta Nombre o Imagen");
    //       }
    const objVideo = {
      name,
      image,
      rating,
      description,
      platforms,
    };

    const newVideogame = await Videogame.create(objVideo);

    let genresVg = await Genres.findAll({ where: { name: genres } });
    newVideogame.addGenres(genresVg);
    res.send(newVideogame);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { name, image, rating, genres, description, platforms } = req.body;

//     if (!name || !image) {
//       res.status(400).send("Falta Nombre o Imagen");
//     }

//     const obj = {
//       name,
//       image,
//       rating,
//       genres,
//       platforms,
//       description,
//     };

//     const newVideogame = await Videogame.create(obj);
//     let genresDb = await Genres.findAll({
//       where: {
//         name: genres,
//       },
//     });

//     newVideogame.addGenres(genresDb);
//     res.send(newVideogame);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
