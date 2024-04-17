const { Dog, Temperaments } = require('../db');

const createDog = async (id, name, height_min, weight_min, height_max, weight_max, life_span, image, createdInDB,temperaments) => {
    try {
        // Verificar si el perro ya existe en la base de datos
        const existingDog = await Dog.findOne({
            where: { name: name }
        });
        if (existingDog) {
            throw new Error('El perro ya existe');
        }
        
        // Crear un nuevo perro en la base de datos
        const newDog = await Dog.create({ 
           // id, 
            name, 
            height_min, 
            weight_min, 
            height_max, 
            weight_max, 
            life_span,
           
            image,
            createdInDB
            
        });
        // const temp = await Temperaments.findAll({
        //     where: {
        //         name: temperaments,
        //     }
        // })
        // if(temp.length === 0){throw new Error("no hay temps")}
        
        // await newDog.addTemperaments(temp);
        return newDog; // Devolver el nuevo perro creado en la respuesta
    } catch (error) {
        throw error; // Lanzar el error para que pueda ser capturado y manejado correctamente
    }
};

module.exports = createDog;