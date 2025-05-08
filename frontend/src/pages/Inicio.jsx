//import logo from '../assets/Bicentenario-Bo.png'
import { Link } from 'react-router-dom';
export const Inicio = () => {
    return (
        <>
        
        <h1>BICENTENARIO INICIO </h1>

        <Link to="/chat">
                <button>Ir al Chat Bicentenario</button>
        </Link>

        </>
        
    )
}