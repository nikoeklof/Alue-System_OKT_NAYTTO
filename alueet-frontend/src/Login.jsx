import React, { useState } from 'react';
import {
	Container,
	FormControl,
	Typography,
	Button,
	FormGroup,
	TextField,
	Paper,
	Divider,
} from '@mui/material';

import theme from './style/theme';

const styles = {
	container: {
		maxWidth: 500,
	},
	form: {
		px: 2,
		pt: 2,
		mt: 2,
	},
	text: {
		color: theme.color.primary,
		ml: 0.5,
		mb: 1,
	},
	input: {
		color: theme.color.primary,
		my: 0.5,
	},
	button: {
		m: 1,
		ml: 2,
		mb: 2,
	},
	divider: {
		borderColor: theme.bgColor.secondary,
		mb: 2,
	},
};

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [usernameError, setUsernameError] = useState('');

	const handleSubmit = () => {
		const user = {
			username: username,
			password: password,
		};

		if (!password) setPasswordError('Tarvitaan salasana');
		else setPasswordError('');
		if (!username) setUsernameError('Tarvitaan käyttäjätunnus');
		else setUsernameError('');

		console.log(user);
	};

	return (
		<Container sx={styles.container}>
			<Paper>
				<FormGroup sx={styles.form}>
					<Typography
						variant='h5'
						noWrap
						sx={styles.text}
					>
						Kirjaudu sisään
					</Typography>
					<Divider sx={styles.divider} />
					<FormControl>
						<TextField
							label='Käyttäjänimi'
							variant='outlined'
							onChange={(e) => setUsername(e.target.value)}
							required
							error={!!usernameError}
							helperText={usernameError}
							sx={styles.input}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label='Salasana'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
							required
							error={!!passwordError}
							helperText={passwordError}
							variant='outlined'
							sx={styles.input}
						/>
					</FormControl>
				</FormGroup>
				<Button
					variant='contained'
					sx={styles.button}
					onClick={() => handleSubmit()}
				>
					Kirjaudu
				</Button>
			</Paper>
		</Container>
	);
};

export default Login;
