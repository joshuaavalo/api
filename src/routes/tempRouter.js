const { Router } = require('express');
const { getTemperamentsHandler } = require('../handlers/dogsHandlres');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const tempRouter = Router();

//tempRouter.get("/dogs", getTemperamentsHandler );


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = tempRouter;