import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { areas as initialAreas, users } from './db/db';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AreaControl from './AreaControl';
import UserControl from './UserControl';
import AreaCreate from './components/AreaCreate';
import UserProfile from './UserProfile';
import LendList from './LendList';

const App = () => {
	const [areas, setAreas] = useState(initialAreas);
	const [layerContext, setLayerContext] = useState(null);
	const addArea = (props) => {
		setAreas([...areas, props]);
	};
	

	return (
		<Router>
			<Container>
				<NavBar />

				<Routes>
					<Route
						path='/'
						element={
							<Main
								areas={areas}
								setAreas={setAreas}
							/>
						}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/areaControl'
						element={
							<AreaControl
								areas={areas}
								setAreas={setAreas}
							/>
						}
					/>
					<Route
						path='/userControl'
						element={<UserControl />}
					/>
					<Route
						path='/createArea'
						element={
							<AreaCreate
								areas={areas}
								addArea={addArea}
								setLayerContext={setLayerContext}
								layerContext={layerContext}
							/>
						}
					/>
					<Route
						path='/lendList'
						element={<LendList users={users} />}
					/>
					<Route
						path='/userProfile'
						element={<UserProfile />}
					/>
				</Routes>
				<Footer />
			</Container>
		</Router>
	);
};

export default App;
