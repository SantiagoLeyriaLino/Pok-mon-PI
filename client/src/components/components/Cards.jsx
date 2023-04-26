import React from "react";
import { Card } from "./Card";
import './Cards.css'

const Cards =( {currentPokemons})=>{
    return(
    <div className="cards-div">
   { currentPokemons.map(({id,Name,Image,Types})=>{
       return (
           <Card key={id} id={id} name={Name} image={Image} types={Types} />
           )
        })}
    </div>
    );
}

export default Cards;