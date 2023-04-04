import React from 'react';
import {
	Container,
	Box,
	Typography,
	Grid,
	Button
} from '@mui/material';

import theme from './style/theme';

const styles = {
	welcome: {
		m: 2
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		mb: 2,
		pb: 2
	},
	subText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 2,
		mb: 2,
		pb: 1
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
		<Container>
			<Typography sx={styles.mainText} variant='h6'>
				Tervetuloa
			</Typography>
			<Container>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ullamcorper est. Quisque porttitor orci scelerisque, rhoncus purus vel, egestas nisl. Morbi hendrerit justo risus, sit amet efficitur ex congue vitae. Mauris dictum metus eu ipsum tempus ornare.
				Donec pretium risus tristique justo tempor mollis. Nullam non nunc dictum felis gravida posuere vel et orci. Quisque neque libero, euismod vitae vulputate vitae, auctor eu augue. Vivamus blandit pulvinar erat, sit amet tempor urna faucibus vel. Morbi sit amet est eu quam vestibulum pulvinar. Mauris odio est, volutpat eget interdum in, mollis eget turpis. Nam bibendum volutpat eleifend. Donec egestas, justo.
			</Container>
			<Box sx={styles.welcome}>
				<Grid container spacing={3}>
					<Grid item md={12} xs={12}>
						<Button variant='contained' sx={styles.button}>
							Rekisteröidy
						</Button>
						<Button variant='contained' sx={styles.button}>
							Kirjaudu sisään
						</Button>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography sx={styles.subText}>
							Alueiden hallinta
						</Typography>
						<Grid container sx={styles.box}>
							<Grid item>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis sem eget dui pretium, eget suscipit dui malesuada. Aliquam interdum eget nunc in vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum condimentum vitae turpis sed consectetur. Praesent consequat nunc arcu, vitae blandit felis lobortis.
							</Grid>
							<Grid item>
								<Button variant='contained' sx={styles.button}>
									Siirry
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography sx={styles.subText}>
							Käyttäjien hallinta
						</Typography>
						<Grid container sx={styles.box}>
							<Grid item>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis sem eget dui pretium, eget suscipit dui malesuada. Aliquam interdum eget nunc in vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum condimentum vitae turpis sed consectetur. Praesent consequat nunc arcu, vitae blandit felis lobortis.
							</Grid>
							<Grid item>
								<Button variant='contained' sx={styles.button}>
									Siirry
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>

		</Container>
	)
};

export default Main;