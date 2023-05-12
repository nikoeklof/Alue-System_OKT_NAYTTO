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
import { EditArea } from '../graphql/functions';

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
		maxWidth: 150,
	},
	inputMore: {
		m: 0.5,
	},
	button: {
		float: 'right',
		m: 0.5,
		mt: 2,
	},
};

const EditAreaModal = ({ ...editProps }) => {
	const handleClose = () => editProps.handleCloseEditModal();
	const [buildingAmount, setBuildingAmount] = useState(
		editProps.originalArea?.info?.buildings
	);
	const [areaAddress, setAreaAddress] = useState(
		editProps.originalArea?.info?.address
	);
	const [areaMiscInfo, setAreaMiscInfo] = useState(
		editProps.originalArea?.info?.misc
	);
	const [areaQuarter, setAreaQuarter] = useState(
		editProps.originalArea?.info?.quarter
	);
	const ref = useRef(null);
	const [areaAddressError, setAreaAddressError] = useState('');
	const [areaQuarterError, setAreaQuarterError] = useState('');
	const [areaBuildingsError, setAreaBuildingsError] = useState('');
	const [areaMutation] = EditArea();

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
							required
							error={!!areaBuildingsError}
							helperText={areaBuildingsError}
							defaultValue={editProps.originalArea.info.buildings}
							onChange={(e) => setBuildingAmount(e.target.value)}
							sx={styles.inputNum}
						/>
						<TextField
							ref={ref}
							label='Alueen Nimi'
							type='text'
							required
							error={!!areaAddressError}
							helperText={areaAddressError}
							defaultValue={editProps.originalArea.info.address}
							onChange={(e) => setAreaAddress(e.target.value)}
							variant='outlined'
							sx={styles.inputMore}
						/>
						<TextField
							ref={ref}
							defaultValue={editProps.originalArea.info.quarter}
							onChange={(e) => setAreaQuarter(e.target.value)}
							error={!!areaQuarterError}
							helperText={areaQuarterError}
							label='Kaupunginosa'
							variant='outlined'
							sx={styles.inputMore}
						/>
						<TextField
							ref={ref}
							defaultValue={editProps.originalArea.info.misc}
							onChange={(e) => setAreaMiscInfo(e.target.value)}
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
					onClick={() => {
						setAreaBuildingsError('');
						setAreaAddressError('');
						setAreaQuarterError('');
						setAreaAddress(editProps.originalArea?.info?.address);
						setBuildingAmount(
							editProps.originalArea?.info?.buildings
						);
						setAreaQuarter(editProps.originalArea?.info?.quarter);
						handleClose();
					}}
				>
					Peruuta
				</Button>
				<Button
					sx={styles.button}
					variant='contained'
					onClick={() => {
						if (
							!areaAddress ||
							!editProps.originalArea?.info?.address
						) {
							setAreaAddressError('Alueen nimi pakollinen');
						} else {
							setAreaAddressError('');
						}

						if (
							!parseInt(buildingAmount) ||
							!editProps.originalArea?.info?.buildings
						) {
							setAreaBuildingsError('Asunnot pakollisia');
						} else {
							setAreaBuildingsError('');
						}

						if (
							!areaQuarter ||
							!editProps.originalArea?.info?.quarter
						) {
							setAreaQuarterError('Kaupunginosa pakollinen');
						} else {
							setAreaQuarterError('');
						}

						areaMutation({
							variables: {
								areaId: editProps.originalArea?.id,
								quarter: areaQuarter,
								address: areaAddress,
								buildings: parseInt(buildingAmount),
								misc: areaMiscInfo,
							}
						}).then(() => {
							handleClose();
						});
					}}
				>
					Valmis
				</Button>
			</Box>
		</Modal>
	);
};

export default EditAreaModal;
