import React, { useState, useEffect } from 'react';
import {
	Alert,
	Button,
	Divider,
	FormControl,
	TextField,
	Typography,
} from '@mui/material';
import theme from '../style/theme';

const styles = {
	subText: {
		my: 1,
	},
	divider: {
		borderColor: theme.bgColor.secondary,
		mb: 1,
	},
	form: {
		mb: 1,
		width: '90%',
	},
	textField: {
		m: 0.5,
	},
	btns: {
		mt: 1,
		ml: 0.5,
	},
	alert: {
		m: 0.5,
		mb: 1,
	},
};

const CreateAreaForm = ({ addArea, layerContext }) => {
	const [areaName, setAreaName] = useState('');
	const [apartmentAmount, setApartmentAmount] = useState('');
	const [areaCity, setAreaCity] = useState('');
	const [layer, setLayer] = useState('');
	const [areaNameError, setAreaNameError] = useState('');
	const [areaBuildingsError, setAreaBuildingsError] = useState('');
	const [areaCityError, setAreaCityError] = useState('');
	const [errorAlert, setErrorAlert] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);

	useEffect(() => {
		if (layerContext) {
			setLayer(layerContext);
			setErrorAlert(false);
			setSuccessAlert(true);
		}
	}, [layerContext]);

	return (
		<>
			<Typography sx={styles.subText}>Alueen tiedot</Typography>
			<Divider sx={styles.divider} />
			<FormControl sx={styles.form}>
				{errorAlert ? (
					<Alert
						severity='error'
						sx={styles.alert}
					>
						Piirrä alue
					</Alert>
				) : (
					''
				)}
				{successAlert ? (
					<Alert
						severity='success'
						sx={styles.alert}
					>
						Alue piirretty
					</Alert>
				) : (
					''
				)}
				<TextField
					onChange={(e) => setAreaCity(e.target.value)}
					type='text'
					label='Kaupunki'
					required
					error={!!areaCityError}
					helperText={areaCityError}
					sx={styles.textField}
				/>
				<TextField
					onChange={(e) => setAreaName(e.target.value)}
					type='text'
					label='Alueen nimi'
					required
					error={!!areaNameError}
					helperText={areaNameError}
					sx={styles.textField}
				/>
				<TextField
					onChange={(e) => setApartmentAmount(e.target.value)}
					type='number'
					label='Asuntojen määrä'
					required
					error={!!areaBuildingsError}
					helperText={areaBuildingsError}
					sx={styles.textField}
				/>
			</FormControl>

			<Button
				variant='contained'
				type='button'
				sx={styles.btns}
				onClick={() => {
					if (!layer) setErrorAlert(true);
					else setErrorAlert(false);

					console.log(layer);
					layer.layer.remove();

					if (!areaCity) setAreaCityError('Kaupunki on pakollinen');
					else setAreaCityError('');

					if (!areaName)
						setAreaNameError('Alueen nimi on pakollinen');
					else setAreaNameError('');

					if (!parseInt(apartmentAmount))
						setAreaBuildingsError('Asuntojen määrä on pakollinen');
					else setAreaBuildingsError('');

					if (areaName && apartmentAmount && areaCity && layer) {
						setSuccessAlert(false);
						addArea({
							id: layer.layer._leaflet_id,
							name: areaName,
							buildings: parseInt(apartmentAmount),
							city: areaCity,
							areaOwner: 'admin',
							latlngs: layer.coords,
						});
					}
				}}
			>
				Luo alue
			</Button>
		</>
	);
};

export default CreateAreaForm;
