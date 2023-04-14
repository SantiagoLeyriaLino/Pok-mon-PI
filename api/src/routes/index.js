const { Router } = require('express');
const {getPokemons, getPokemonsById,postPokemons}= require('./pokemonsHandlers');
const getType = require('./typesHandlers');
const {controllerGetPokemons} = require ('./utils/pokemonsControllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/pokemons',getPokemons);
router.get('/pokemons',async(req,res)=>{
    try{
        let {name} = req.query
    const pokemons = await controllerGetPokemons(name);
    console.log(pokemons)
    res.status(200).json(pokemons)}
    catch (err){
        res.status(400).json({error:err.message})
    }
});
router.get('/pokemons/:idPokemon',getPokemonsById);

router.post('/pokemons',postPokemons);

router.get('/types',getType)



module.exports = router;
