const { DataTypes, INTEGER } = require("sequelize");


module.exports= (sequelize) => {
    sequelize.define("temperaments",
    {
        id:{
            type: DataTypes.INTEGER,
            //rsallowNull:false,
            primaryKey: true,
            autoIncrement: true,
            },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
        },
        
    },
    {
        timestamps: false, // Desactivar las columnas de fecha de creación y actualización
    }
    
    );
};
