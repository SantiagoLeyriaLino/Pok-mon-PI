import React from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { validate } from '../../../utils/validate';
import {postPokemon, getTypes, clearPokemon} from '../../../redux/actions';
// import { validateErrors } from '../../../utils/validate';

export const Form = () =>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getTypes())
    },[]);
    
    const {types, pokemonCreated, pokemonsAll} = useSelector((state)=>state);

    const [errors, setErrors] = useState(validate({}));

    const [pokemonData, setPokemonData] = useState({
        name:"",
	    image:"",
	    hp:"",
	    attack:"",
	    defense:"",
	    speed:"",
	    height:null,
	    weight:null,
	    types:[]
    });

    useEffect(() => {
        if (pokemonCreated&&pokemonCreated.name) {
            alert("personaje creado con exito");
            setPokemonData({
                name:"",
                image:"",
                hp:"",
                attack:"",
                defense:"",
                speed:"",
                height:null,
                weight:null,
                types:[]
            })}
        }, [pokemonCreated]);
    const handleChange = (event) =>{
        setPokemonData({
            ...pokemonData,
            [event.target.name]: event.target.value,
        })
        setErrors(validate({
            ...pokemonData,
            [event.target.name]:event.target.value,
        }, pokemonsAll))
    }

    const handleCheck =(event)=>{
        var longTypes = pokemonData.types.length
        var number = event.target.value;
        if(longTypes>0){
            var noRepeat = pokemonData.types.filter((type)=> type!=number);
            if(noRepeat.length==longTypes){
                setPokemonData({
                    ...pokemonData,
                    types:[...pokemonData.types, (number/1)]
                })
            }
            else{
                setPokemonData({
                    ...pokemonData,
                    types:[...noRepeat]
            })
            }}
        else{
        setPokemonData({
            ...pokemonData,
            types:[...pokemonData.types,(number/1)]
        })}
    }

    useEffect(()=>{
        console.log(pokemonData)
    },[pokemonData]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(pokemonData);
        dispatch(postPokemon(pokemonData));
        // if (pokemonCreated &&pokemonCreated.name&&pokemonCreated.name.length){
           
        // if (pokemonCreated && pokemonCreated.name){
        // alert("personaje creado con exito");
        // setPokemonData({
        //     name:"",
        //     image:"",
        //     hp:"",
        //     attack:"",
        //     defense:"",
        //     speed:"",
        //     height:null,
        //     weight:null,
        //     types:[]
        // })}
        // dispatch(clearPokemon())
    }

     return(
        
            <div className='contenedor' >
                <form onSubmit={(event)=>handleSubmit(event)} className='form' >
                <div>
                    <h1>Create your own pokemon!!</h1>
                </div>
                <div>
                    {(types && types.length && pokemonData.types) ? (<>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={pokemonData.name} name='name' onChange={handleChange}/>
                        {errors.name && (<span>{errors.name}</span>)}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input type="text" value={pokemonData.image} name='image' onChange={handleChange}/>
                        {errors.image && (<span>{errors.image}</span>)}
                    </div>
                    <div>
                        <label>Hp: </label>
                        <input type="number" min="0" value={pokemonData.hp} name='hp' onChange={handleChange}/>
                        {errors.hp && (<span>{errors.hp}</span>)}
                    </div>
                    <div>
                        <label>Attack: </label>
                        <input type="number" min="0" value={pokemonData.attack} name='attack' onChange={handleChange}/>
                        {errors.attack && (<span>{errors.attack}</span>)}
                    </div>
                    <div>
                        <label>Defense: </label>
                        <input type="number" min="0" value={pokemonData.defense} name='defense' onChange={handleChange}/>
                        {errors.defense && (<span>{errors.defense}</span>)}
                    </div>
                    <div>
                        <label>Speed: </label>
                        <input type="number" min="0" value={pokemonData.speed} name='speed' onChange={handleChange}/>
                        {errors.speed && (<span>{errors.speed}</span>)}
                    </div>
                    <div>
                        <label>Height: </label>
                        <input type="number" min="0" value={pokemonData.height} name='height' onChange={handleChange}/>
                        {errors.height && (<span>{errors.height}</span>)}
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input type="number" min="0" value={pokemonData.weight} name='weight' onChange={handleChange}/>
                        {errors.weight && (<span>{errors.weight}</span>)}
                    </div>
                    <div>{( !pokemonData || pokemonData.types.length<1 ) && (<span>select at least one type</span>)}</div>
                    <div>
                        <label>Type/Tipes: </label>
                        {types.map((type)=>{
                            return(
                                <label ><input type="checkbox" value={type.id} onChange={(event)=>handleCheck(event)}/> {type.name} </label>
                            )
                        })}
                        <div>
                        {!errors || (errors.name||errors.attack||errors.defense||errors.hp||errors.image||errors.speed) || !pokemonData || pokemonData.types.length<1 ? (
                            <span>There are still incomplete required fields</span>
                            ) : (
                                <button type='submit'>Submit</button>
                                )}
                            {/* <button type='submit'>Submit</button> */}
                        </div>
                    </div>
                    </>):(<h3>Loading</h3>)}
                </div>
            </form>
            <div>

            </div>
            </div>
    )
} 