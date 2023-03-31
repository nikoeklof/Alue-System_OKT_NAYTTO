import React from 'react';
import {
	Container,
	Box,
	Typography
} from '@mui/material';

import theme from './style/theme';
import { areas } from './db/db';
import { LeafletMap } from './components/LeafletMap';

const styles = {
	map: {
		m: 2
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2
	}
};

const Main = () => {

	return (
		<Container>
			<Typography sx={styles.mainText} variant='h6'>
				Alueet
			</Typography>
			<Box sx={styles.map}>
				<LeafletMap
					areas={areas}
				/>
			</Box>
			
		</Container>
	)
};

export default Main;