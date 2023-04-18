import React, { useState } from 'react';
import {
	Button,
	Container,
	FormControl,
	FormGroup,
	TextField,
	Typography,
	Paper,
} from '@mui/material';

import theme from './style/theme';
import DeleteWarningModal from './components/DeleteWarningModal';

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
	paper: {
		p: 1,
		m: 1,
	},
	form: {
		width: '100%',
	},
	button: {
		m: 1,
	},
};

const UserProfile = () => {
	const [openDel, setDelOpen] = useState(false);

	const updateUser = () => {
		console.log('saved user');
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti tallentaa tiedot?',
		handleConfirm: () => updateUser,
	};

	return (
		<Container sx={styles.container}>
			<Typography
				variant='h6'
				sx={styles.mainText}
			>
				Profiilin tiedot
			</Typography>
			<FormGroup>
				<Paper sx={styles.paper}>
					<Typography>Vaihda käyttäjänimi</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Käyttäjänimi'
							variant='outlined'
						/>
					</FormControl>
				</Paper>
				<Paper sx={styles.paper}>
					<Typography>Vaihda sähköposti</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Sähköposti'
							variant='outlined'
						/>
					</FormControl>
				</Paper>
				<Paper sx={styles.paper}>
					<Typography>Vaihda salasana</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Salasana'
							variant='outlined'
						/>
					</FormControl>
				</Paper>
			</FormGroup>
			<Button
				variant='contained'
				sx={styles.button}
				onClick={() => setDelOpen(true)}
			>
				Tallenna
			</Button>
			<DeleteWarningModal {...delProps} />
		</Container>
	);
};

export default UserProfile;
