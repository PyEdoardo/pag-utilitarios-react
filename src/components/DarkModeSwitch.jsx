import 'bootstrap/dist/css/bootstrap.min.css'
import { FaMoon, FaSun } from 'react-icons/fa';

export const DarkModeSwitch = ({darkModeState, func, estilo}) => {
    return (
        <div className="form-check form-switch custom-switch d-flex align-items-center gap-2">
            <input type="checkbox" className="form-check-input" id="darkModeSwitch" checked={darkModeState} onChange={func}/>
            <label style={estilo} htmlFor="darkModeSwitch">{darkModeState ? <FaMoon color="yellow" size={20}/> : <FaSun color="yellow" size={20}/>}</label>
        </div>
    );
}

export default DarkModeSwitch;