import { useState, useEffect } from "react";
import { getPrevisaoDoTempo } from "../api/ApiPrevisao";
import { FaSun, FaMoon } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import BotaoFechar from "../components/BotaoVoltarHome";

export const Previsao = () => {
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [velocidadeVento, setVelocidadeVento] = useState('');
    const [dia, setDia] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    const ligarModoNoturno = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
            document.title = "Previsão do Tempo";
            if (darkMode){
                document.body.classList.add("bg-dark", "text-white");
                document.body.classList.remove("bg-light", "text-dark");
            } else {
                document.body.classList.add("bg-light", "text-dark");
                document.body.classList.remove("bg-dark", "text-white");
            }
        });

    const atualizarPrev = async () => {
        const tempo = await getPrevisaoDoTempo(cidade).then();
        setCidade(tempo.cidade);
        setEstado(tempo.estado);
        setPais(tempo.pais);
        setTemperatura(tempo.temperatura);
        setVelocidadeVento(tempo.velocidadeVento);
        setDia(tempo.dia);
    };

        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="card shadow p-4 mb-4" style={{maxWidth: 350, width: '100%'}}>
                    <div className="text-start mb-2 d-flex justify-content-start">
                        <BotaoFechar string='X' path='/Todo'/>
                    </div>
                    <h4 className="mb-3 text-center">Previsão do Tempo</h4>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <h5 className="mb-1">{cidade}{estado && `, ${estado}`}{pais && `, ${pais}`}</h5>
                        {dia ? <FaSun/> : <FaMoon/> }{temperatura !== undefined && <div className="display-6 fw-bold">{temperatura}°C</div>}
                        {velocidadeVento !== undefined && <div className="small text-secondary">Vento: {velocidadeVento} km/h</div>}
                    </div>
                    <div className="input-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Digite a cidade" 
                            value={cidade} 
                            onChange={e => setCidade(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={atualizarPrev} type="button">Buscar</button>
                    </div>
                    <div className="form-check form-switch custom-switch d-flex align-items-center gap-2 mt-1">
                        <input type="checkbox" className="form-check-input" id="darkModeSwitch" checked={darkMode} onChange={ligarModoNoturno}/>
                        <label htmlFor="darkModeSwitch">{darkMode ? <FaMoon color="yellow" size={20}/> : <FaSun color="yellow" size={20}/>}</label>
                    </div>
                </div>
            </div>
        );
}

export default Previsao;