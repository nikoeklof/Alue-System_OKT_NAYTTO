import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import NavBar from'./components/NavBar';
import Register from './components/Register';
import AreaControl from './components/AreaControl';

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />
			</Container>

			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/areaControl' element={<AreaControl />} />
			</Routes>
		</Router>
		
	);
}

export default App;
