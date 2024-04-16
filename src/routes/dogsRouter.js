const { Router } = require('express');
const{ getHandler, createDogHandler,getDetailHandler, getTemperamentsHandler } = require("../handlers/dogsHandlres");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogsRouter = Router();

dogsRouter.get("/dogs", getHandler);

dogsRouter.get("/dogs/:id", getDetailHandler);

dogsRouter.get("/temperaments", getTemperamentsHandler)

//dogsRouter.get("/dogs/name", getDogByNameHandler);


dogsRouter.post("/dogs", createDogHandler);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = dogsRouter;