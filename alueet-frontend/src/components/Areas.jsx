import React from 'react';
import {
	TextField,
	Container,
	List,
	ListItemButton,
	ListItemText,
	Grid,
	Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import theme from '../theme';

const styles = {
	search: {
		mt: 3,
		width: '80%'
	},
	text: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4, 
		mb: 2,
		pb: 2
	},
	list: {
		button: {
			py: 0,
		},
		item: {
			color: theme.color.blue,
			py: 1,
			px: 1,
			my: 0,
			mx: 0
		},
		evenItem: {
			backgroundColor: theme.bgColor.default,
			color: theme.color.blue,
			py: 1,
			px: 1,
			my: 0,
			mx: 0
		},
		iconEven: {
			backgroundColor: theme.bgColor.default,
			py: 1,
			pr: 1
		},
		icon: {
			pr: 1
		}
	},
	cityGrid: {
		flexGrow: 1
	},
	countryGrid: {
		flexGrow: 0
	}
}


const listItem = (area, index) => {
	if (index % 2 === 0) {
		return (
			<ListItemButton divider disableGutters key={index} sx={styles.list.button}>
				<ListItemText
					primary={area}
					sx={styles.list.evenItem}
				/>
				<ExpandMoreIcon sx={styles.list.iconEven} />
			</ListItemButton>
		)
	} else {
		return (
			<ListItemButton divider disableGutters key={index} sx={styles.list.button}>
				<ListItemText
					primary={area}
					sx={styles.list.item}
				/>
				<ExpandMoreIcon sx={styles.list.icon} />
			</ListItemButton>
		)
	}
}

const Areas = () => {
	const cityAreas = [
		'Emola-Rouhiala',
		'Graani',
		'Kattilansilta-Laajalampi'
	]
	const countryAreas = [
		'Anttola',
		'Ristiina'
	]

	return (
		<Container>
			<TextField label='Hae' sx={styles.search}></TextField>

			<Grid container spacing={2}>
				<Grid item xs={12} md={6} sx={styles.cityGrid}>
					<Typography sx={styles.text} variant='h6'>
					Kaupunki
					</Typography>
				
					<List>
						{cityAreas.map((area, index) => listItem(area, index))}
					</List>
				</Grid>
				<Grid item xs={12} md={6} sx={styles.countryGrid}>
					<Typography sx={styles.text} variant='h6'>
					Maaseutu
					</Typography>
				
					<List>
						{countryAreas.map((area, index) => listItem(area, index))}
					</List>
				</Grid>
			</Grid>	
		</Container>
		
	)
};

export default Areas;