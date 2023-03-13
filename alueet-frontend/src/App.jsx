import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login'
import NavBar from'./components/NavBar'

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />
				<Login />
			</Container>

			<Routes>
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
		
	);
}

export default App;
