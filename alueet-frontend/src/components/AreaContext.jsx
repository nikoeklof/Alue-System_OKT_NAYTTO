import React from 'react';

const AreaContext = ({ area, removeArea, editArea, active }) => {
	if (!area) {
		return <></>;
	} else {
		return (
			<>
				<div>
					{area.areaName}, Asuntoja: {area.apartmentAmount}, Kaupunginosa:
					{area.neighborhood}
					<br></br>
					<button onClick={() => removeArea(area)}>Poista alue</button>
					<button onClick={() => editArea(!active)}>Muokkaa aluetta</button>
				</div>
			</>
		);
	}
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
