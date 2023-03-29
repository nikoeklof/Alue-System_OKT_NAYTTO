import React, { useState } from 'react';
import {
	Container,
	Grid,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button
} from '@mui/material';

import theme from './style/theme';
import { areas } from './db/db';

import DeleteWarningModal from './components/DeleteWarningModal';
import EditAreaModal from './components/EditAreaModal';
import LendAreaModal from './components/LendAreaModal';
import ReturnAreaModal from './components/ReturnAreaModal';

const styles = {
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
	form: {
		mt: 2,
		ml: 2, 
		width: '90%'
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
	buttons: {
		display: 'flex',
		flexGrow: 0,
		flexDirection: 'column',		
	},
	areaButton: {
		m: 0.5,
	},
	makeAreaBtn: {
		ml: 2,
		my: 1
	}
};

const AreaInfo = (values) => {
	const [openDel, setOpenDel] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openLend, setOpenLend] = useState(false);
	const [openReturn, setOpenReturn] = useState(false);

	let lent = '';
	const area = areas.find(a => a.name === values.areaName);

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
		if (area.ownerId) {
			lent = 'Kyllä';
		} else {
			lent = 'Ei';
		}

		return (
			<Container sx={styles.areainfo}>
				<Grid sx={styles.info}>
					<Typography sx={styles.infotext}>
						Asuntoja: {area.buildings}
					</Typography>
					<Typography sx={styles.infotext}>
						Lainattu: {lent} 
					</Typography>
					<Typography sx={styles.infotext}>
						Lainaaja?: owner.username/null
					</Typography>
				</Grid>
				<Grid sx={styles.buttons}>
					<Button 
						variant='contained' 
						sx={styles.areaButton}
					>
						Näytä alue
					</Button>
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
				<DeleteWarningModal {...delProps}/>
				<EditAreaModal {...editProps}/>
				<LendAreaModal {...lendProps}/>
				<ReturnAreaModal {...returnProps} />
			</Container>
		)
	}
};

const AreaList = () => {
	const [areaName, setAreaName] = useState('');
	const [open, setOpen] = useState(false);

	// find the actual values from logged user from backend
	const admin = true;
	const auntie = false;

	const handleChange = (event) => {
		setAreaName(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
		
	};

	return (
		<Container>
			<Typography sx={styles.mainText} variant='h6'>
				Alueiden hallinta
			</Typography>
			{admin ? 
				<Button variant='contained' sx={styles.makeAreaBtn}>Luo alue</Button> : 
				''
			}
			<FormControl sx={styles.form}>
				
				<InputLabel>Valitse alue</InputLabel>
				<Select
					label='Valitse alue'
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					variant='outlined'
					value={areaName}
					onChange={handleChange}
					MenuProps={styles.menuProps}
				>
					{areas.map(area => (
						<MenuItem
							key={area.name}
							value={area.name}
						>
							{area.name}
						</MenuItem>
					))}
				</Select>
				<AreaInfo areaName={areaName} admin={admin} auntie={auntie}/>
				
			</FormControl>
		</Container>

	)
};

export default AreaList;