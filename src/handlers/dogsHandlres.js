/**
 * ! recibimos req y res.
 * * postriormente podemos utilizarlos en las funciones.
 */



const { getDogs, getDogsByName, getDetail, getTemperaments } = require("../controllers/dogControllers");
const createDog = require("../controllers/createDog");

// const getHandler = async (req, res) => {
    
//     try {
//         const response = await getDogs();
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({error:error.menssage});
//     }
// }
const getHandler = async (req, res) => {
    try {
        if (req.query.name) { // Si hay un parámetro de consulta "name"
            const name = req.query.name;
            const dogs = await getDogsByName(name);
            if (!dogs) {
                throw new Error('No se encontraron perros');
            }
            res.status(200).json(dogs);
        } else { // Si no hay un parámetro de consulta "name", obtiene todos los perros
            const response = await getDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const dog = await getDetail(id);
        res.status(200).json(dog);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};

// const getDogByNameHandler = async (req, res) => {
//     const { name } = req.query; // Obtener el parámetro de consulta "name"
//     try {
//         const dogs = await getDogsByName(name);

//         if (!dogs) {
//             throw new Error('No se encontraron perros');
//         }

//         res.status(200).json(dogs);
//     } catch (error) {
//         res.status(404).json({error: error.message});
//     }
// };

const createDogHandler = async (req, res) => { 
    const { id, name, height_min, weight_min, height_max, weight_max, life_span, image, createdInDB,temperaments } = req.body;
    console.log("el body es ", req.body);
    try {
        const response = await createDog(id, name, height_min, weight_min, height_max, weight_max, life_span, image, createdInDB, temperaments);

       
        
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHandler,
    createDogHandler,
    getDetailHandler,
    getTemperamentsHandler
};