const { Dog, Temperaments } = require ("../db");
const axios = require ('axios');
require('dotenv').config();
const { API_URL, API_KEY} = process.env;
const { infoCleaner, infoCleanerDb} = require("../helpers/index");
const { Op } = require("sequelize");


//  const getDogs = async () => {
//     try {
//         const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
//         if(!response){throw new Error('no hay respuesta')};
//         const data = infoCleaner(response.data);
//         return data;
//     } catch (error) {
//         throw error;
//     }
//  }
 

//  const getDetail = async (id) => {
//   try {
//       let dog = await Dog.findOne({
//           where: {
//               id: id
//           },
//           include: [Temperaments]
//       });

//       if (!dog) {
//           throw new Error('Raza no encontrada en la base de datos');
//       }

//       return dog;
//   } catch (error) {
//       throw error;
//   }
// };


 
// const getDogByName = async (name) => {
//     try {
//         // Buscar perros por nombre en la base de datos
//         let dogsFromDB = await Dog.findAll({
//             where: {
//                 name: {
//                     [Sequelize.Op.iLike]: `%${name}%` // Buscar nombres que contengan la cadena especificada, sin importar mayúsculas o minúsculas
//                 }
//             },
//             include: [Temperaments] // Incluir los temperamentos asociados
//         });

//         // Si no se encontraron perros en la base de datos, retornar null
//         if (dogsFromDB.length === 0) {
//             return null;
//         }

//         return dogsFromDB;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     getDogs, getDogByName, getDetail
// };

const getDogs = async () => {
    try {
        

        let dogsFromDB = await Dog.findAll({
            include: [{ model: Temperaments, attributes: 
                ['name'],  // Especifica las columnas que deseas incluir del modelo Dog
                through: {
                    attributes: [] // Esto evita que se incluyan las columnas adicionales de la tabla intermedia
                }
            
            }]
        });
        const dogsAPI = [];
        for (let page = 1; page <= 5; page++) {
            const url = `${API_URL}?api_key=${API_KEY}`;
            try {
                const response = await axios.get(url);
                if (!response) {
                    throw new Error('No hay respuesta de la API');
                }
                const infoApi = response.data;
                const dogsFiltered = infoCleaner(infoApi);
                dogsAPI.push(dogsFiltered);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        }
      
        const dogsApiF = dogsAPI.flat(1); // cuando hay un array dentro de un array  lo coloca en u array plano.
        return [...dogsFromDB, ...dogsApiF]; 
        //
        // Si hay perros en la base de datos, devolverlos
        // if (dogsFromDB.length > 0) {
        //     return dogsFromDB;
        // } else {
        //     // Si no hay perros en la base de datos, obtenerlos de la API externa
        //     const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        //     if (!response) {
        //         throw new Error('No hay respuesta de la API');
        //     }
        //     const data = infoCleaner(response.data);

        //      // Guardar los perros obtenidos de la API en la base de datos
        //     ;

        //     return data;
        //}
    } catch (error) {
        throw new Error('Error al obtener los perros: ' + error.message);
    }
};

const getDetail = async (id) => {
    try {
        let dog = await Dog.findOne({
            where: {
                id: id
            },
            include: [Temperaments]
        });

        if (!dog) {
            throw new Error('Raza no encontrada en la base de datos');
        }

        return dog;
    } catch (error) {
        throw new Error('Error al obtener el detalle del perro: ' + error.message);
    }
};

const getDogsByName = async (name) => {
    // let dogDb = [];
    // let dogApi = [];
    // let dogs = [];

    try {
      // Buscar perros por nombre en la base de datos
      let dogsFromDB = await Dog.findAll({
        where: { name: {
            [Op.iLike]: `%${name}%`,
          }},
        include: [{ model: Temperaments, attributes: ['name'], through: { attributes: [] } }] // Incluir los temperamentos asociados
      });
      
      //console.log(dogsFromDB[0].dataValues);
      const dogsDb = dogsFromDB.map((dog) => {return infoCleanerDb(dog.dataValues)});
   // if (dogsFromDB.length === 0) {
        
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const infoApi = response.data;
        console.log(infoApi);
        const dogsApi = infoCleaner(infoApi);
        const dogsFiltered = dogsApi.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        const dogs = [...dogsDb, ...dogsFiltered];
        return dogs;
  
        // if (dogsFiltered.length > 0) {
        //   return dogsFiltered;
        // } else {
        //   throw new Error('Perro no encontrado');
        // }
      //}
  
     // return dogsFromDB;
    } catch (error) {
      throw new Error('Error al obtener los perros: ' + error.message);
    }

  };



const getTemperaments = async () => {
    // try {
    //     const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
    //     if (!response) {
    //         throw new Error('No hay respuesta de la API');
    //     }
    //     const data = response.data; 
    //     console.log(data);// Supongo que la API devuelve un array de temperamentos
    //     // Guardar los temperamentos en la base de datos
    //     await Temperaments.bulkCreate(data.map(temp => ({ name: temp })));
    //     return data;
    // } catch (error) {
    //     throw error;
    // }
    try {
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}`);
         let everyTemperament = response.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        // /* Set para hacer UNIQUE :: Stackoverflow */
         let eachTemperament = [...new Set(everyTemperament.flat())]; // elimina las copias y pone un solo arreglo
         console.log(eachTemperament);
         eachTemperament.forEach(temp => { // recorre el arreglo y hace una accion con cada uno.
         
            // temperament : ,
                Temperaments.findOrCreate({
                    where: { name: temp }
                });
            
        });
        return eachTemperament = await Temperaments.findAll();
        
        //res.status(200).json(eachTemperament);
        
    } catch (error) {
        // res.status(404).send(error)
        throw new Error('Error al obtener los temperamentos: ' + error.message);
    }
};

module.exports = {
    getDogs,
    getDetail,
    getDogsByName,
    getTemperaments
};