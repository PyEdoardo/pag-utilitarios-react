export const CidadeInput = ({valueCidade, onChange, onClick, textoBotao, darkMode}) => {
    return (
        <div className="input-group">
            <input 
                className={`form-control bg-transparent ${darkMode ? 'border-dark  text-white' : 'border-primary text-dark'}`}
                type="text" 
                placeholder="Digite a cidade" 
                value={valueCidade} 
                onChange={onChange}
                />
            <button className={darkMode ? "btn btn-outline-dark" : "btn btn-outline-primary"} onClick={onClick} type="button">{textoBotao}</button>
        </div>
    );
}

export default CidadeInput