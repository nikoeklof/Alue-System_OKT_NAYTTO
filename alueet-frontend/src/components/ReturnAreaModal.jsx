import React from 'react';
import {
	Box,
	Typography,
	Modal,
	Button,
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
		width: '50%',
		backgroundColor: theme.bgColor.default,
		borderRadius: 2,
		boxShadow: 24,
		px: 4,
		py: 3
	},
	header: {
		mb: 2,
	},
	button: {
		float: 'right',
		m: 0.5,
	}
};

const ReturnAreaModal = ({...returnProps}) => {

	const handleClose = () => returnProps.handleCloseReturnModal();

	return (
		<Modal
			component='div'
			open={returnProps.openReturn}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography 
					variant='h6' 
					component='h2' 
					sx={styles.header}
				>
					Haluatko varmasti palauttaa alueen?
				</Typography>
				<Box>
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
					>
						Palauta
					</Button>
				</Box>
				
			</Box>
		</Modal>
	)
};

export default ReturnAreaModal;