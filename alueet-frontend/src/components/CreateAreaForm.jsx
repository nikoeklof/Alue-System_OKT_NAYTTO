import React, { useState, useEffect } from 'react';
import {
	Alert,
	Button,
	Divider,
	FormControl,
	TextField,
	Typography,
	Autocomplete,
} from '@mui/material';
import { CREATE_AREA } from '../queries';
import { useMutation } from '@apollo/client';
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

const CreateAreaForm = ({
	layerContext,
	setLayerContext,
	cities,
	cityFilter,
	setCityFilter,
	cityFilterInput,
	setCityFilterInput,
	refetch,
}) => {
	const [areaName, setAreaName] = useState('');
	const [apartmentAmount, setApartmentAmount] = useState('');
	const [quarterName, setQuarterName] = useState('');
	const [miscInfo, setMiscInfo] = useState('');
	const [layer, setLayer] = useState(null);
	const [areaNameError, setAreaNameError] = useState('');
	const [areaQuarterError, setAreaQuarterError] = useState('');
	const [areaBuildingsError, setAreaBuildingsError] = useState('');
	const [areaCityError, setAreaCityError] = useState('');
	const [errorAlert, setErrorAlert] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);
	const [createArea] = useMutation(CREATE_AREA);

	useEffect(() => {
		if (layer === layerContext) {
			return;
		}
		if (layerContext !== null) {
			setLayer(layerContext);
			setErrorAlert(false);
			setSuccessAlert(true);
		} else {
			setErrorAlert(false);
			setSuccessAlert(false);
		}
	}, [layerContext, layer]);

	const handleSubmit = () => {
		if (!layer) setErrorAlert(true);
		else setErrorAlert(false);

		console.log(layer);
		layer.layer.remove();

		if (!cityFilter) setAreaCityError('Kaupunki on pakollinen');
		else setAreaCityError('');

		if (!areaName) setAreaNameError('Alueen nimi on pakollinen');
		else setAreaNameError('');

		if (!quarterName) setAreaQuarterError('Kaupunginosa on pakollinen');
		else setAreaQuarterError('');

		if (!parseInt(apartmentAmount))
			setAreaBuildingsError('Asuntojen määrä on pakollinen');
		else setAreaBuildingsError('');

		if (areaName && apartmentAmount && cityFilter && layer) {
			setSuccessAlert(false);
			layerContext.layer.remove();
			const parsedCoords = [];
			layerContext?.coords.forEach((coord) => {
				parsedCoords.push({
					lat: coord.lat.toString(),
					lng: coord.lng.toString(),
				});
			});
			createArea({
				variables: {
					mapId: layerContext?.layer._leaflet_id,
					address: areaName,
					buildings: parseInt(apartmentAmount),
					cityName: cityFilter,
					latlngs: parsedCoords,
					quarter: quarterName,
					misc: miscInfo,
				},
				onError: (e) => {
					console.log(e);
				},
				onCompleted: () => {
					setLayerContext(null);
					refetch({ cityName: cityFilter });
				},
			});
		}
	};

	return (
		<>
			{layer ? (
				''
			) : (
				<Alert
					severity='success'
					sx={styles.alert}
					icon={false}
				>
					{`←`} Piirrä ensin alue
				</Alert>
			)}

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
				<Autocomplete
					disablePortal
					id='findCity'
					options={cities.map((city) => city.Kunta)}
					value={cityFilter}
					sx={styles.textField}
					onChange={(e, newValue) => {
						setCityFilter(newValue);
						console.log(cityFilter);
					}}
					inputValue={cityFilterInput}
					onInputChange={(e, newValue) =>
						setCityFilterInput(newValue)
					}
					renderInput={(params) => (
						<TextField
							{...params}
							error={!!areaCityError}
							helperText={areaCityError}
							label='Hae kaupunkia'
						/>
					)}
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
					onChange={(e) => setQuarterName(e.target.value)}
					type='text'
					label='Kaupunginosa'
					required
					error={!!areaQuarterError}
					helperText={areaQuarterError}
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
				<TextField
					onChange={(e) => setMiscInfo(e.target.value)}
					type=''
					label='Lisätietoja'
					sx={styles.textField}
					multiline
				/>
			</FormControl>

			<Button
				variant='contained'
				type='button'
				sx={styles.btns}
				onClick={() => {
					handleSubmit();
				}}
			>
				Luo alue
			</Button>
		</>
	);
};

export default CreateAreaForm;
