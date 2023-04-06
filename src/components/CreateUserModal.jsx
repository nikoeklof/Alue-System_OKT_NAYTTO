import React from 'react';
import {
	Box,
	Typography,
	Modal,
	Button,
	FormGroup,
	FormControl,
	TextField,
	FormControlLabel,
	Switch
} from '@mui/material';

import theme from '../theme';

const styles = {
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		backgroundColor: theme.bgColor.default,
		boxShadow: 24,
		borderRadius: 2,
		px: 4,
		py: 3
	},
	header: {
		mb: 2,
		pb: 1,
		borderBottom: '1px solid',
		borderColor: theme.color.primary
	},
	input: {
		m: 0.5,
	},
	button: {
		float: 'right',
		m: 0.5,
		mt: 2
	}
};

const CreateUserModal = ({...createProps}) => {
	const handleClose = () => createProps.handleCreateModalClose();

	const handleChangeAdmin = () => {
		console.log('change admin')
	};

	const handleChangeGuest = () => {
		console.log('change guest')
	};

	return (
		<Modal
			component='div'
			open={createProps.openCreate}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography 
					variant='h6' 
					component='h2' 
					sx={styles.header}
				>
					Luo käyttäjä
				</Typography>
				<FormGroup>
					<FormControl>
						<TextField
							label='Käyttäjänimi'
							variant='outlined' 
							sx={styles.input}
						/>
						<TextField
							label='Nimi'
							variant='outlined' 
							sx={styles.input}
						/>
						<TextField
							label='Sähköposti'
							variant='outlined' 
							required
							sx={styles.input}
						/>
						<FormControlLabel 
							control={<Switch onChange={handleChangeAdmin}/>}
							label='Admin'
							sx={styles.input}
						/>
						<FormControlLabel 
							control={<Switch onChange={handleChangeGuest}/>}
							label='Vieras'
							sx={styles.input}
						/>
					</FormControl>
				</FormGroup>
				<Button 
					sx={styles.button} 
					variant='contained'
					onClick={() => handleClose()}
				>
					Peruuta
				</Button>
				<Button 
					sx={styles.button} 
					variant='contained'
				>
					Luo
				</Button>
			</Box>
		</Modal>
	)
};

export default CreateUserModal;