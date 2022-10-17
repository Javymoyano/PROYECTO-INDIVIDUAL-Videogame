const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoute = require("./videogames");
const genresRoute = require("./genres");
const platformsRoute = require("./platforms");
const createVideogame = require("./videogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesRoute);
router.use("/genres", genresRoute);
router.use("/platforms", platformsRoute);
router.use("/create", createVideogame);

module.exports = router;
