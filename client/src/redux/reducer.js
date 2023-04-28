import {GET_POKEMONS, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, GET_POKEMON, CLEAR_POKEMONS,POST_POKEMON} from './actions';



const initialState = {
    pokemons:[],
    pokemonsAll:[],
    filterType:[],
    filterOrigin:[],
    pokemonCreated:[],
    types:[],
    filterCombinedOrder:[],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return { ...state, pokemons:[...action.payload], pokemonsAll:[...action.payload],filterOrigin:[...action.payload],filterType:[...action.payload],filterCombinedOrder:[...action.payload], originalPokemonsAll:[...action.payload], pokemonCreated:[]};

        case GET_TYPES:
            return {...state, types:[...action.payload]};

        case CLEAR_POKEMONS:
            return {...state, pokemonCreated:[...action.payload]}

        case GET_POKEMON:
            return {...state, pokemons:[action.payload]}

        case POST_POKEMON:
            return {...state, pokemonCreated:action.payload}

        case FILTER_BY_TYPE:
            var filterOrigin = state.filterOrigin;
            var allPokemons = state.pokemonsAll;
            if(action.payload === 'all'){
                return{...state, pokemons:[...filterOrigin], filterType:[...allPokemons],filterCombinedOrder:[...filterOrigin]}
            }
            else{
                var bandera = allPokemons.filter((poke)=>poke.Types.includes(action.payload));
                var typeFilter = filterOrigin.filter((poke)=>poke.Types.includes(action.payload));
                    return{...state, pokemons:[...typeFilter], filterType:[...bandera],filterCombinedOrder:[...typeFilter]}
            }
            

        case FILTER_BY_ORIGIN: 
            var filterType = state.filterType;
            var allPokemons = state.pokemonsAll; 
            if(action.payload==='all'){
                return{...state, pokemons:[...filterType], filterOrigin:[...allPokemons],filterCombinedOrder:[...filterType]}
            }
            if(action.payload==="created"){
                var bandera = allPokemons.filter((poke)=>poke.Create==true);
                var filterPokemons = filterType.filter((poke)=>poke.Create==true);
                        return {...state, pokemons:[...filterPokemons], filterOrigin:[...bandera],filterCombinedOrder:[...filterPokemons]}
            }
            if(action.payload==="default"){
                var bandera = allPokemons.filter((poke)=>poke.Create==false);
                var filterPokemons = filterType.filter((poke)=>poke.Create==false);
                        return {...state, pokemons:[...filterPokemons], filterOrigin:[...bandera],filterCombinedOrder:[...filterPokemons]}
            }
            

        case ORDER_BY_NAME:
            let pokemonsOrder = state.pokemons
            let pokemonsDefaultOrder = state.filterCombinedOrder
            if (action.payload === "alphaAsc"){
                let pokemonsAaphAsc = pokemonsOrder.sort(function(a,b){
                    let aMin =a.Name.toLowerCase();
                    let bMin = b.Name.toLowerCase()
                    if(aMin > bMin){return 1}
                    if(bMin > aMin){return -1}
                    else{return 0}
                })
                return{...state, pokemons:[...pokemonsAaphAsc], }
            }
            if (action.payload === "alphaDesc"){
                let pokemonsAaphDesc = pokemonsOrder.sort(function(a,b){
                    let aMin =a.Name.toLowerCase();
                    let bMin = b.Name.toLowerCase()
                    if(aMin > bMin){return -1}
                    if(bMin > aMin){return 1}
                    else{return 0}
                })
                return{...state, pokemons:[...pokemonsAaphDesc]}
            }
            if (action.payload === "attackAsc"){
                let pokemonsAttackAsc = pokemonsOrder.sort(function(a,b){
                    if(a.Attack > b.Attack){return 1}
                    if(b.Attack > a.Attack){return -1}
                    else{return 0}
                })
                return{...state, pokemons:[...pokemonsAttackAsc]}
            }
            if (action.payload === "attackDesc"){
                let pokemonsAttackDesc = pokemonsOrder.sort(function(a,b){
                    if(a.Attack > b.Attack){return -1}
                    if(b.Attack > a.Attack){return 1}
                    else{return 0}
                })
                return{...state, pokemons:[...pokemonsAttackDesc]}
            }
            else{return{...state, pokemons:[...pokemonsDefaultOrder]}}

        default:
            return { ...state };
    }
};


export default rootReducer;