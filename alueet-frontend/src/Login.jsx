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
	Alert,
} from '@mui/material';
import { UserLogin } from './graphql/functions'

import theme from './style/theme';
import { useNavigate } from 'react-router-dom';

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
		fontFamily: 'Poppins',
	},
	input: {
		color: theme.color.primary,
		my: 0.5,
	},
	button: (theme) => ({
		color: theme.palette.mode === 'dark' ? '#000000' : theme.palette.text.secondary,
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
		m: 1,
		ml: 2,
		mb: 2,
		fontFamily: 'Poppins',
	}),
	divider: {
		borderColor: theme.bgColor.secondary,
		mb: 2,
	},
	alert: {
		m: 0.5,
		mb: 1,
	},
};

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [invalidCredentialsError, setInvalidCredentialsError] = useState('');
	const [login] = UserLogin();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (username.length === 0)
			return setUsernameError('Tarvitaan Sähköposti');
		else setUsernameError('');
		if (password.length === 0)
			return setPasswordError('Tarvitaan salasana');
		else setPasswordError('');
		login({
			variables: { email: username, password: password },
			onError: () => {
				return setInvalidCredentialsError(
					'Tarkista sähköposti ja salasana'
				);
			},
		}).then((res) => {
			if (res.data !== undefined) {
				setInvalidCredentialsError('');
				localStorage.setItem('token', res.data.login.value);
				navigate('/');
				return navigate(0);
			}
			return;
		});
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
					{invalidCredentialsError.length > 0 ? (
						<Alert
							severity='error'
							sx={styles.alert}
							icon={false}
						>
							{invalidCredentialsError}
						</Alert>
					) : (
						<></>
					)}
					<FormControl>
						<TextField
							label='Sähköposti'
							variant='outlined'
							onChange={(e) => {
								setUsername(e.target.value);
								if (username.length === 0) setUsernameError('');
							}}
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
							onChange={(e) => {
								setPassword(e.target.value);
								if (password.length === 0) setPasswordError('');
							}}
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
