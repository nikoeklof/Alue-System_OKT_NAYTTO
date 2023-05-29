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
import { useTheme } from '@mui/material/styles';
import theme from './style/theme';
import DeleteWarningModal from './components/DeleteWarningModal';
import {
	EditUserAbout,
	EditEmail,
	EditPassword
} from './graphql/functions'

const styles = {
	container: {
		mb: 8,
	},
	divider: {
		borderColor: theme.palette.mode === 'dark' ? '#000000' : theme.palette.text.secondary,
		mb: 1,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'black',
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
		color: (theme) => theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'black',
		fontFamily: 'Poppins',
	},
	paper: {
		p: 1,
		m: 1,
		color: (theme) => theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'black',
		fontFamily: 'Poppins',
	},
	form: {
		width: '100%',
	},
	button: (theme) => ({
		m: 1,
		color: theme.palette.mode === 'dark' ? '#000000' : theme.palette.text.secondary,
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
		fontFamily: 'Poppins',
	  }),
};

const UserProfile = ({ user }) => {
	const [openDel, setDelOpen] = useState(false);
	const [email, setEmail] = useState(user ? user.email : null);
	const [password, setPassword] = useState('');
	const [aboutMe, setAboutMe] = useState(user ? user.aboutMe : null);
	const [emailError, setEmailError] = useState('');
	const [editUserEmail] = EditEmail();
	const [editUserPassword] = EditPassword();
	const [editUserAbout] = EditUserAbout();
	const theme = useTheme();

	const updateUser = async () => {
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
		await editUserAbout({
			variables: {
				aboutMe: aboutMe,
			},
		});
	};

	const delProps = {
		openDel,
		handleCloseDelModal: () => setDelOpen(false),
		warningText: 'Haluatko varmasti tallentaa tiedot?',
		handleConfirm: () => {
			updateUser();
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
				<Paper sx={styles.paper}>
					<Typography>Vaihda minusta tekstiä</Typography>
					<FormControl sx={styles.form}>
						<TextField
							label='Minusta'
							variant='outlined'
							defaultValue={aboutMe}
							onChange={(e) => setAboutMe(e.target.value)}
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
