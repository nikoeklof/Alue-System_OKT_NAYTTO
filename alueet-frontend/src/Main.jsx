import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Collapse,
	Typography,
	Grid,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Paper,
	IconButton,
	Box,
	Divider,
} from '@mui/material';
import {
	Map as MapIcon,
	Person as PersonIcon,
	Remove as RemoveIcon,
	Add as AddIcon,
} from '@mui/icons-material';

import theme from './style/theme';

const styles = {
	container: {
		mb: 8,
	},
	mainText: {
		borderBottom: 'solid',
		borderColor: theme.bgColor.secondary,
		borderWidth: 1,
		my: 4,
		pb: 2,
	},
	subText: {
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
	paper: {
		p: 1,
		mb: 1,
	},
	icon: {
		float: 'right',
	},
	divider: {
		borderColor: theme.bgColor.secondary,
	},
};

const Main = () => {
	const [areaControlChecked, setAreaControlChecked] = useState(false);
	const [userChecked, setUserChecked] = useState(false);
	const [createAreaChecked, setCreateAreaChecked] = useState(false);
	const [lendChecked, setLendChecked] = useState(false);

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
					<Paper sx={styles.paper}>
						<Box
							onClick={() =>
								setAreaControlChecked(!areaControlChecked)
							}
						>
							<Typography
								variant='h6'
								sx={styles.subText}
							>
								Alueiden hallinta
								<IconButton sx={styles.icon}>
									{areaControlChecked ? (
										<RemoveIcon />
									) : (
										<AddIcon />
									)}
								</IconButton>
							</Typography>
						</Box>

						<Collapse in={areaControlChecked}>
							<Divider sx={styles.divider} />
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
						</Collapse>
					</Paper>

					<Paper sx={styles.paper}>
						<Box onClick={() => setUserChecked(!userChecked)}>
							<Typography
								variant='h6'
								sx={styles.subText}
							>
								Käyttäjien hallinta
								<IconButton sx={styles.icon}>
									{userChecked ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</Typography>
						</Box>

						<Collapse in={userChecked}>
							<Divider sx={styles.divider} />
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
						</Collapse>
					</Paper>
					<Paper sx={styles.paper}>
						<Box
							onClick={() =>
								setCreateAreaChecked(!createAreaChecked)
							}
						>
							<Typography
								variant='h6'
								sx={styles.subText}
							>
								Luo alue
								<IconButton sx={styles.icon}>
									{createAreaChecked ? (
										<RemoveIcon />
									) : (
										<AddIcon />
									)}
								</IconButton>
							</Typography>
						</Box>

						<Collapse in={createAreaChecked}>
							<Divider sx={styles.divider} />
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
												<MapIcon />
											</ListItemIcon>
											<ListItemText primary='Luo uusia alueita' />
										</ListItem>
									</List>
								</Grid>
								<Grid
									item
									md={12}
									xs={12}
								>
									<Link
										to={'/createArea'}
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
						</Collapse>
					</Paper>
					<Paper sx={styles.paper}>
						<Box onClick={() => setLendChecked(!lendChecked)}>
							<Typography
								variant='h6'
								sx={styles.subText}
							>
								Lainaa
								<IconButton sx={styles.icon}>
									{lendChecked ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</Typography>
						</Box>

						<Collapse in={lendChecked}>
							<Divider sx={styles.divider} />
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
												<MapIcon />
											</ListItemIcon>
											<ListItemText primary='Hallitse alueiden lainaus pyyntöjä' />
										</ListItem>
									</List>
								</Grid>
								<Grid
									item
									md={12}
									xs={12}
								>
									<Link
										to={'/lendList'}
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
						</Collapse>
					</Paper>
				</Grid>
				<Grid
					item
					md={4}
					xs={12}
				>
					<Paper sx={styles.paper}>
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
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Main;
