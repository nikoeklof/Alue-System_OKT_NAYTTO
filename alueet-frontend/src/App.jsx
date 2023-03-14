import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import NavBar from'./components/NavBar';
import Register from './components/Register';

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />
				<Register />
			</Container>

			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
		
	);
}

export default App;
