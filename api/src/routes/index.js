const { Router } = require('express');
const {getPokemons, getPokemonsById,postPokemons}= require('./pokemonsHandlers');
const getType = require('./typesHandlers');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons',getPokemons);

router.get('/pokemons/:idPokemon',getPokemonsById);

router.post('/pokemons',postPokemons);

router.get('/types',getType)



module.exports = router;
