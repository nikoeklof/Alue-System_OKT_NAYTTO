import React from 'react';
import { 
	FormControl, 
	Input, 
	Typography, 
	Button, 
	InputLabel,
	FormGroup
} from '@mui/material';

import theme from '../theme';

const styles = {
	form: {
		mx: 2,
		px: 2,
		py: 2,
		mt: 2,
		border: 'solid',
		borderColor: theme.bgColor.secondary,
		borderRadius: '3%',
		display: 'flex',
		maxWidth: '400px',
		xs:{ display: 'block' }
	},
	text: {
		color: theme.color.primary,
		ml: 0.5,
		mb: 1
	},
	input: {
		color: theme.color.primary,
		my: 2,
		px: 1,
	},
	button: {
		width: '130px',
		ml: 0.5		
	}
}

const Register = () => {
	return (
		<FormGroup  sx={styles.form}>
			
			<Typography 
				variant='h5'
				noWrap
				sx={styles.text}
			>
				Rekisteröityminen
			</Typography>
			<FormControl>
				<InputLabel htmlFor='username'>Käyttäjätunnus</InputLabel>
				<Input 
					id='username'
					variant='filled'
					sx={styles.input} 
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='email'>Sähköposti</InputLabel>
				<Input 
					id='email'
					variant='filled'
					sx={styles.input} 
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='password'>Salasana</InputLabel>
				<Input
					id='password'
					variant='filled'
					sx={styles.input}
				/>
			</FormControl>
			<Button
				variant='contained'
				sx={styles.button}
			>
				Rekisteröidy
			</Button>
		
		</FormGroup>
		
	)
}

export default Register;