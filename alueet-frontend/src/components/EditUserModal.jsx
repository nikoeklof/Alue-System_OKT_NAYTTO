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

const EditUserModal = ({...editProps}) => {
	const handleClose = () => editProps.handleEditModalClose();

	const handleChange = () => {
		console.log('change')
	};

	return (
		<Modal
			component='div'
			open={editProps.openEdit}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography 
					variant='h6' 
					component='h2' 
					sx={styles.header}
				>
					Muokkaa käyttäjän tietoja
				</Typography>
				<FormGroup>
					<FormControl>
						<TextField
							label='Käyttäjänimi'
							variant='outlined' 
							sx={styles.input}
						/>
						<TextField
							label='Sähköposti'
							variant='outlined' 
							sx={styles.input}
						/>
						<FormControlLabel 
							control={<Switch onChange={handleChange}/>}
							label='Admin'
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
					Valmis
				</Button>
			</Box>
		</Modal>
	)
};

export default EditUserModal;