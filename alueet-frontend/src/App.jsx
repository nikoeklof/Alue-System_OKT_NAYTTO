import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import Register from './Register';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AreaControl from './AreaControl';
import UserControl from './UserControl';

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />

				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/areaControl' element={<AreaControl />} />
					<Route path='/userControl' element={<UserControl />} />
				</Routes>

				<Footer />
			</Container>
		</Router>
	);
};

export default App;
