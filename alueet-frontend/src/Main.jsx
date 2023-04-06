import React from 'react';
import {
	Container,
	Typography,
	Grid,
	Button
} from '@mui/material';

import theme from './style/theme';

const styles = {
	container: {
		mb: 8
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		pb: 2
	},
	subText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 1
	},
	text: {
		mb: 1
	},
	box: {
		px: 2,
	},
	button: {
		m: 0.5
	}
};

const Main = () => {

	return (
		<Container sx={styles.container}>
			<Typography sx={styles.mainText} variant='h5'>
				Tervetuloa
			</Typography>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12}>
					<Typography variant='h6' sx={styles.subText}>
						Alueiden hallinta
					</Typography>
					<Grid container sx={styles.box}>
						<Grid item>
							<Typography sx={styles.text}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis sem eget dui pretium, eget suscipit dui malesuada. Aliquam interdum eget nunc in vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum condimentum vitae turpis sed consectetur. Praesent consequat nunc arcu, vitae blandit felis lobortis.
							</Typography>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								sx={styles.button}
							>
								Siirry
							</Button>
						</Grid>
					</Grid>
					<Typography variant='h6' sx={styles.subText}>
						Käyttäjien hallinta
					</Typography>
					<Grid container sx={styles.box}>
						<Grid item>
							<Typography sx={styles.text}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis sem eget dui pretium, eget suscipit dui malesuada. Aliquam interdum eget nunc in vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum condimentum vitae turpis sed consectetur. Praesent consequat nunc arcu, vitae blandit felis lobortis.
							</Typography>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								sx={styles.button}
							>
								Siirry
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography variant='h6' sx={styles.subText}>
						Seuraavaksi
					</Typography>
					<Typography sx={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis sem eget dui pretium, eget suscipit dui malesuada. Aliquam interdum eget nunc in vestibulum.
					</Typography>
					<Button
						variant='contained'
						sx={styles.button}
					>
						Rekisteröidy
					</Button>
					<Button
						variant='contained'
						sx={styles.button}
					>
						Kirjaudu sisään
					</Button>
				</Grid>
			</Grid>
		</Container>
	)
};

export default Main;