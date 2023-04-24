import React from "react";
import { Link } from "react-router-dom";

export const Card = ({name,image,types,id}) =>{
    var typesString = types.join(', ')
    return(
        <div>
            <img src={image} alt={`img pokemon ${name}`} />
            <Link to={`/home/detail/${id}`} >
            <h3>Name: {name}</h3>
            </Link>
            <h5>Type / Types:   {typesString}</h5>
        </div>
    );
}