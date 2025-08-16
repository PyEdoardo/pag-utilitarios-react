import { useNavigate } from "react-router-dom";

export const BotaoFechar = ({string, path}) => {

    const navigate = useNavigate();

    return  (
        <button 
            className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center" 
            style={{ width: 22, height: 22, padding: 0, fontSize: 12 }}
            onClick={() => navigate(path)}>
            {string}
        </button>
    );
}

export default BotaoFechar;