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
		width: '100px',
		ml: 0.5		
	}
};


const Login = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
		  setMessage(null);
		}, 8000);
	  }, [message]);

	const handleUserName = (e) => {
		setUserName(e.target.value);
	  };
	
	const handlePassword = (e) => {
		setPassword(e.target.value);
	  };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === '' || password === '') {
		  setMessage({ text:`Virheellinen käyttäjätunnus tai salasana.`});
		  console.log("tyhjiä kenttiä")
		} else {
		  console.log("kirjautuminen onnistui. käyttäjätunnus: "+username+" salasana: "+password)
		  setMessage({ text:`Kirjautuminen onnistui. Siirrytään alueiden hallintaan.`});
		  setTimeout(() => {
			navigate("/AreaControl");
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
				Kirjaudu sisään
			</Typography>
			<FormControl>
				<InputLabel htmlFor='username'>Käyttäjätunnus</InputLabel>
				<Input onChange={handleUserName}
					id='username'
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
				Kirjaudu
			</Button>
			<Notification message={message}/>	 	
		</FormGroup>
		
	)
};

export default Login;