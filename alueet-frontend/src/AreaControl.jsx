import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableBody,
	TextField,
	TablePagination,
	Autocomplete,
} from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

import theme from './style/theme';
import AreaMap from './AreaMap';
import AreaTableRowComponent from './components/AreaTableRowComponent';
import { MakeRequest, GetAllAreas } from './graphql/functions'
import { cities } from './db/cities';

const styles = {
	container: {
		mb: 8,
	},
	areas: {
		flewGrow: 1,
	},
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 0.5,
	},
	menuProps: {
		PaperProps: {
			style: {
				maxHeight: 200,
				width: 250,
			},
		},
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
	search: {
		mb: 2,
		ml: 2,
		width: '96%',
	},
	form: {
		width: '100%',
	},
	areainfo: {
		backgroundColor: theme.bgColor.primary,
		border: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		borderRadius: 1,
		display: 'flex',
		py: 2,
		my: 1,
	},
	info: {
		flexGrow: 2,
	},
	infotext: {
		mb: 0.5,
	},
	button: {},
	areaButton: {
		m: 0.5,
	},
};

const AreaControl = ({ loggedUser }) => {
	const defaultFilter = localStorage.getItem('defaultFilter');
	if (!defaultFilter || defaultFilter === 'null')
		localStorage.setItem('defaultFilter', 'Mikkeli');

	const [selectedArea, setSelectedArea] = useState(undefined);
	const [hoverStatus, setHoverStatus] = useState(undefined);
	const [cityFilter, setCityFilter] = useState(
		defaultFilter ? defaultFilter : cities[0].Kunta
	);
	const [loanError, setLoanError] = useState('');
	const [cityFilterInput, setCityFilterInput] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filteredAreas, setFilteredAreas] = useState([]);
	const [quarterFilter, setQuarterFilter] = useState('');
	const [quarterFilterInput, setQuarterFilterInput] = useState('');
	const [quarterList, setQuarterList] = useState([]);
	const [quarterAreas, setQuarterAreas] = useState([]);
	const [cityIndex, setCityIndex] = useState(
		cities.findIndex((city) => city.Kunta === defaultFilter)
	);

	const allAreas = GetAllAreas()
	
	const [makeAreaRequest] = MakeRequest( { 
		onError: (e) => {
			setLoanError(e);
		}
	})

	useEffect(() => {
		console.log(loanError);
	}, [loanError]);

	useEffect(() => {
		console.log(selectedArea);
	}, [selectedArea, setSelectedArea]);

	useEffect(() => {
		if (filteredAreas) {
			const quarterArray = [];
			filteredAreas.forEach((area) => {
				if (quarterArray.includes(area.info.quarter)) return;
				quarterArray.push(area.info.quarter);
			});
			setQuarterList(quarterArray);
		}
	}, [filteredAreas]);

	useEffect(() => {
		setFilteredAreas(allAreas.data?.allAreas.filter(
			area => area.info.cityName === cityFilter
		))
	}, [allAreas, cityFilter])

	if (allAreas.loading) {
		return 'loading...'
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const loanArea = async (props) => {
		if (loggedUser) {
			makeAreaRequest({
				variables: { areaId: props.id },
			});
		}
	};

	const clearSelected = () => {
		setSelectedArea(undefined);
	};

	return (
		<Container sx={styles.container}>
			<Typography
				sx={styles.mainText}
				variant='h6'
			>
				Alueiden hallinta
			</Typography>

			<Autocomplete
				disablePortal
				id='findCity'
				options={cities.map((city) => city.Kunta)}
				value={cityFilter}
				onChange={(e, filter) => {
					if (!filter) return;
					setCityFilter(filter);
					localStorage.setItem('defaultFilter', filter);
					setCityIndex(
						cities.findIndex((city) => city.Kunta === filter)
					)
					setQuarterFilterInput('');
					setQuarterAreas([]);
				}}
				inputValue={cityFilterInput}
				onInputChange={(e, filter) => setCityFilterInput(filter)}
				sx={styles.search}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Hae kaupunkia...'
					/>
				)}
			/>
			<Autocomplete
				freeSolo
				disablePortal
				id='findQuarter'
				options={
					quarterList.length !== 0 ? quarterList : ['Ei alueita']
				}
				value={quarterFilter}
				onChange={(e, newValue) => {
					if (newValue) return;
					setQuarterFilter(newValue);
					setQuarterAreas(filteredAreas?.filter(
						area => area.info.quarter === newValue
					))
				}}
				inputValue={quarterFilterInput}
				onInputChange={(e, newValue) => setQuarterFilterInput(newValue)}
				sx={styles.search}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Hae kaupunginosaa...'
					/>
				)}
			/>

			<Container xs={styles.areas}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						md={6}
						xs={12}
					>
						<AreaMap
							areas={
								quarterFilterInput !== ''
									? quarterAreas
									: filteredAreas
							}
							selectedArea={selectedArea}
							setSelectedArea={setSelectedArea}
							clearSelected={clearSelected}
							cityIndex={cityIndex}
							canEdit={false}
							cityFilter={cityFilter}
							hoverStatus={hoverStatus}
							cities={cities}
						/>
					</Grid>
					<Grid
						item
						md={6}
						xs={12}
					>
						{quarterFilterInput ? (
							quarterAreas ? (
								<Paper sx={styles.form}>
									<TableContainer sx={{ maxHeight: 440 }}>
										<Table stickyHeader>
											<TableBody>
												{quarterAreas
													.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
													)
													.map((area) => (
														<AreaTableRowComponent
															key={area.id}
															area={area}
															cityFilter={
																cityFilter
															}
															setSelectedArea={
																setSelectedArea
															}
															selectedArea={
																selectedArea
															}
															setHoverStatus={
																setHoverStatus
															}
															loggedUser={
																loggedUser
															}
															loanArea={loanArea}
														/>
													))}
											</TableBody>
										</Table>
									</TableContainer>
									<TablePagination
										rowsPerPageOptions={[
											5, 10, 25, 50, 100,
										]}
										component='div'
										count={
											filteredAreas
												? filteredAreas.length
												: 1
										}
										rowsPerPage={rowsPerPage}
										page={page}
										labelRowsPerPage='Rivejä per sivu:'
										onPageChange={handleChangePage}
										onRowsPerPageChange={
											handleChangeRowsPerPage
										}
									/>
								</Paper>
							) : (
								<div
									style={{
										marginLeft: '30%',
										marginTop: '15%',
										paddingBottom: '0px',
									}}
								>
									<InfinitySpin
										width='200'
										color='gray'
										wrapperStyle
										wrapperClass
										ariaLabel='loading'
									/>
								</div>
							)
						) : filteredAreas ? (
							<Paper sx={styles.form}>
								<TableContainer sx={{ maxHeight: 440 }}>
									<Table stickyHeader>
										<TableBody>
											{filteredAreas
												.slice(
													page * rowsPerPage,
													page * rowsPerPage +
														rowsPerPage
												)
												.map((area) => (
													<AreaTableRowComponent
														key={area.id}
														area={area}
														cityFilter={cityFilter}
														setSelectedArea={
															setSelectedArea
														}
														selectedArea={
															selectedArea
														}
														loggedUser={loggedUser}
														setHoverStatus={
															setHoverStatus
														}
														loanArea={loanArea}
													/>
												))}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, 50, 100]}
									component='div'
									count={
										filteredAreas ? filteredAreas.length : 1
									}
									rowsPerPage={rowsPerPage}
									page={page}
									labelRowsPerPage='Rivejä per sivu:'
									onPageChange={handleChangePage}
									onRowsPerPageChange={
										handleChangeRowsPerPage
									}
								/>
							</Paper>
						) : (
							<div
								style={{
									marginLeft: '30%',
									marginTop: '15%',
									paddingBottom: '0px',
								}}
							>
								<InfinitySpin
									width='200'
									color='gray'
									wrapperStyle
									wrapperClass
									ariaLabel='loading'
								/>
							</div>
						)}
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default AreaControl;
