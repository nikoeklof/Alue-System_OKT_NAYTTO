import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import theme from '../style/theme';
import AreaMap from '../AreaMap';
import CreateAreaForm from './CreateAreaForm';

import { GetAllAreas } from '../graphql/functions';
import { cities } from '../db/cities';
import { useTheme } from '@mui/material/styles';
const styles = {
	areas: {
		flewGrow: 1,
	},
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 0.5,
	},
	menuProps: {
		PaperProps: {
			style: {
				maxHeight: 200,
				width: 250,
				fontFamily: 'Poppins',
			},
		},
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
		color: (theme) => theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'black',
		fontFamily: 'Poppins',
	},
	search: {
		mb: 2,
		ml: 2,
		width: '96%',
	},
	form: {
		width: '100%',
	},
	areainfo: {
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
		border: 'solid',
		borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
		borderWidth: 1,
		borderRadius: 1,
		display: 'flex',
		py: 2,
		my: 1,
		
	},
	info: {
		flexGrow: 2,
	},
	infotext: {
		mb: 0.5,
	},
	button: {},
	areaButton: {
		m: 0.5,
	},
};

const AreaCreate = () => {
	const [layerContext, setLayerContext] = useState(null);
	const defaultFilter = localStorage.getItem('defaultFilter');
	if (!defaultFilter) localStorage.setItem('defaultFilter', 'Mikkeli');
	const [cityIndex, setCityIndex] = useState(
		cities.findIndex((city) => city.Kunta === defaultFilter)
	);
	const [cityFilter, setCityFilter] = useState(
		defaultFilter ? defaultFilter : cities[0].Kunta
	);
	const [cityFilterInput, setCityFilterInput] = useState('');
	
	const filteredAreas = GetAllAreas({
		variables: { cityName: cityFilter ? cityFilter : defaultFilter }
	})


	useEffect(() => {
		setCityIndex(cities.findIndex((city) => city.Kunta === cityFilter));
	}, [cityFilter, cityIndex]);

	return (
		<Container>
			<Typography
				sx={styles.mainText}
				variant='h6'
			>
				Alueen luonti
			</Typography>

			<Container xs={styles.areas}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						md={6}
						xs={12}
					>
						<AreaMap
							areas={filteredAreas.data?.allAreas}
							layerContext={layerContext}
							setLayerContext={setLayerContext}
							canEdit={true}
							cities={cities}
							cityIndex={cityIndex}
							cityFilter={cityFilter}
						/>
					</Grid>
					<Grid
						item
						md={6}
						xs={12}
					>
						<CreateAreaForm
							layerContext={layerContext}
							setLayerContext={setLayerContext}
							defaultFilter={defaultFilter}
							cities={cities}
							cityFilter={cityFilter}
							setCityFilter={setCityFilter}
							cityFilterInput={cityFilterInput}
							setCityFilterInput={setCityFilterInput}
							setCityIndex={setCityIndex}
						/>
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default AreaCreate;
