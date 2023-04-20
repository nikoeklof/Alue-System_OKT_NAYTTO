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

const UserProfile = ({ loggedUser, users, setUsers }) => {
	const [openDel, setDelOpen] = useState(false);
	const [username, setUsername] = useState(loggedUser.username);
	const [email, setEmail] = useState(loggedUser.email);
	const [usernameError, setUsernameError] = useState('');
	const [emailError, setEmailError] = useState('');

	const updatedUser = {
		username,
		email,
		id: loggedUser.id,
		admin: loggedUser.admin,
		areas: loggedUser.areas,
	};

	const updateUser = (props) => {
		const userList = users;
		let userToUpdate = { ...props };

		if (!username) setUsernameError('Käyttäjänimi tarvitaan');
		else setUsernameError('');
		if (!email) setEmailError('Sähköposti tarvitaan');
		else setEmailError('');

		userList.forEach((user, i) => {
			if (user.id === props.id) userList.splice(i, 1, userToUpdate);
		});
		setUsers([...userList]);
		console.log(userList);
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti tallentaa tiedot?',
		handleConfirm: () => {
			updateUser(updatedUser);
			setUsernameError('');
			setEmailError('');
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
					<Typography>Vaihda käyttäjänimi</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Käyttäjänimi'
							defaultValue={loggedUser.username}
							onChange={(e) => setUsername(e.target.value)}
							required
							error={!username}
							helperText={usernameError}
							variant='outlined'
						/>
					</FormControl>
				</Paper>
				<Paper sx={styles.paper}>
					<Typography>Vaihda sähköposti</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Sähköposti'
							defaultValue={loggedUser.email}
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
