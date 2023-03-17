import React from 'react';
import {
	Container,
	Typography,
} from '@mui/material';
import theme from '../theme';

const styles = {
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2
	},
};

const UserControl = () => {

	return (
		<Container>
			<Typography variant='h6' sx={styles.mainText}>
				Käyttäjien hallinta
			</Typography>
		</Container>
		
	)
};

export default UserControl;