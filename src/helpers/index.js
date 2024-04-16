


const infoCleaner = (data) => {
    
    const arr = data;
    
    const array = arr.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            breed_group: dog.breed_group,
            temperament: dog.temperament,
            life_span: dog.life_span,
            weight_min: parseInt(dog.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(dog.weight.metric.slice(4).trim()),
            height_min: parseInt(dog.height.metric.slice(0, 2).trim()),
            height_max: parseInt(dog.height.metric.slice(4).trim()),
        };
    });
    return array;
};


const infoCleanerDb = (data) => {
    const {
        id, 
        name, 
        image, 
        breed_group, 
        weight_min,
        weight_max, 
        height_min, 
        height_max,
        temperaments
    } = data;
    
    const tempString = temperaments.map(temperament => temperament.dataValues.name).join(', ')// los temps los va  aponer en un solo string.
    console.log(" ESTE ES ", tempString);
        return {
            id, 
            name, 
            image, 
            breed_group, 
            weight_min,
            weight_max, 
            height_min, 
            height_max,
            temperament: tempString
        };
   
};

module.exports = {
    infoCleaner, infoCleanerDb
};

            // id: dog.id,
            // name: dog.name,
            // image: dog.image.url,
            // breed_group: dog.breed_group,
            // temperament: dog.temperament,
            // life_span: dog.life_span,
            // weight_min: parseInt(dog.weight.metric.slice(0, 2).trim()),
            // weight_max: parseInt(dog.weight.metric.slice(4).trim()),
            // height_min: parseInt(dog.height.metric.slice(0, 2).trim()),
            // height_max: parseInt(dog.height.metric.slice(4).trim()),
// id, 
//             name, 
//             height_min, 
//             weight_min, 
//             height_max, 
//             weight_max, 
//             life_span, 
//             image,
//             createdInDB