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
};
export default AreaContext;
