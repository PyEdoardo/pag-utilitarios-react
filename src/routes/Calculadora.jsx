import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

export const Calculadora = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Em Construção</h1>
            <button className='btn btn-primary' onClick={() => navigate('/')}>Voltar para a Home</button>
        </div>
    );
}

export default Calculadora;