import React, { useRef, useState } from 'react';
import {
	Box,
	Typography,
	Modal,
	Button,
	FormGroup,
	FormControl,
	TextField,
} from '@mui/material';

import theme from '../style/theme';

const styles = {
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		backgroundColor: theme.bgColor.default,
		boxShadow: 24,
		borderRadius: 2,
		px: 4,
		py: 3,
	},
	header: {
		mb: 2,
		pb: 1,
		borderBottom: '1px solid',
		borderColor: theme.color.primary,
	},
	inputNum: {
		m: 0.5,
		maxWidth: 100,
	},
	inputMore: {
		m: 0.5,
		mb: 2,
	},
	button: {
		float: 'right',
		m: 0.5,
	},
};

const EditAreaModal = ({ ...editProps }) => {
	const handleClose = () => editProps.handleCloseEditModal();
	const [buildingAmount, setBuildingAmount] = useState(
		editProps.originalArea?.buildings
	);
	const [areaName, setAreaName] = useState(editProps.originalArea?.name);
	const ref = useRef(null);

	return (
		<Modal
			component='div'
			open={editProps.openEdit}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography
					variant='h6'
					component='h2'
					sx={styles.header}
				>
					Muokkaa alueen tietoja
				</Typography>
				<FormGroup>
					<FormControl>
						<TextField
							ref={ref}
							label='Asunnot'
							type='number'
							variant='outlined'
							defaultValue={editProps.originalArea.buildings}
							onChange={(e) => setBuildingAmount(e.target.value)}
							sx={styles.inputNum}
						/>
						<TextField
							ref={ref}
							label='Alueen Nimi'
							type='text'
							defaultValue={editProps.originalArea.name}
							onChange={(e) => setAreaName(e.target.value)}
							variant='outlined'
							sx={styles.inputMore}
						/>
						<TextField
							label='Lisätietoja'
							variant='outlined'
							multiline
							rows={5}
							sx={styles.inputMore}
						/>
					</FormControl>
				</FormGroup>

				<Button
					sx={styles.button}
					variant='contained'
					onClick={() => handleClose()}
				>
					Peruuta
				</Button>
				<Button
					sx={styles.button}
					variant='contained'
					onClick={() => {
						const newArea = {
							id: editProps.originalArea.id,
							name: areaName,
							buildings: parseInt(buildingAmount),
							ownerId: editProps.originalArea.ownerId,
							loaned: editProps.originalArea.loaned,
							latlngs: editProps.originalArea.latlngs,
						};
						editProps.handleConfirm(newArea);
						handleClose();
					}}
				>
					Valmis
				</Button>
			</Box>
		</Modal>
	);
};

export default EditAreaModal;
