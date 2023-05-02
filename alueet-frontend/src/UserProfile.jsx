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
import { useMutation } from '@apollo/client';
import { EDIT_USER_EMAIL, EDIT_USER_PASSWORD } from './queries';

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

const UserProfile = ({ user }) => {
	const [openDel, setDelOpen] = useState(false);
	const [email, setEmail] = useState(user ? user.email : null);
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [editUserEmail] = useMutation(EDIT_USER_EMAIL, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});
	const [editUserPassword] = useMutation(EDIT_USER_PASSWORD, {
		onError: (e) => console.log(JSON.stringify(e, null, 2)),
	});

	const updateEmail = async () => {
		if (!email) return setEmailError('Sähköposti tarvitaan');
		else setEmailError('');

		await editUserEmail({
			variables: {
				email: email,
			},
		});
		if (password) {
			await editUserPassword({
				variables: {
					password: password,
				},
			});
		}
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti tallentaa tiedot?',
		handleConfirm: () => {
			updateEmail();
			setEmailError('');
			setPassword('');
			setDelOpen(false);
		},
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
					<Typography>Vaihda sähköposti</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Sähköposti'
							defaultValue={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							error={!email}
							helperText={emailError}
							variant='outlined'
						/>
					</FormControl>
				</Paper>
				<Paper sx={styles.paper}>
					<Typography>Vaihda salasana</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Salasana'
							type='password'
							variant='outlined'
							defaultValue={password}
							onChange={(e) => setPassword(e.target.value)}
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
