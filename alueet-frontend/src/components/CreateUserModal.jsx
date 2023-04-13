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

const CreateUserModal = ({ ...createProps }) => {
	const handleClose = () => createProps.handleCreateModalClose();
	const [admin, setAdmin] = useState(false);
	const [guest, setGuest] = useState(false);
	const [ready, setReady] = useState(true);

	const handleChangeAdmin = () => {
		setAdmin(!admin);
		setReady(!ready);
	};

	const handleChangeGuest = () => {
		setGuest(!guest);
		setReady(!ready);
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
						<FormControlLabel
							control={
								<Switch
									disabled={guest}
									onChange={handleChangeAdmin}
								/>
							}
							label='Admin'
							sx={styles.input}
						/>
						<FormControlLabel
							control={
								<Switch
									disabled={admin}
									onChange={handleChangeGuest}
								/>
							}
							label='Vieras'
							sx={styles.input}
						/>
						{admin ? (
							<>
								<TextField
									label='Sähköposti'
									variant='outlined'
									type='email'
									required
									sx={styles.input}
								/>
								<TextField
									label='Salasana'
									type='password'
									required
									variant='outlined'
									sx={styles.input}
								/>
							</>
						) : (
							''
						)}
						{guest ? (
							<TextField
								label='Sähköposti'
								variant='outlined'
								required
								sx={styles.input}
							/>
						) : (
							''
						)}
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
					disabled={ready}
					sx={styles.button}
					variant='contained'
				>
					Valmis
				</Button>
			</Box>
		</Modal>
	);
};

export default CreateUserModal;
