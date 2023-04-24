import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";



export const SearchBar = () =>{
    const dispatch = useDispatch();
    const [value,setValue] = useState("");

    const handleInputChange = (event) =>{
        event.preventDefault();
        setValue(event.target.value)
    }

    const handleSubmit = (event) =>{
        if(value.length > 0){
        event.preventDefault();
        dispatch(getPokemon(value))
        setValue("")}
        else{alert('invalid value')}
    }

    return (
        <div>
           <input type='text' placeholder="search by name or id" onChange={(event)=>handleInputChange(event)} value={value}/>
        <Link to='/home'>
        <button type='submit' onClick={(event)=>handleSubmit(event)}>Search</button> 
        </Link>
        </div>
     );
  }