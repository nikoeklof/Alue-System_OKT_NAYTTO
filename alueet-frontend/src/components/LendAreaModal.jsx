import React from 'react';
import {
	Box,
	Typography,
	Modal,
	Button,
	FormGroup,
	FormControl,
	TextField
} from '@mui/material';

import theme from '../theme';

const styles = {
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		backgroundColor: theme.bgColor.default,
		boxShadow: 24,
		px: 4,
		py: 3
	},
	header: {
		mb: 2,
		pb: 1,
		borderBottom: '1px solid',
		borderColor: theme.color.primary
	},
	input: {
		m: 0.5,
	},
	button: {
		float: 'right',
		m: 0.5,
		mt: 2
	}
};

const LendAreaModal = ({...lendProps}) => {

	const handleClose = () => lendProps.handleCloseLendModal();

	return (
		<Modal
			component='div'
			open={lendProps.openLend}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography 
					variant='h6' 
					component='h2' 
					sx={styles.header}
				>
					Lainaa alue
				</Typography>
				<FormGroup>
					<FormControl>
						<TextField
							label='Lainaaja'
							variant='outlined' 
							sx={styles.input}
						/>
					</FormControl>
				</FormGroup>
				
				<Button 
					sx={styles.button} 
					variant='contained'
					onClick={() => lendProps.handleCloseLendModal()}
				>
					Peruuta
				</Button>
				<Button 
					sx={styles.button} 
					variant='contained'
				>
					Lainaa
				</Button>
			</Box>
		</Modal>
	)
};

export default LendAreaModal;