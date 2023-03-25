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
import { useState } from 'react';


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
};


const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
   
  
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
   
  
	const handleName = (e) => {
	  setName(e.target.value);
	  setSubmitted(false);
	};
   
  
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	  setSubmitted(false);
	};
  
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	  setSubmitted(false);
	};
   
  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (name === '' || email === '' || password === '') {
		setError(true);
		console.log("tyhjiä kenttiä")
	  } else {
		setSubmitted(true);
		setError(false);
		console.log("rekisteröinti onnistui. käyttäjätunnus: "+name+" sposti: "+email+" salasana: "+password)
	  }
	};
   
  
	const successMessage = () => {
	  return (
		<div  style={{
			display: submitted ? '' : 'none',
		  }}>
		<Typography 
				variant='h9'
				noWrap
				sx={styles.text}
			>
				Käyttäjä {name} lisätty onnistuneesti.
			</Typography>
			</div>	
	  );
	};
   
  
	const errorMessage = () => {
	  return (
		<div  style={{
			display: error ? '' : 'none',
		  }}>
		<Typography 
				variant='h9'
				noWrap
				sx={styles.text}
			>
				Tyhjiä kenttiä
		</Typography>
		</div>
	  );
	};


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
				<Input onChange={handleName}
					id='username'
					variant='filled'
					sx={styles.input} 
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='email'>Sähköposti</InputLabel>
				<Input onChange={handleEmail}
					id='email'
					variant='filled'
					sx={styles.input} 
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='password'>Salasana</InputLabel>
				<Input onChange={handlePassword}
					id='password'
					variant='filled'
					sx={styles.input}
				/>
			</FormControl>
			<Button onClick={handleSubmit}
				variant='contained'
				sx={styles.button}
			>
				Rekisteröidy
			</Button>
			{errorMessage()}
        	{successMessage()}  		
		</FormGroup>
		
	)
};

export default Register;