const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  
  sequelize.define("Pokemon", {
    
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      isUrl:true,
      allowNull:false,
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    types:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    
  });
    
};
