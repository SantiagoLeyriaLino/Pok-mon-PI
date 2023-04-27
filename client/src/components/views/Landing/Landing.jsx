import React from "react";
import './Landing.css'
import { getTypes,getPokemons } from "../../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

const Landing = () =>{
    const dispatch = useDispatch()
    const {pokemons,types} = useSelector((state)=>state);
    if(types.length===0 && pokemons && pokemons.length===0){
        dispatch(getTypes());
        dispatch(getPokemons())
    }

    return (
        <div className="landing">
            <div className="div-elements">
            <h1>welcome to "Pokemons Info API"</h1>
            <p>This API is intended to function as a pokedex, providing information about the existing pokemons in the series and also with extra functions for you to create your own pokemons!</p>
            <Link to = '/home'>
                <button>let's start!</button>
            </Link>
            </div>
        </div>
    );
};

export default Landing;