const {controllerGetPokemons,
    controllerGetPokemonsById,    
    controllerPostPokemons} = require ('./utils/pokemonsControllers');

const getPokemons = async(req,res)=>{
    try{
        let {name} = req.query
        const pokemons = await controllerGetPokemons(name);
        res.status(200).json(pokemons)
    }
    catch (err){
        res.status(400).json({error:err.message})
        }
};

const getPokemonsById=async(req,res)=>{
    try {
        let {idPokemon} = req.params;
        var pokemonById = await controllerGetPokemonsById(idPokemon)
        res.status(200).json(pokemonById);
    } catch (err) {
        res.status(400).json({error:"ID not found"})
    }
};

const postPokemons=async(req,res)=>{
    try {
        var {id,name,image,hp,attack,defense,speed,height,weight,types} = req.body;
        if(!name||!image||!hp||!attack||!defense||!speed||!types){
            throw Error('insufficient fields')
        }
        else{
        var pokemonPost = await controllerPostPokemons(id,name,image,hp,attack,defense,speed,height,weight,types);
        res.status(200).json(pokemonPost);}    
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getPokemons,
    getPokemonsById,
    postPokemons
}
