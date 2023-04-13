const {controllerGetPokemons,controllerGetPokemonsById,controllerGetPokemonsByName,controllerPostPokemons} = require ('./utils/pokemonsControllers');

const getPokemons = (req,res)=>{
    try{
        if (req.query){
            var {name}= req.query;
            var pokemonQuery = controllerGetPokemonsByName(name);
            res.status(200).json(pokemonQuery)
        }
        else{
            var pokemons = controllerGetPokemons();
        res.status(200).json(pokemons);
        }        
    }catch(err){
        res.status(400).json({error:err.mesage})
    }
};

const getPokemonsById=(req,res)=>{
    try {
        let id = req.params;
        var pokemonById = controllerGetPokemonsById(id)
        res.status(200).json(pokemonById);
    } catch (err) {
        res.status(400).json({error:err.mesage})
    }
};

const postPokemons=(req,res)=>{
    try {
        var pokemon = req.body;
        var pokemonPost = controllerPostPokemons(pokemon);
        res.status(200).json(pokemonPost);    
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

module.exports = {
    getPokemons,
    getPokemonsById,
    postPokemons
}
