import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Typography,
	Grid,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';

import theme from './style/theme';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		pb: 2,
	},
	subText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		mt: 4,
		pb: 1,
	},
	listItem: {
		m: 0,
	},
	text: {
		my: 2,
		ml: 1,
	},
	box: {
		px: 2,
	},
	button: {
		m: 0.5,
	},
	link: {
		textDecoration: 'none',
	},
};

const Main = () => {
	return (
		<Container sx={styles.container}>
			<Typography
				sx={styles.mainText}
				variant='h5'
			>
				Tervetuloa
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					md={8}
					xs={12}
				>
					<Typography
						variant='h6'
						sx={styles.subText}
					>
						Alueiden hallinta
					</Typography>
					<Grid
						container
						sx={styles.box}
					>
						<Grid
							item
							md={12}
							xs={12}
						>
							<List>
								<ListItem sx={styles.listItem}>
									<ListItemIcon>
										<MapIcon />
									</ListItemIcon>
									<ListItemText primary='Tarkastele alueita' />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<MapIcon />
									</ListItemIcon>
									<ListItemText primary='Luo alueita' />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<MapIcon />
									</ListItemIcon>
									<ListItemText primary='Muokkaa alueita' />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<MapIcon />
									</ListItemIcon>
									<ListItemText primary='Lainaa ja palauta alueita' />
								</ListItem>
							</List>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<Link
								to={'/areaControl'}
								style={styles.link}
							>
								<Button
									variant='contained'
									sx={styles.button}
								>
									Siirry
								</Button>
							</Link>
						</Grid>
					</Grid>
					<Typography
						variant='h6'
						sx={styles.subText}
					>
						Käyttäjien hallinta
					</Typography>
					<Grid
						container
						sx={styles.box}
					>
						<Grid
							item
							md={12}
							xs={12}
						>
							<List>
								<ListItem>
									<ListItemIcon>
										<PersonIcon />
									</ListItemIcon>
									<ListItemText primary='Tarkastele käyttäjiä' />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<PersonIcon />
									</ListItemIcon>
									<ListItemText primary='Luo käyttäjiä' />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<PersonIcon />
									</ListItemIcon>
									<ListItemText primary='Muokkaa ja poista käyttäjiä' />
								</ListItem>
							</List>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<Link
								to={'/userControl'}
								style={styles.link}
							>
								<Button
									variant='contained'
									sx={styles.button}
								>
									Siirry
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					md={4}
					xs={12}
				>
					<Typography
						variant='h6'
						sx={styles.subText}
					>
						Aloitus
					</Typography>
					<Typography sx={styles.text}>
						Etkö ole vielä rekisteröitynyt?
					</Typography>
					<Link
						to={'/register'}
						style={styles.link}
					>
						<Button
							variant='contained'
							sx={styles.button}
						>
							Rekisteröidy
						</Button>
					</Link>
					<Typography sx={styles.text}>
						Kirjaudu sisään jos olet jo rekisteröitynyt!
					</Typography>
					<Link
						to={'/login'}
						style={styles.link}
					>
						<Button
							variant='contained'
							sx={styles.button}
						>
							Kirjaudu sisään
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Main;
