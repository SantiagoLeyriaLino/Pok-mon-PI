import React from "react";
import { Card } from "./Card";
import './Cards.css'
import { useEffect, useState } from "react";

const Cards =( {currentPokemons})=>{
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  
    return(
    <div className={`cards-div${loading ? "" : " loaded"}`}>
   { currentPokemons.map(({id,Name,Image,Types})=>{
       return (
           <Card key={id} id={id} name={Name} image={Image} types={Types} />
           )
        })}
    </div>
    );
}

export default Cards;