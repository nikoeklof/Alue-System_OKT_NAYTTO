import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import NavBar from'./components/NavBar';
import Register from './components/Register';
import Areas from './components/Areas';

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />
				<Areas />
			</Container>

			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/areas' element={<Areas />} />
			</Routes>
		</Router>
		
	);
}

export default App;
