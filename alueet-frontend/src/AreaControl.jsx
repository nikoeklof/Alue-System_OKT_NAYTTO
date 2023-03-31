import React, { useState, Fragment } from 'react';
import {
	Container,
	Grid,
	Typography,
	Button,
	TextField,
	InputAdornment,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Collapse,
	Box,
	TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import theme from './style/theme';
import { areas } from './db/db';

import AreaMap from './AreaMap';
import DeleteWarningModal from './components/DeleteWarningModal';
import EditAreaModal from './components/EditAreaModal';
import LendAreaModal from './components/LendAreaModal';
import ReturnAreaModal from './components/ReturnAreaModal';

const styles = {
	areas: {
		flewGrow: 1
	},
	selectMenu: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 0.5
	},
	menuProps: {
		PaperProps: {
			style: {
				maxHeight: 200,
				width: 250
			}
		}
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2
	},
	search: {
		mb: 2,
		ml: 2,
		width: '96%'
	},
	form: { 
		width: '100%'
	},
	areainfo: {
		backgroundColor: theme.bgColor.primary,
		border: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		borderRadius: 1,
		display: 'flex',
		py: 2,
		my: 1
	},
	info: {
		flexGrow: 2,
	},
	infotext: {
		mb: 0.5
	},
	button: {
				
	},
	areaButton: {
		m: 0.5,
	}
};

const Row = ({ ...area }) => {
	const [open, setOpen] = useState(false);
	const [openDel, setOpenDel] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openLend, setOpenLend] = useState(false);
	const [openReturn, setOpenReturn] = useState(false);

	const loaned = area.loaned;

	const delProps = {
		openDel,
		handleCloseDelModal: () => setOpenDel(false),
		warningText: 'Haluatko varmasti poistaa alueen?'
	};
	const editProps = {
		openEdit,
		handleCloseEditModal: () => setOpenEdit(false)
	};
	const lendProps = {
		openLend,
		handleCloseLendModal: () => setOpenLend(false)
	};
	const returnProps = {
		openReturn,
		handleCloseReturnModal: () => setOpenReturn(false)
	}

	if (area) {
		return (
			<>
				<Fragment>
					<TableRow 
						hover 
						key={area.id}
						sx={{ '& > *': { borderBottom: 'unset' } }}
					>
						<TableCell onClick={() => setOpen(!open)}>{area.name}</TableCell>
						<TableCell>
							<IconButton
								aria-label='expand row'
								size='small'
								onClick={() => setOpen(!open)}
							>
								{open ? <ExpandLess /> : <ExpandMore />}
							</IconButton>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{py: 0}} colSpan={6}>
							<Collapse in={open} timeout='auto' unmountOnExit>
								<Box sx={{margin: 1}}>
									<Typography 
										variant='h6'
										gutterBottom
										component='div'
									>
										Info
									</Typography>
									<Table size='small' aria-label='areas'>
										<TableHead>
											<TableRow>
												<TableCell>Asunnot</TableCell>
												<TableCell>Lainattu</TableCell>
												<TableCell>ID</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow key={area.id}>
												<TableCell 
													component='th' 
													scope='row'
												>
													{area.buildings}
												</TableCell>
												<TableCell>
													{loaned ? 'Kyllä' : 'Ei'}
												</TableCell>
												<TableCell>
													{area.id}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<Grid sx={styles.buttons}>
										<Button 
											variant='contained' 
											sx={styles.areaButton}
											onClick={() => setOpenLend(true)}
										>
											Lainaa alue
										</Button>
										<Button 
											variant='contained' 
											sx={styles.areaButton}
											onClick={() => setOpenReturn(true)}
										>
											Palauta alue
										</Button>
										<Button 
											variant='contained' 
											sx={styles.areaButton}
											onClick={() => setOpenEdit(true)}
										>
											Muokkaa tietoja
										</Button>
										<Button 
											variant='contained' 
											sx={styles.areaButton}
											onClick={() => setOpenDel(true)}
										>
											Poista alue
										</Button>
									</Grid> 	
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
				</Fragment>	
				<DeleteWarningModal {...delProps}/>
				<EditAreaModal {...editProps}/>
				<LendAreaModal {...lendProps}/>
				<ReturnAreaModal {...returnProps} />
			</>
		)
	}
};

const AreaControl = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Container>
			<Typography sx={styles.mainText} variant='h6'>
				Alueiden hallinta
			</Typography>
			<TextField 
				label='Hae' 
				type='search' 
				variant='outlined' 
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' >
							<SearchIcon />
						</InputAdornment>
					)
				}}
				sx={styles.search}
			/>			
			<Container xs={styles.areas}>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<AreaMap />
					</Grid>
					<Grid item md={6} xs={12}>
						<Paper sx={styles.form}>
							<TableContainer sx={{ maxHeight: 440 }}>
								<Table stickyHeader>
									<TableBody>
										{areas
											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map(area => (
												<Row key={area.name} {...area} />
											))
										}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, 50, 100]}
								component='div'
								count={areas.length}
								rowsPerPage={rowsPerPage}
								page={page}
								labelRowsPerPage='Rivejä per sivu:'
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			
		</Container>
	)
};

export default AreaControl;