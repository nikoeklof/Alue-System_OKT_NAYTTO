import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//for testing
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AREAS, EDIT_AREA } from './queries'

import Login from './components/Login';
import NavBar from'./components/NavBar';
import Register from './components/Register';
import AreaControl from './components/AreaControl';
import UserControl from './components/UserControl';

const App = () => {

		//for testing start
		const result = useQuery(ALL_AREAS)
		const [ editArea ] = useMutation(EDIT_AREA, {
			refetchQueries: [ { query: ALL_AREAS }] 
		})
		if (result.loading)  {
			return <div>loading...</div>
		}
		//variables for testing
		const areaId = result.data.allAreas[0].id
		const type = "Kaupunki"
		const map = {
			coordinates: { lan: "62.324", lon: "5.824" },
			zone: "756 196 123 156"
		}
		//click handlers
		const handle = () =>  editArea({ variables: { areaId, map, type } })
		const update = () =>  console.log(result)
		//end

	return (
		<Router>
			<Container>
				<NavBar />
				<button onClick={handle}>
					mutate
				</button>
				<button onClick={update}>
					console log result
				</button>
			</Container>

			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/areaControl' element={<AreaControl />} />
				<Route path='/userControl' element={<UserControl />} />
			</Routes>
		</Router>
	);
};

export default App;
