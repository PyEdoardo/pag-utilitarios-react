import { useNavigate } from "react-router-dom";
import { FaCalculator, FaMoon, FaSun, FaWrench, FaRuler, FaCloudSunRain, FaClipboardCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import '../css/Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DarkModeSwitch from "../components/DarkModeSwitch";
import Alerta from "../components/Alerta";

export const Layout = () => {
    const [darkMode, setDarkMode] = useState(false);
    const ligarModoNoturno = () => setDarkMode(!darkMode);
    const [showAlerta, setShowAlerta] = useState(false);

    useEffect(() => {
        document.title = "ToolShive";
        if (darkMode) {
            document.body.classList.add("bg-dark", "text-white");
            document.body.classList.remove("bg-light", "text-dark");
        } else {
            document.body.classList.add("bg-light", "text-dark");
            document.body.classList.remove("bg-dark", "text-white");
        }
    }, [darkMode]);

    let navigate = useNavigate();
    return (
        <div>
            <h1>ToolShive</h1>
            <div className={darkMode ? "container p-4 my-4 bg-secondary rounded shadow" : "container p-4 my-4 bg-light border rounded shadow"}>
                <div className="d-flex gap-3">

                        <button className={darkMode ? "btn btn-outline-dark d-flex align-items-center gap-2" : "btn btn-outline-primary d-flex align-items-center gap-2"} onClick={() => navigate("/Calculadora")}>
                            {darkMode ? <FaCalculator  size={18}/> : <FaCalculator size={18}/>}
                            Calculadora
                        </button>

                        <button className={darkMode ? "btn btn-outline-dark d-flex align-items-center gap-2" : "btn btn-outline-primary d-flex align-items-center gap-2"} onClick={() => navigate("/Base")}>
                            <FaWrench size={18}/>
                            Conversor de Bases
                        </button>

                        <button className={darkMode ? "btn btn-outline-dark d-flex align-items-center gap-2" : "btn btn-outline-primary d-flex align-items-center gap-2"} onClick={() => navigate("/Conversor")}>
                            {darkMode ? <FaRuler color="black" size={18}/> : <FaRuler size={18}/>}
                            Conversor de Medidas
                        </button>
                        
                        <button className={darkMode ? "btn btn-outline-dark d-flex align-items-center gap-2" : "btn btn-outline-primary d-flex align-items-center gap-2"} onClick={() => navigate("/Prev")}>
                            {darkMode ? <FaCloudSunRain color="black" size={18}/> : <FaCloudSunRain size={18}/>}
                            Previsão do Tempo
                        </button>

                        <button className={darkMode ? "btn btn-outline-dark d-flex align-items-center gap-2" : "btn btn-outline-primary d-flex align-items-center gap-2"} onClick={() => navigate('/Todo')}>
                            {darkMode ? <FaClipboardCheck color="black" size={18}/> : <FaClipboardCheck size={18}/>}
                            Lista de Fazeres
                        </button>

               </div>
               <div className="d-flex justify-content-center mt-3">
               <DarkModeSwitch darkModeState={darkMode} func={ligarModoNoturno}/>
               </div>
            </div>
            <div className="d-flex gap-2">
                <button className={darkMode ? "btn btn-secondary" : "btn btn-primary"} onClick={() => setShowAlerta(true)}>Sobre a Ferramenta</button>
            </div>

            <Alerta darkMode={darkMode} mostrar={showAlerta} fechar={() => setShowAlerta(false)} childs={(
                <div>
                <h5>Oque é o ToolShive?</h5>
                <p>
                    O ToolShive é uma ferramenta que fiz apenas para estudo, ela engloba alguns utilitários, cada um deles me faz treinar e estudar
                    algum conteúdo específico, Props, banco de dados local do navegador, React, programação funcional, JS e TS, entre outros.
                </p>
                <button className="btn btn-success me-2" onClick={() => window.open('https://github.com/PyEdoardo', "_blank", "noopener,noreferrer")}>
                    Ir ao Repositório
                </button>
                <button className="btn btn-warning" onClick={() => window.open('https://github.com/PyEdoardo', "_blank", "noopener,noreferrer")}>
                    Github do Criador
                </button>
                </div>)}/>
        </div>
    );
}

export default Layout;