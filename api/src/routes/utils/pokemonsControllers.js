const {Pokemon,Type} = require ('../../db');
const axios = require('axios')
const { Op } = require('sequelize')

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
            Image: pokemon.sprites.other.home.front_default,
            Hp: pokemon.stats[0].base_stat,
            Attack: pokemon.stats[1].base_stat,
            Defense: pokemon.stats[2].base_stat,
            Speed: pokemon.stats[5].base_stat,
            Height: pokemon.height || null,
            Weight: pokemon.weight || null,
            Types: pokemon.types.map((type)=>type.type.name),
            Create: false,
        }
    });

var allPoke = await Pokemon.findAll({
    include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [], }
    }
});

var mapeoPokemonsBdd = allPoke.map((poke)=>{
    var pokemon = {
        id:poke.id,
        Name: poke.name,
        Image: poke.image,
        Hp: poke.hp,
        Attack: poke.attack,
        Defense: poke.defense,
        Speed: poke.speed,
        Height: poke.height || null,
        Weight: poke.weight || null,
        Types: [],
        Create:poke.create
    }
    poke.Types.map((type)=>pokemon.Types.push(type.name));
    return pokemon;
})

    if(allPoke.length === 0){
    return mapeoPersonajes
    }
    else{
        let totalPokemon = mapeoPersonajes.concat(mapeoPokemonsBdd);
        return totalPokemon;
        // return pokemonsDb
   }

   
}
else{
    try{
    const pokemonDb = await Pokemon.findAll({
        where: { name:{[Op.iLike]:`%${name}%`}},
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
            Name: pokemon.data.name,
            Image: pokemon.data.sprites.other.home.front_default,
            Hp: pokemon.data.stats[0].base_stat,
            Attack: pokemon.data.stats[1].base_stat,
            Defense: pokemon.data.stats[2].base_stat,
            Speed: pokemon.data.stats[5].base_stat,
            Height: pokemon.data.height || null,
            Weight: pokemon.data.weight || null,
            Types: pokemon.data.types.map((type)=>type.type.name),
            Create:false,
        }}
        else{
            var pokemon =pokemonDb.map((poke)=> {
                var pokemonFinal={
                    id:poke.id,
                    Name: poke.name,
                    Image: poke.image,
                    Hp: poke.hp,
                    Attack: poke.attack,
                    Defense: poke.defense,
                    Speed: poke.speed,
                    Height: poke.height || null,
                    Weight: poke.weight || null,
                    Types: [],
                    Create:poke.create
                }
                poke.Types.map((type)=>pokemonFinal.Types.push(type.name));
                return pokemonFinal;
            })
            return pokemon
            // return pokemonDb;
        }
    }
        
    catch(error){
        throw Error ("Name not found")
    }

    }
}




const controllerGetPokemonsById= async(id) =>{
       
    if (id % 1 === 0){
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        return{
            id:pokemon.data.id,
            Name: pokemon.data.name,
            Image: pokemon.data.sprites.other.home.front_default,
            Hp: pokemon.data.stats[0].base_stat,
            Attack: pokemon.data.stats[1].base_stat,
            Defense: pokemon.data.stats[2].base_stat,
            Speed: pokemon.data.stats[5].base_stat,
            Height: pokemon.data.height || null,
            Weight: pokemon.data.weight || null,
            Types: pokemon.data.types.map((type)=>type.type.name),
            Create:false,
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
        
            var pokemon ={
                
                    id:pokemonDb.id,
                    Name: pokemonDb.name,
                    Image: pokemonDb.image,
                    Hp: pokemonDb.hp,
                    Attack: pokemonDb.attack,
                    Defense: pokemonDb.defense,
                    Speed: pokemonDb.speed,
                    Height: pokemonDb.height || null,
                    Weight: pokemonDb.weight || null,
                    Types: [],
                    Create:pokemonDb.create,
                }
                pokemonDb.Types.map((type)=>pokemon.Types.push(type.name)); 
            return pokemon
            // return pokemonDb
    
    }
};




const controllerPostPokemons=async(id,name,image,hp,attack,defense,speed,height,weight,types)=>{

    const newPokemon = await Pokemon.create({id,name,image,hp,attack,defense,speed,height,weight});
    await newPokemon.addTypes(types)
    
    return newPokemon;
};

module.exports={
    controllerGetPokemons,
    controllerGetPokemonsById,
    controllerPostPokemons
};