

const getPokemonsByApi = async() =>{
    
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
    // const responseData = await Promise.all( finalPokemons.map(async(poke)=>{
    // let infoObj = await axios.get(poke.url);
    //             return {
    //                 id:infoObj.data.id,
    //                 name: infoObj.data.name,
    //                 image: infoObj.data.sprites.front_default,
    //                 hp: infoObj.data.stats[0].base_stat,
    //                 attack: infoObj.data.stats[1].base_stat,
    //                 defense: infoObj.data.stats[2].base_stat,
    //                 speed: infoObj.data.stats[5].base_stat,
    //                 height: infoObj.data.height || null,
    //                 weight: infoObj.data.weight || null,
    //                 types: infoObj.data.types.map((type)=>type.type.name),
    //             }
    //     }))
}

module.exports=getPokemonsByApi;