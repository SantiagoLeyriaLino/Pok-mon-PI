import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_POKEMON = "GET_POKEMON";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const POST_POKEMON = "POST_POKEMON";
 
export const getPokemons = () =>{
    return async function (dispatch){
       try{
        var pokemons = await axios.get('http://localhost:3001/pokemons');
        var allPokemons = pokemons.data
        return dispatch({
            type: GET_POKEMONS,
            payload: allPokemons,
        })}
        catch(error){
           alert('Something went wrong, try reloading. If the problem persists contact the developer')
        }
    }
}

export const clearPokemon = () =>{
    return{
        type: CLEAR_POKEMONS,
        payload: []
    }
}

export const getTypes = () =>{
    return async function (dispatch){
        try{
            var types = await axios.get('http://localhost:3001/types');
            var allTypes = types.data;
            return dispatch({
                type: GET_TYPES,
                payload: allTypes
            })
        }catch(error){
            alert('Something went wrong, try reloading. If the problem persists contact the developer')
        }
    }
}

export const filterPokemonsByType = (payload) =>{
    return{
        type: FILTER_BY_TYPE,
        payload
    }
}

export const filterPokemonsByOrigin = (payload) =>{
    return{
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export const orderBy = (payload) =>{
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export const getPokemon = (payload) =>{
    return async function(dispatch){
    try{
        if ((payload%1===0)||(payload.includes('-'))){
            var pokemon = await axios.get(`http://localhost:3001/pokemons/${payload}`);
            return dispatch({
                type: GET_POKEMON,
                payload: pokemon.data
            })
        }
        else{
            var pokemon = await axios.get(`http://localhost:3001/pokemons?name=${payload}`)
            if (pokemon.data.length){
                return dispatch({
                    type: GET_POKEMON,
                    payload: pokemon.data[0]
            })}
            else{
                return dispatch({
                    type: GET_POKEMON,
                    payload: pokemon.data
            })}
        }

    }
    catch(error){
        alert(`${payload} is not an id or a name of an existing Pokemon`)
    }
}}

export const postPokemon = (pokemon) => {
    return async function(dispatch){
        try{
        const response = await axios.post('http://localhost:3001/pokemons',pokemon);
        return dispatch({
            type: POST_POKEMON,
            payload: response.data,  
        })}
        catch(error){
            console.log(error.response.data)
            alert(error.response.data.error)
        }
    }
}