const {Type} = require ('../../db');
const axios = require('axios');


const controllerGetTypes= async() =>{
        const bddData = await Type.findAll();
        if(bddData.length === 0){
            const apiData = await axios.get('https://pokeapi.co/api/v2/type');
            const dataTypes = apiData.data.results.map(type =>{return {name: type.name}});
            const newTypes = await Type.bulkCreate(dataTypes);
            console.log(newTypes)
            return newTypes;
        }
        return bddData;
};

module.exports = controllerGetTypes;