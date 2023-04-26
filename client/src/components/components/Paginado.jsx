import React from "react";
import './Paginado.css'
import { useEffect } from "react";


export const Paginado = ({pokemonsPerPage, pokemons, paginado,currentPage}) =>{
    let pageNumbers = [];

    for ( let i=1; i<=Math.ceil(pokemons/pokemonsPerPage); i++){
        pageNumbers.push(i);
    }

    useEffect(() => {
        const elementosLista = document.querySelectorAll('.lista-elemento');
        elementosLista.forEach(elemento => {
            if (elemento.id === `elemento${currentPage}`) {
                elemento.classList.add('seleccionado');
            } else {
                elemento.classList.remove('seleccionado');
            }
        });
    }, [currentPage]);

    return(
        <nav>
            <ul className="div-lista">
                {pageNumbers && pageNumbers.map(number=>(
                    // <li key = {number}>
                    <span id={`elemento${number}`} class="lista-elemento" onClick={()=>paginado(number)}>  {number}  </span>
                    // </li>
                ))}
            </ul>
        </nav>
    )
}