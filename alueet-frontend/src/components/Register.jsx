import React, { useEffect, useState } from "react";
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
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
};


const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();
   
	useEffect(() => {
		setTimeout(() => {
		  setMessage(null);
		}, 8000);
	  }, [message]);

	const handleName = (e) => {
	  setName(e.target.value);
	};
   
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	};
  
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	};
   
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (name === '' || email === '' || password === '') {
		 setMessage({ text:`Tarkista että täytit kaikki kentät.`});
		console.log("tyhjiä kenttiä")
	  } else {
		console.log("rekisteröinti onnistui. käyttäjätunnus: "+name+" sposti: "+email+" salasana: "+password)
		setMessage({ text:`Kirjautuminen onnistui. Siirrytään kirjautumissivulle.`});
		setTimeout(() => {
			navigate("/Login");
		}, 3000);
	  }
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
			<Notification message={message}/>				
		</FormGroup>
		
	)
};

export default Register;