import React from "react";


export const Paginado = ({pokemonsPerPage, pokemons, paginado}) =>{
    let pageNumbers = [];

    for ( let i=1; i<=Math.ceil(pokemons/pokemonsPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number=>(
                    // <li key = {number}>
                    <a onClick={()=>paginado(number)}>  {number}  </a>
                    // </li>
                ))}
            </ul>
        </nav>
    )
}