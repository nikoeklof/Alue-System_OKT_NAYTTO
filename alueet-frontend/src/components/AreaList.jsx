import React, { useState } from 'react';
import {
	TextField,
	Container,
	Grid,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';

import theme from '../theme';

const styles = {
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 0.5
	},
	menuProps: {
		PaperProps: {
			style: {
				maxHeight: 200,
				width: 250
			}
		}
	},
	search: {
		float: 'right',
		mt: 3,
		width: '30%',
		minWidth: '200px'
	},
	text: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2
	},
	form: {
		mt: 2,
		ml: 4, 
		width: '90%'
	}
}

const areas = [
	{
		name: 'Emola-Rouhiala',
		buildings: 12,
		ownerId: 1
	},
	{
		name: 'Graani',
		buildings: 3,
		ownerId: null
	},
	{
		name: 'Kattilansilta-Laajalampi',
		buildings: 30,
		ownerId: 2
	},
	{
		name: 'Keskusta',
		buildings: 19,
		ownerId: 3
	},
	{
		name: 'Kirjala-Nuijamies',
		buildings: 9,
		ownerId: null
	}
]

const AreaInfo = (areaName) => {
	const [lent, setLent] = useState(''); // aiheuttaa infinite loop
	const area = areas.find(a => a.name === areaName.areaName);
	if (area) {
		if (area.ownerId) {
			setLent('Kyllä') // aiheuttaa infinite loop
		}
	}

	return (
		<Container>
			<Typography>Talot: {area.buildings}</Typography>
			<Typography>Lainattu: {lent}</Typography>
		</Container>
		
	)
};

const AreaList = () => {
	const [areaName, setAreaName] = useState('');
	const [open, setOpen] = useState(false);

	const handleChange = (event) => {
		setAreaName(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
		
	};

	return (
		<Container>
			<TextField label='Hae' sx={styles.search}></TextField>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography sx={styles.text} variant='h6'>
					Alueiden hallinta
					</Typography>

					<FormControl sx={styles.form}>
						<InputLabel>Valitse alue</InputLabel>
						<Select
							label='Valitse alue'
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							variant='outlined'
							value={areaName}
							onChange={handleChange}
							MenuProps={styles.menuProps}
						>
							{areas.map(area => (
								<MenuItem
									key={area.name}
									value={area.name}
								>
									{area.name}
								</MenuItem>
							))}

						</Select>
						<AreaInfo areaName={areaName}/>
					</FormControl>
				</Grid>
			</Grid>
		</Container>

	)
};

export default AreaList;