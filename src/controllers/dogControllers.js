const { Dog, Temperaments } = require ("../db");
const axios = require ('axios');
require('dotenv').config();
const { API_URL, API_IMG ,API_KEY} = process.env;
const { infoCleaner, infoCleanerDb, limpiarRespuesta} = require("../helpers/index");
const { Op } = require("sequelize");


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
        
    } catch (error) {
        throw new Error('Error al obtener los perros: ' + error.message);
    }
};


const getDetail= async(id,source)=>{
    try {
      if(source !== 'api'){
          const infodb =(await Dog.findByPk(id, {include: [{
              model: Temperaments, attributes: ['name'], through: { attributes: []} }]}));
              if(!infodb){
                throw new Error("perro no encontrado");
            }
          return infodb;
      }
      else{
          const info=(await axios.get(`${API_IMG}/search?breed_ids=${id}&api_key=${API_KEY}`)).data;
          const dog = limpiarRespuesta(info);
          return dog;
      }
      
    } catch (error) {
      throw new Error(error);
    }
      
     
  };


const getDogsByName = async (name) => {
    

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
  
      
    } catch (error) {
      throw new Error('Error al obtener los perros: ' + error.message);
    }

  };



const getTemperaments = async () => {
    
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