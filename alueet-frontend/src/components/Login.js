import React from 'react';
import { FormControl, OutlinedInput} from '@mui/material';

const Login = () => {
	return (
		<FormControl>
			<OutlinedInput id='email' placeholder='käyttäjätunnus'/>
			<OutlinedInput id='password' placeholder='salasana'/>
		</FormControl>
	)
}

export default Login;