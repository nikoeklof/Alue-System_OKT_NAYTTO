const AreaContext = ({ area, removeArea }) => {
  if (!area) {
    return <></>;
  } else {
    return (
      <>
        <div>
          {area.areaName}, Asuntoja: {area.apartmentAmount}, Kaupunginosa:
          {area.neighborhood}
          <button onClick={() => removeArea(area)}>Poista alue</button>
        </div>
      </>
    );
  }
};
export default AreaContext;
