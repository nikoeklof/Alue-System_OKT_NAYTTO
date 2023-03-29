const AreaContext = ({ area, removeArea, editArea, active }) => {
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
        </div>
      </>
    );
  }
};
export default AreaContext;
