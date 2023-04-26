import React from "react";
import './Paginado.css'


export const Paginado = ({pokemonsPerPage, pokemons, paginado}) =>{
    let pageNumbers = [];

    for ( let i=1; i<=Math.ceil(pokemons/pokemonsPerPage); i++){
        pageNumbers.push(i);
    }

    const elementosLista = document.querySelectorAll('.lista-elemento');

function cambiarEstilos() {
  elementosLista.forEach(elemento => {
    elemento.classList.remove('seleccionado');
  });

  this.classList.add('seleccionado');
}

elementosLista.forEach(elemento => {
  elemento.addEventListener('click', cambiarEstilos);
});

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