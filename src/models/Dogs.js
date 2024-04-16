const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo "Dog"
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      //allowNull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false, // Desactivar las columnas de fecha de creación y actualización
  }
  );
};

/**
 id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
    },
    peso: {
      type: DataTypes.FLOAT,
    },
    añosDeVida: {
      type: DataTypes.INTEGER,
    }
  }


  id, name, height_min, weight_min, height_max, weight_max, life_span, image, createdInDB
  }
 */