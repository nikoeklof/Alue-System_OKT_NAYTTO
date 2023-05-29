import React from 'react';
import { Paper, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

const styles = {
	footer: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		fontSize: 10,
	},
	text: {
		float: 'right',
		mr: 2,
		mt: 1,
		fontFamily: 'Poppins',
	},
	icon: {
		float: 'right',
		my: 1,
	},
};

const Footer = () => {
	return (
		<Paper
			sx={styles.footer}
			elevation={4}
		>
			<Typography sx={styles.text}>Esedu</Typography>
			<CopyrightIcon sx={styles.icon} />
		</Paper>
	);
};

export default Footer;
