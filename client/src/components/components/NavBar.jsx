import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../../redux/actions';
        
export const NavBar = () =>{
    
    const dispatch = useDispatch()

    const handleClick = () =>{
        dispatch(getPokemons())
    }

    return(
        <nav>
            <h1>Pokemons Info API</h1>
            <Link to='/createPokemon'> <span>Create Pokemon</span> </Link>
            <Link to="/home" onClick={handleClick()}><span>Home</span></Link>
            <Link to="/"><span>Landing</span></Link>
        </nav>
    )
}
