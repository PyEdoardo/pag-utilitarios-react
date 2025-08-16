import { useState, useEffect } from "react";
import { getPrevisaoDoTempo } from "../hooks/ApiPrevisao";

import BotaoFechar from "../components/BotaoVoltar";
import DarkModeSwitch from "../components/DarkModeSwitch";
import CidadeInput from "../components/CidadeInput";
import CardTempo from "../components/CardTempo";

import 'bootstrap/dist/css/bootstrap.min.css'

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
        }, [darkMode]);

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
                <div className={`card shadow p-4 mb-4 ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
                    <div className="text-start mb-2 d-flex justify-content-start">
                        <BotaoFechar string='X' path='/'/>
                    </div>
                    <CardTempo 
                        cidade={cidade} 
                        estado={estado}
                        pais={pais}
                        dia={dia}
                        temperatura={temperatura}
                        velocidadeVento={velocidadeVento}
                        />
                    <CidadeInput valueCidade={cidade} onChange={e => setCidade(e.target.value)} onClick={atualizarPrev} textoBotao='Procurar' darkMode={darkMode}/>
                    <div className="d-flex justify-content-center mt-3">
                    <DarkModeSwitch darkModeState={darkMode} func={ligarModoNoturno} />
                    </div>
                </div>
            </div>
        );
}

export default Previsao