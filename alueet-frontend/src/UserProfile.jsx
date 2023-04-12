import React from 'react';
import {
	Button,
	Container,
	FormControl,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';

import theme from './style/theme';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
};

const UserProfile = () => {
	return (
		<Container sx={styles.container}>
			<Typography
				variant='h6'
				sx={styles.mainText}
			>
				Profiilin tiedot
			</Typography>
			<FormGroup>
				<Typography>Vaihda käyttäjänimi</Typography>
				<FormControl>
					<TextField
						label='Käyttäjänimi'
						variant='outlined'
					/>
				</FormControl>
				<Typography>Vaihda sähköposti</Typography>
				<FormControl>
					<TextField
						label='Sähköposti'
						variant='outlined'
					/>
				</FormControl>
				<Typography>Vaihda salasana</Typography>
				<FormControl>
					<TextField
						label='Salasana'
						variant='outlined'
					/>
				</FormControl>
			</FormGroup>
			<Button variant='contained'>Tallenna</Button>
		</Container>
	);
};

export default UserProfile;
