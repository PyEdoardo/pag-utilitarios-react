import { FaSun, FaMoon } from 'react-icons/fa';

export const CardTempo = ({ cidade, estado, pais, dia, temperatura, vento, darkMode}) => {

  const containerClass = `d-flex flex-column align-items-center mb-3 ${
        darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'
    }`;

  return darkMode ? (
        <div className="d-flex flex-column align-items-center mb-3 bg-secondary">
            <h5 className="mb-1">
                {cidade}{estado && `, ${estado}`}{pais && `, ${pais}`}
            </h5>
            {temperatura != null && temperatura !== '' && (dia ? <FaSun/> : <FaMoon/>)}
            {temperatura != null && temperatura !== '' && (<div className="display-6 fw-bold">{temperatura}°C</div>)}
            {vento !== undefined && <div className="small text-secondary">Vento: {vento} km/h</div>}
        </div>
    )
    :
    (
        <div className="d-flex flex-column align-items-center mb-3">
            <h5 className="mb-1">
                {cidade}{estado && `, ${estado}`}{pais && `, ${pais}`}
            </h5>
            {temperatura != null && temperatura !== '' && (dia ? <FaSun/> : <FaMoon/>)}
            {temperatura != null && temperatura !== '' && (<div className="display-6 fw-bold">{temperatura}°C</div>)}
            {vento !== undefined && <div className="small text-secondary">Vento: {vento} km/h</div>}
        </div>
    );
};

export default CardTempo
