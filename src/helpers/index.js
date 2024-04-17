


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

function limpiarRespuesta(respuesta) {
    // Verifica si la respuesta es un array y si tiene elementos
    if (Array.isArray(respuesta) && respuesta.length > 0) {
      const perro = respuesta[0]; // Obtiene el primer elemento del array
  
      // Extrae las propiedades específicas del objeto perro
      const { breeds, url } = perro;
  
      // Inicializa un objeto para almacenar las propiedades limpias del perro
      const perroLimpiado = {
        id: breeds[0].id,
        name: breeds[0].name,
        height_min: parseFloat(breeds[0].height.metric.split(' - ')[0]),
        height_max: parseFloat(breeds[0].height.metric.split(' - ')[1]),
        weight_min: parseFloat(breeds[0].weight.metric.split(' - ')[0]),
        weight_max: parseFloat(breeds[0].weight.metric.split(' - ')[1]),
        life_span: breeds[0].life_span,
        temperament: breeds[0].temperament,
        image: url,
      };
  
      return perroLimpiado;
    } else {
      // Si la respuesta no es un array o está vacía, devuelve null o un objeto vacío según lo necesites
      return null;
    }
  }

module.exports = {
    infoCleaner, infoCleanerDb, limpiarRespuesta
};

