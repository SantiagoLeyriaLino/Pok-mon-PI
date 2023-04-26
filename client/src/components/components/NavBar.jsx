import './NavBar.css'
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import imagen from "../../utils/pngwing.com.png"
        
export const NavBar = () =>{
    
    // const dispatch = useDispatch()

    // const handleClick = () =>{
    //     dispatch(getPokemons())
    // }

    return(
        <nav className='nav'>
            <img src={imagen} alt="pokemontittle" className='img'/>
            {/* <h1>Pokemons Info API</h1> */}
            <div className='links'>
            <Link to='/createPokemon' style={{ textDecoration: 'none' }}> <p>Create Pokemon</p> </Link>
            {/* <Link to="/home" onClick={handleClick()} style={{ textDecoration: 'none' }}><p>Home</p></Link> */}
            <Link to="/home" style={{ textDecoration: 'none' }}><p>Home</p></Link>
            <Link to="/" style={{ textDecoration: 'none' }}><p>Landing</p></Link>
            </div>
        </nav>
    )
}
