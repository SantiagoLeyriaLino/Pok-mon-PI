const {Pokemon,Type} = require ('../../db');
const axios = require('axios')


// -  [**PokeApi**](https://pokeapi.co/api/v2/pokemon)
// -  **Por id**: _"https://pokeapi.co/api/v2/pokemon/{id}"_
// -  **Por nombre**: _"https://pokeapi.co/api/v2/pokemon/{name}"_
const pokemonsArr = async()=>{
    
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const dataPokemons = pokemons.data.results;
    const urlPokemons2 = pokemons.data.next;

    const pokemons2 = await axios.get(urlPokemons2);
    const dataPokemons2 = pokemons2.data.results;
    const urlPokemons3 = pokemons2.data.next;

    const pokemons3 = await axios.get(urlPokemons3);
    const dataPokemons3 = pokemons3.data.results;
    const finalPokemons = dataPokemons.concat(dataPokemons2).concat(dataPokemons3);

    return finalPokemons;
}


const controllerGetPokemons = async(name) =>{
    let pokeArr = await pokemonsArr()
   if(!name) {
    // let pokeArr = await pokemonsArr()
    let prueba = pokeArr.map(async (element) => {
        let info = await axios.get(element.url)
        return info.data
    })

    let info2 = await Promise.all(prueba);

    const mapeoPersonajes = info2.map((pokemon) => {
        return{
            id:pokemon.id,
            Name: pokemon.name,
            Image: pokemon.sprites.back_default,
            Hp: pokemon.stats[0].base_stat,
            Attack: pokemon.stats[1].base_stat,
            Defense: pokemon.stats[2].base_stat,
            Speed: pokemon.stats[5].base_stat,
            Height: pokemon.height || null,
            Weight: pokemon.weight || null,
            Types: pokemon.types.map((type)=>type.type.name)
        }
    });

var allPoke = await Pokemon.findAll({
    include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [], }
    }
});


    if(allPoke.length === 0){
    return mapeoPersonajes
    }
    else{
        let totalPokemon = mapeoPersonajes.concat(allPoke);
        return totalPokemon;
        // return pokemonsDb
   }

   
}
else{
    try{
    const pokemonDb = await Pokemon.findAll({
        where: { name: name },
        include: {
            model: Type,
            attributes: ['name'],
            through: { attributes: [] },
        },
    });

if (pokemonDb.length===0){    
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        return{
            id:pokemon.data.id,
            name: pokemon.data.name,
            image: pokemon.data.sprites.front_default,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height || null,
            weight: pokemon.data.weight || null,
            types: pokemon.data.types.map((type)=>type.type.name),
        }}
        else{
            return pokemonDb;
        }
    }
        
    catch(error){
        throw Error ("Name not found")
    }

    }
}




const controllerGetPokemonsById= async(id) =>{
    console.log(id)    
    if (id % 1 === 0){
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(pokemon.data)
        return{
            id:pokemon.data.id,
            name: pokemon.data.name,
            image: pokemon.data.sprites.front_default,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height || null,
            weight: pokemon.data.weight || null,
            types: pokemon.data.types.map((type)=>type.type.name),
        }
    }
    else{
        const pokemonDb = await Pokemon.findByPk(id,{
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] },
                },
            });
        return pokemonDb
    
    }
};




const controllerPostPokemons=async(id,name,image,hp,attack,defense,speed,height,weight,types)=>{
console.log(types)
    const newPokemon = await Pokemon.create({id,name,image,hp,attack,defense,speed,height,weight});
    await newPokemon.addTypes(types)
    console.log(types)
    return newPokemon;
};

module.exports={
    controllerGetPokemons,
    controllerGetPokemonsById,
    controllerPostPokemons
};