export const Alerta = ({ mostrar, fechar, childs, darkMode }) => {
  if (!mostrar) return null;

  return (
    <div
      className="alert alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
      role="alert"
      style={{
        zIndex: 1050,
        maxWidth: "400px",
        backgroundColor: darkMode ? "#6c757d" : "#cff4fc",
        color: darkMode ? "#000" : "#000",
      }}
    >
      {childs}
      <button type="button" className="btn-close" onClick={fechar}></button>
    </div>
  );
};

export default Alerta;
