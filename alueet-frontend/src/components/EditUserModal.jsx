import React, { useState } from 'react';
import {
	Box,
	Typography,
	Modal,
	Button,
	FormGroup,
	FormControl,
	TextField,
	FormControlLabel,
	Switch,
} from '@mui/material';

import theme from '../style/theme';

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
		py: 3,
	},
	header: {
		mb: 2,
		pb: 1,
		borderBottom: '1px solid',
		borderColor: theme.color.primary,
	},
	input: {
		m: 0.5,
	},
	button: {
		float: 'right',
		m: 0.5,
		mt: 2,
	},
};

const EditUserModal = ({ ...editProps }) => {
	const [username, setUsername] = useState(editProps.originalUser?.username);
	const [email, setEmail] = useState(editProps.originalUser?.email);
	const [admin, setAdmin] = useState(editProps.originalUser?.admin);
	const [emailError, setEmailError] = useState('');

	const handleClose = () => {
		setEmailError('');
		editProps.handleEditModalClose();
	};

	const handleSubmit = () => {
		const newUser = {
			id: editProps.originalUser.id,
			username,
			email,
			admin,
			areas: editProps.originalUser.areas,
		};

		if (!email || !newUser.email) setEmailError('Sähköposti on pakollinen');
		else setEmailError('');

		if (newUser.email) {
			editProps.handleConfirm(newUser);
			handleClose();
		}
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
							defaultValue={editProps.originalUser?.username}
							onChange={(e) => setUsername(e.target.value)}
							sx={styles.input}
						/>
						<TextField
							label='Sähköposti'
							variant='outlined'
							defaultValue={editProps.originalUser?.email}
							onChange={(e) => setEmail(e.target.value)}
							required
							error={!email}
							helperText={emailError}
							sx={styles.input}
						/>
						<FormControlLabel
							control={
								<Switch
									checked={admin}
									onChange={(e) => setAdmin(e.target.checked)}
								/>
							}
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
					onClick={() => handleSubmit()}
				>
					Valmis
				</Button>
			</Box>
		</Modal>
	);
};

export default EditUserModal;
