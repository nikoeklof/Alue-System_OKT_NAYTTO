import React, { useState } from 'react';
import {
	Button,
	FormControl,
	TextField
} from '@mui/material';

const styles = {
	makeAreaBtn: {
		ml: 0.5,
		mt: 1
	},
	form: {
		mb: 1,
		width: '90%'
	},
	textField: {
		m: 0.5
	},
	btns: {
		mt: 1,
		ml: 0.5,
		mb: 2
	}
};

const CreateAreaForm = ({
	newArea,
	clearSelected,
	setFormActive,
	formActive,
	layerContext,
}) => {
	const [areaName, setAreaName] = useState("");
	const [apartmentAmount, setApartmentAmount] = useState("");
	const [areaNeighborhood, setAreaNeighborhood] = useState("");

	return (
		<>
			{formActive ? (
				<>
					<FormControl sx={styles.form}>
						<TextField
							onChange={(e) => setAreaName(e.target.value)}
							type="text"
							label="Alueen nimi"
							sx={styles.textField}
						/>
						<TextField
							onChange={(e) => setApartmentAmount(e.target.value)}
							type="number"
							label="Asuntojen määrä"
							sx={styles.textField}
						/>
						<TextField
							onChange={(e) => setAreaNeighborhood(e.target.value)}
							type="text"
							label="Kaupunginosa"
							sx={styles.textField}
						/>
					</FormControl>
					<div>
						<Button
							variant='contained'
							type="button"
							sx={styles.btns}
							onClick={() => {
								const layer = layerContext;
								console.log(layer);
								layer.layer.remove();

								newArea({
									id: layer.layer._leaflet_id,
									areaName: areaName,
									apartmentAmount: parseInt(apartmentAmount),
									neighborhood: areaNeighborhood,
									areaOwner: "admin",
									latlngs: layer.coords,
								});
								setFormActive(!formActive);
							}}
						>
							Tallenna
						</Button>
						<Button
							variant='contained'
							sx={styles.btns}
							onClick={() => {
								setFormActive(!formActive);
							}}
						>
							Peruuta
						</Button>
					</div>
				</>
			) : (
				<>
					<Button
						variant='contained'
						sx={styles.makeAreaBtn}
						onClick={() => {
							setFormActive(!formActive);
							clearSelected();
							console.log(layerContext.layer);
						}}
					>
						Luo alue
					</Button>
				</>
			)}
		</>
	);
};

export default CreateAreaForm;
