import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import theme from '../style/theme';
import AreaMap from '../AreaMap';
import CreateAreaForm from './CreateAreaForm';

const styles = {
	areas: {
		flewGrow: 1,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2,
	},
};

const AreaCreate = ({ areas, addArea, layerContext, setLayerContext }) => {
	return (
		<Container>
			<Typography
				sx={styles.mainText}
				variant='h6'
			>
				Alueen luonti
			</Typography>

			<Container xs={styles.areas}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						md={6}
						xs={12}
					>
						<AreaMap
							areas={areas}
							addArea={addArea}
							layerContext={layerContext}
							setLayerContext={setLayerContext}
							canEdit={true}
						/>
					</Grid>
					<Grid
						item
						md={6}
						xs={12}
					>
						<CreateAreaForm
							addArea={addArea}
							layerContext={layerContext}
						/>
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default AreaCreate;
