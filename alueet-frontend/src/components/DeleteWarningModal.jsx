import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import theme from '../style/theme';

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
		borderRadius: 2,
		px: 4,
		py: 3,
	},
	header: {
		mb: 2,
		textAlign: 'center',
		fontFamily: 'Poppins',
	},
	button: (theme) => ({
		m: 1,
		color: theme.palette.mode === 'dark' ? '#000000' : theme.palette.text.secondary,
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
		fontFamily: 'Poppins',
	  }),
};

const DeleteWarningModal = ({ ...delProps }) => {
	const handleClose = () => delProps.handleCloseDelModal();
	const theme = useTheme();
	return (
		<Modal
			component='div'
			open={delProps.openDel}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography
					variant='h6'
					component='h2'
					sx={styles.header}
				>
					{delProps.warningText}
				</Typography>
				<Box>
					<Button
						sx={styles.button(theme)}
						variant='contained'
						onClick={() => handleClose()}
					>
						Peruuta
					</Button>
					<Button
						sx={styles.button(theme)}
						variant='contained'
						onClick={() => {
							delProps.handleConfirm()
							.then(() => {
								handleClose();
							});
						}}
					>
						Kyllä
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default DeleteWarningModal;
