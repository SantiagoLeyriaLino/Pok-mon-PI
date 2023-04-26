import './Home.css'
import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType,filterPokemonsByOrigin, orderBy, clearPokemon } from "../../../redux/actions";
import { SearchBar } from "../../components/SearchBar";
import Cards from '../../components/Cards'
import { Paginado } from "../../components/Paginado";
import { useLocation } from 'react-router-dom';


export const Home = () =>{

    // const types = await axios.get('http://localhost:3001/types')    
    
    const dispatch = useDispatch();
    // const location = useLocation()
    const {pokemons,types,pokemonsAll,filterType,filterOrigin} = useSelector((state)=>state);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    var indexOfLastPokemon = currentPage * pokemonsPerPage;
    var indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    var currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    }
    
    if(types.length===0 && pokemons && pokemons.length===0){
        dispatch(getTypes());
        dispatch(getPokemons())
    }
    // useEffect(()=>{
    //     dispatch(getTypes());
    //     return()=>{dispatch(clearPokemon())}
    // },[location]);

    // useEffect(()=>{
    //     dispatch(getPokemons())
    // },[types]);
    
    // useEffect(() => {
    //     return () => {
    //       dispatch(clearPokemon());
    //     };
    //   }, [location]);
    
   
    const handleClick = (event) =>{
        dispatch(getPokemons())
        setCurrentPage(1)
    };

    const handleFilterType = (event) =>{
        dispatch(filterPokemonsByType(event.target.value))
        setCurrentPage(1)
        event.target.value = 'null'
    }

    const handleFilterOrigin = (event) =>{
        dispatch(filterPokemonsByOrigin(event.target.value))
        setCurrentPage(1)
        event.target.value = 'null'
    }

    const handlerOrder = (event) =>{
        event.preventDefault()
        dispatch(orderBy(event.target.value));
        setCurrentPage(1);
        event.target.value = 'null'
        
    }

    return (
        <div className='home'>
            
            <SearchBar setCurrentPage={setCurrentPage}/>
            <button onClick={handleClick}>Reload my pokemons</button>
            <div className='div-filter'>
            <label for = "order">Sort by: </label>
            <select id="order" onChange={event=>handlerOrder(event)}>
                <option value='null'>Select</option>
                <option value="default">Default</option>
                <option value="alphaAsc">Alphabetical order asc</option>
                <option value="alphaDesc">Alphabetical order desc</option>
                <option value="attackAsc">Attack asc</option>
                <option value="attackDesc">Attack desc</option>
            </select> 

            <label for = "filter">  Filter by Origin: </label>
            <select id="filter" onChange={event=>handleFilterOrigin(event)}>
                <option value='null'>Select</option>
                <option value="all">All</option>
                <option value="created">Created</option>
                <option value="default">Default</option>
            </select>

            <label for = "pkemonTypes">  Filter by Type: </label>
                    <select id="pokemonsTypes" onChange={event=>handleFilterType(event)}>
                    <option value='null'>Select</option>
                        <option value="all">All</option> 
                        {types.map((type)=>{
                            return(
                                <option value={type.name}>{type.name}</option>
                                )
                        })}
                    </select>
            </div>
        <div>
        { (pokemons && pokemons.length) ?(<>   
             <Paginado pokemonsPerPage={pokemonsPerPage} pokemons={pokemons.length} paginado={paginado} />
            <div>
                <Cards currentPokemons={currentPokemons} />
            </div>
         </>) : (<h3>You don't have pokemon yet</h3>) }
        </div>
         </div>
        
    )
}