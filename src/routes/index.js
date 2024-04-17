const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const breeds = require('./breedsRouter');
const temperaments = require('./routesTemperaments');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use(dogsRouter);
router.use( breeds);
router.use( temperaments);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

/*

// Importar todos los routers;
const dogs = require('./routesDog');
const temperaments = require('./routesTemperaments');
const breeds = require('./routesBreeds');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogs);
router.use('/', temperaments);
router.use('/', breeds);

module.exports = router;

*/