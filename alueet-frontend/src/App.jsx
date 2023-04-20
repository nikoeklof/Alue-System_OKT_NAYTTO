import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import Main from './Main';
import Login from './Login';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AreaControl from './AreaControl';
import UserControl from './UserControl';
import AreaCreate from './components/AreaCreate';
import UserProfile from './UserProfile';
import LendList from './LendList';
import { useQuery } from '@apollo/client';
import { ALL_AREAS, ALL_USERS } from './queries';
const App = () => {
	const { loading: loadingAreas, data: dataAreas } = useQuery(ALL_AREAS, {
		onError: (e) => {
			console.error(e);
		},
	});
	const { loading: loadingUsers, data: dataUsers } = useQuery(ALL_USERS, {
		variables: { admin: null },
		onError: (e) => console.error('userError: ' + e),
	});

	const [areas, setAreas] = useState(null);
	const [users, setUsers] = useState(null);
	const [layerContext, setLayerContext] = useState(null);

	const addArea = (props) => {
		setAreas([...areas, props]);
	};
	const addUser = (props) => {
		setUsers([...users, props]);
		console.log(users);
	};
	useEffect(() => {
		setAreas(dataAreas?.allAreas);
	}, [loadingAreas, dataAreas]);
	useEffect(() => {
		setUsers(dataUsers?.allUsers);
	}, [loadingUsers, dataUsers]);

	return (
		<Router>
			<Container>
				<NavBar />

				<Routes>
					<Route
						path='/'
						element={<Main />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>

					<Route
						path='/areaControl'
						element={
							!areas ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '45%',
									}}
								>
									<InfinitySpin
										width='200'
										color='gray'
										ariaLabel='loading'
										wrapperStyle
										wrapperClass
									/>
								</div>
							) : (
								<AreaControl
									areas={areas}
									setAreas={setAreas}
								/>
							)
						}
					/>
					<Route
						path='/userControl'
						element={
							!users ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '45%',
									}}
								>
									<InfinitySpin
										width='200'
										color='gray'
										ariaLabel='loading'
										wrapperStyle
										wrapperClass
									/>
								</div>
							) : (
								<UserControl
									users={users}
									addUser={addUser}
									setUsers={setUsers}
								/>
							)
						}
					/>
					<Route
						path='/createArea'
						element={
							!areas ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '45%',
									}}
								>
									<InfinitySpin
										width='200'
										color='gray'
										ariaLabel='loading'
										wrapperStyle
										wrapperClass
									/>
								</div>
							) : (
								<AreaCreate
									areas={areas}
									addArea={addArea}
									setLayerContext={setLayerContext}
									layerContext={layerContext}
								/>
							)
						}
					/>
					<Route
						path='/lendList'
						element={<LendList />}
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
