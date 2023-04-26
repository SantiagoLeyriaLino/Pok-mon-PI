import './Detail.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Detail =()=>{
    const {id} = useParams()
    const [pokemon, setPokemon] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then((response)=>setPokemon(response.data));
        return () => setPokemon("")
    },[id])

    return( 
        <div className='detail'>
            {
            (pokemon && pokemon.Name) ?
                (<div className='div-container'>
                <h1>{pokemon.Name}</h1>
                <div className='pokemon-detail-div'>   
                <div className='div-image'>
                <img src={pokemon.Image} alt="img" />
                </div>
                <div>
                <p>Hp: {pokemon.Hp}</p>
                <p>Attack: {pokemon.Attack}</p>
                <p>Defense: {pokemon.Defense}</p>
                <p>Speed: {pokemon.Speed}</p>
                <p>Height: {pokemon.Height}</p>
                <p>Weight: {pokemon.Weight}</p>
                <p>Types/Types: {pokemon.Types.join(", ")}</p>
                </div>
                </div>
                </div>)
                : (<h3>Loading...</h3>)
            }
        </div>
        
    )
}