import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export const Card = ({name,image,types,id}) =>{
    var typesString = types.join(', ')
    return(
        <div className="card">
        <Link to={`/home/detail/${id}`} style={{ textDecoration: 'none' }} >
        {/* <div className="card"> */}
        <div>
            {/* <Link to={`/home/detail/${id}`} > */}
            <h3><span>Name:</span> {name}</h3>
            {/* </Link> */}
            {image.length?<img src={image} alt={`img pokemon ${name}`} />:<div className="loading-container"><div className="loading"></div></div>}
            <h4><span>Type/Types:</span>   {typesString}</h4>
        </div>
        </Link>
        </div>
    );
}