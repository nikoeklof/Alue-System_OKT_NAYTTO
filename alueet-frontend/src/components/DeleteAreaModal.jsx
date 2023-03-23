import React from 'react';
import {
	Box,
	Typography,
	Modal,
	Button
} from '@mui/material';

import theme from '../theme';

const styles = {
	modal: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40%',
		backgroundColor: theme.bgColor.default,
		boxShadow: 24,
		px: 4,
		py: 3
	},
	header: {
		mb: 2
	},
	button: {
		float: 'right',
		m: 0.5,
	}
};

const DeleteAreaModal = (delProps) => {

	const handleClose = () => delProps.handleCloseDelModal();

	return (
		<Modal
			component='div'
			open={delProps.openDel}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography variant='h6' component='h2' sx={styles.header}>
					Haluatko varmasti poistaa alueen?
				</Typography>
				<div>
					<Button 
						sx={styles.button} 
						variant='contained'
						onClick={() => delProps.handleCloseDelModal()}
					>
						Peruuta
					</Button>
					<Button 
						sx={styles.button} 
						variant='contained'
					>
						Poista
					</Button>
				</div>
			</Box>
		</Modal>		
	)
};

export default DeleteAreaModal;