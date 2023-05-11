import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AreaControl from './AreaControl';
import UserControl from './UserControl';
import AreaCreate from './components/AreaCreate';
import UserProfile from './UserProfile';
import LendList from './LendList';
import { Me } from './graphql/functions';

const App = () => {
	const [loggedUser, setLoggedUser] = useState(null);
	const user = Me({onError: (e) => 
		console.log(JSON.stringify(e, null, 2))
	});

	useEffect(() => {
		setLoggedUser(user.data?.me);
	}, [loggedUser, user]);

	return (
		<Router>
			<Container>
				<NavBar user={loggedUser ? loggedUser : null} />

				<Routes>
					<Route
						path='/'
						element={
							<Main user={!user.loading ? loggedUser : null} />
						}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/areaControl'
						element={<AreaControl loggedUser={loggedUser} />}
					/>
					<Route
						path='/userControl'
						element={<UserControl />}
					/>
					<Route
						path='/createArea'
						element={<AreaCreate />}
					/>
					<Route
						path='/lendList'
						element={<LendList />}
					/>
					<Route
						path='/userProfile'
						element={
							<UserProfile
								user={!user.loading ? loggedUser : null}
							/>
						}
					/>
				</Routes>
				<Footer />
			</Container>
		</Router>
	);
};
export default App;
