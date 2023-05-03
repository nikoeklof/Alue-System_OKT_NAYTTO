import React, { useState } from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

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
	},
	button: {
		float: 'right',
		m: 0.5,
	},
};

const ChangeDisabledModal = ({ ...changeDisabledProps }) => {
	const [disabled, setDisabled] = useState(
		changeDisabledProps.originalUser.disabled
	);

	const handleClose = () =>
		changeDisabledProps.handleCloseChangeDisabledModal();

	return (
		<Modal
			component='div'
			open={changeDisabledProps.openChangeDisabled}
			onClose={handleClose}
		>
			<Box sx={styles.modal}>
				<Typography
					variant='h6'
					component='h2'
					sx={styles.header}
				>
					Vaihda käyttäjä{' '}
					{!disabled ? 'käytettäväksi' : 'pois käytöstä'}?
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
						onClick={() => {
							setDisabled(!disabled);
							changeDisabledProps.updateUserDisabled(
								changeDisabledProps.originalUser
							);
							handleClose();
						}}
					>
						Vaihda
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ChangeDisabledModal;
