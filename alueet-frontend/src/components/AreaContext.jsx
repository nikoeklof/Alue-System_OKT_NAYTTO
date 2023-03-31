const AreaContext = ({ area, removeArea, editArea, active, loanArea }) => {
  if (!area) {
    return <></>;
  } else {
    return (
      <>
        <div>
          {area.name}, Asuntoja: {area.buildings}
          <br></br>
          <button onClick={() => removeArea(area)}>Poista alue</button>
          <button onClick={() => editArea(!active)}>Muokkaa aluetta</button>
          <button onClick={() => loanArea()}>
            {area.loaned ? "Palauta alue" : "Lainaa alue"}
          </button>
        </div>
      </>
    );
  }
};
export default AreaContext;
